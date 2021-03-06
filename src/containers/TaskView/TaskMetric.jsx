import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import WrappedGraph from '../../components/WrappedGraph';
import { getTaskPrometheus } from '../../actions/Prometheus';
import { getPreciseTime } from '../../utils/formatTime';
import Select from '../../components/Select/HorizontalButton';

const styles = theme => ({
    root: {
        padding: 10
    },
    graph: {
        marginBottom: 10
    },
    selectList: {
        height: 24,
        width: '100%'
    },
    fontColor: {
        color: 'rgb(116, 116, 116)'
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


const selectList = [
    {
        text: '近7天',
        duration: '7days'
    },
    {
        text: '近24小时',
        duration: '24hours'
    },
    {
        text: '近6小时',
        duration: '6hours'
    },
    {
        text: '近半小时',
        duration: '0.5hour'
    }
]

class TaskMetric extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 3,
            duration: '0.5hour'
        };
        this.timeID = null;
    }

    componentDidUpdate() {
        const { dispatch } = this.props;
        if (this.props.data.alloc.ID) {
            clearTimeout(this.timeID);
            const allocID = this.props.data.alloc.ID;
            const taskName = this.props.data.taskName;
            const duration = this.state.duration;
            this.timeID = setTimeout(function () {
                getTaskPrometheus(dispatch, allocID, taskName, duration);
            }, 300000)
            //暂时将刷新时间设为5分钟，等接到prometheus数据后再改成10s,且刷新时间要和api中的时间对应,确保每次取的点时间戳一致
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const prevAlloc = this.props.data.alloc || {};
        const nextAlloc = nextProps.data.alloc || {};
        if (prevAlloc.ID !== nextAlloc.ID || this.props.data.taskName !== nextProps.data.taskName) {
            const { dispatch } = this.props;

            clearTimeout(this.timeID);
            const allocID = nextAlloc.ID;
            const taskName = nextProps.data.taskName;
            getTaskPrometheus(dispatch, allocID, taskName, selectList[3].duration);

            this.setState({
                selectedIndex: 3,
                duration: selectList[3].duration
            })
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeID);
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

    selectData = (index) => {
        const { dispatch } = this.props;
        if (this.props.data.alloc.ID) {
            clearTimeout(this.timeID);
            const allocID = this.props.data.alloc.ID;
            const taskName = this.props.data.taskName;
            getTaskPrometheus(dispatch, allocID, taskName, selectList[index].duration);
        }
        this.setState({
            selectedIndex: index,
            duration: selectList[index].duration
        })
    }

    render() {
        const { classes, className, data, PrometheusData } = this.props;
        const { CPUData, memoryData } = PrometheusData;

        const CPUResult = this.dataWrapper(CPUData, CPUConfig);
        const memoryResult = this.dataWrapper(memoryData, memoryConfig);

        const dataSourece = data.alloc.ID + ',' + data.taskName;

        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }


        return (
            <div className={classNameWrap}>
                <Select className={classes.selectList} selectList={selectList} selectedIndex={this.state.selectedIndex} onClick={this.selectData} maxWidth={'33px'}></Select>
                <WrappedGraph className={classes.graph} config={CPUConfig} results={CPUResult} dataSource={dataSourece} extendedCSS={{ title: classes.fontColor, current: classes.fontColor }} />
                <WrappedGraph className={classes.graph} config={memoryConfig} results={memoryResult} dataSource={dataSourece} extendedCSS={{ title: classes.fontColor, current: classes.fontColor }} />
            </div>
        );
    }
}

TaskMetric.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        PrometheusData: state.Prometheus.taskMetric
    }
}
export default connect(mapStateToProps)(withStyles(styles)(TaskMetric));