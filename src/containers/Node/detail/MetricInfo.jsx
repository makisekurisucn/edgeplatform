import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import WrappedGraph from '../../../components/WrappedGraph';
import { getNodePrometheus } from '../../../actions/Prometheus';
import { getPreciseTime } from '../../../utils/formatTime';

const styles = theme => ({
    root: {
        padding: 10
    },
    graph: {
        marginBottom: 10
    },
    graphTitle: {
        color: '#608ea7'
    }
});
const CPUConfig = {
    name: 'cpu',
    title: 'CPU',
    unit: '%',
    dataWrap: (data) => {
        return parseFloat(data).toFixed(2);
    },
    option: {
        tooltip: {
            formatter: '时间 : {b0}<br/>{a0} : {c0} %'
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            show: false,
            min: 0,
            max: 100
        }
    }
}
const diskConfig = {
    name: 'disk',
    title: '磁盘',
    unit: 'GB',
    dataWrap: (data) => {
        return (parseFloat(data) / 1024 / 1024 / 1024).toFixed(3);
    },
    option: {
        tooltip: {
            formatter: '时间 : {b0}<br/>{a0} : {c0} GB'
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            show: false
        }
    }
}
const memoryConfig = {
    name: 'memory',
    title: '内存',
    unit: 'GB',
    dataWrap: (data) => {
        return (parseFloat(data) / 1024 / 1024 / 1024).toFixed(3);
    },
    option: {
        tooltip: {
            formatter: '时间 : {b0}<br/>{a0} : {c0} GB'
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            show: false
        }
    }
}


class MetricInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.timeID = null;
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.data.ID) {
            const nodeID = this.props.data.ID;
            const Datacenter = this.props.data.Datacenter;
            getNodePrometheus(dispatch, nodeID, Datacenter);
        }
    }

    componentDidUpdate() {
        const { dispatch } = this.props;
        if (this.props.data.ID) {
            clearTimeout(this.timeID);
            const nodeID = this.props.data.ID;
            const Datacenter = this.props.data.Datacenter;

            this.timeID = setTimeout(function () {
                getNodePrometheus(dispatch, nodeID, Datacenter);
            }, 300000)
            //暂时将刷新时间设为5分钟，等接到prometheus数据后再改成10s,且刷新时间要和api中的时间对应,确保每次取的点时间戳一致
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isHidden !== this.props.isHidden) {
            const { dispatch } = this.props;
            if (nextProps.data.ID) {
                const nodeID = nextProps.data.ID;
                const Datacenter = nextProps.data.Datacenter;
                getNodePrometheus(dispatch, nodeID, Datacenter);
            }
        }
    }

    dataWrapper = (results, config) => {
        let metricData = [];

        if (results.length > 0) {
            results.forEach(result => {
                let values = {
                    data: [],
                    date: []
                };
                let prevValues = result.values;
                for (let i = 0; i < prevValues.length; i++) {
                    let dateString = getPreciseTime(prevValues[i][0] * 1000);
                    values.date.push(dateString);
                    values.data.push(config.dataWrap(prevValues[i][1]));
                }
                metricData.push({
                    name: result.metric[config.name],
                    values: values
                });
            })
        }
        return metricData;
    }

    componentWillUnmount() {
        clearTimeout(this.timeID);
    }

    render() {
        const { classes, className, data, PrometheusData } = this.props;
        const { CPUData, diskData, memoryData } = PrometheusData;

        const CPUResult = this.dataWrapper(CPUData, CPUConfig);
        const diskResult = this.dataWrapper(diskData, diskConfig);
        const memoryResult = this.dataWrapper(memoryData, memoryConfig);


        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                <WrappedGraph className={classes.graph} config={CPUConfig} results={CPUResult} dataSource={data.ID} extendedCSS={{ current: classes.graphTitle, title: classes.graphTitle }} />
                <WrappedGraph className={classes.graph} config={diskConfig} results={diskResult} dataSource={data.ID} extendedCSS={{ current: classes.graphTitle, title: classes.graphTitle }} />
                <WrappedGraph className={classes.graph} config={memoryConfig} results={memoryResult} dataSource={data.ID} extendedCSS={{ current: classes.graphTitle, title: classes.graphTitle }} />
            </div>
        );
    }
}

MetricInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        PrometheusData: state.Prometheus.nodeMetric
    }
}
export default connect(mapStateToProps)(withStyles(styles)(MetricInfo));