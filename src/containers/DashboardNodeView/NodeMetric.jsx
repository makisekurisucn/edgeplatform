import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import WrappedGraph from '../../components/WrappedGraph';
import { getPrometheus } from '../../actions/Prometheus';
import { getPreciseTime } from '../../utils/formatTime'

const styles = theme => ({
    root: {
        padding: 10
    },
    graph: {
        marginBottom: 10
    }
});
const CPUConfig = {
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
            min:0,
            max:100
        }
    }
}
const diskConfig = {
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
let timeID = '';

class NodeMetric extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUpdate() {
        const { dispatch } = this.props;
        // if (this.props.data.ID) {
        //     clearTimeout(timeID);
        //     const nodeID = this.props.data.ID;
        //     const Datacenter = this.props.data.Datacenter;
        //     timeID = setTimeout(function () {
        //         getPrometheus(dispatch, nodeID, Datacenter);
        //     }, 300000)
        //     //暂时将刷新时间设为5分钟，等接到prometheus数据后再改成10s,且刷新时间要和api中的时间对应,确保每次取的点时间戳一致
        // }
    }

    valuesWrapper=(arr,config)=>{
        let values={
            data:[],
            date:[]
        }
        if(arr.length>0){
            let data=arr[0].values;
            for (let i = 0; i < data.length; i++) {
                let dateString = getPreciseTime(data[i][0] * 1000);
                values.date.push(dateString);
                values.data.push(config.dataWrap(data[i][1]));
            }
        }
        return values;
    }

    render() {
        const { classes, className, children, data, PrometheusData } = this.props;
        const { CPUData, diskData, memoryData } = PrometheusData;

        const CPUValues=this.valuesWrapper(CPUData,CPUConfig);
        const diskValues=this.valuesWrapper(diskData,diskConfig);
        const memoryValues=this.valuesWrapper(memoryData,memoryConfig);

        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                <WrappedGraph className={classes.graph} config={CPUConfig} values={CPUValues} />
                <WrappedGraph className={classes.graph} config={diskConfig} values={diskValues} />
                <WrappedGraph className={classes.graph} config={memoryConfig} values={memoryValues} />
            </div>
        );
    }
}

NodeMetric.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        PrometheusData: state.Prometheus
    }
}
export default connect(mapStateToProps)(withStyles(styles)(NodeMetric));