import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import WrappedGraph from '../../components/WrappedGraph';
import { getPrometheus } from '../../actions/Prometheus';
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
        if (this.props.data.node.ID) {
            clearTimeout(this.timeID);
            console.log('clear')
            const nodeID = this.props.data.node.ID;
            const Datacenter = this.props.data.node.Datacenter;
            const duration = this.state.duration;
            console.log('set timeout')
            this.timeID = setTimeout(function () {
                // getPrometheus(dispatch, nodeID, Datacenter, this.state.duration);
                getPrometheus(dispatch, nodeID, Datacenter, duration);
            }, 300000)
            //暂时将刷新时间设为5分钟，等接到prometheus数据后再改成10s,且刷新时间要和api中的时间对应,确保每次取的点时间戳一致
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
        if (this.props.data.node.ID) {
            clearTimeout(this.timeID);
            const nodeID = this.props.data.node.ID;
            const Datacenter = this.props.data.node.Datacenter;
            getPrometheus(dispatch, nodeID, Datacenter, selectList[index].duration);
        }
        this.setState({
            selectedIndex: index,
            duration: selectList[index].duration
        })
    }

    render() {
        const { classes, className, children, data, PrometheusData } = this.props;
        const { CPUData, diskData, memoryData } = PrometheusData;

        const CPUResult = this.dataWrapper(CPUData, CPUConfig);
        const diskResult = this.dataWrapper(diskData, diskConfig);
        const memoryResult = this.dataWrapper(memoryData, memoryConfig);
        console.log('-----this is taskMetric------')
        console.log(data)
        console.log(data.node ? 'true' : 'false')

        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }


        return (
            <div className={classNameWrap}>
                <Select className={classes.selectList} selectList={selectList} selectedIndex={this.state.selectedIndex} onClick={this.selectData} maxWidth={'33px'}></Select>
                <WrappedGraph className={classes.graph} config={CPUConfig} results={CPUResult} />
                <WrappedGraph className={classes.graph} config={diskConfig} results={diskResult} />
                <WrappedGraph className={classes.graph} config={memoryConfig} results={memoryResult} />
            </div>
        );
    }
}

TaskMetric.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        PrometheusData: state.Prometheus
    }
}
export default connect(mapStateToProps)(withStyles(styles)(TaskMetric));