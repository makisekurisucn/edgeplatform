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
    },
    selectList: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: 'rgba(22,22,22,0.4)',
        fontSize: 12,
        fontWeight: 300,
        color: '#EEF9FF',
        height: 24,
        lineHeight: '24px'
    },
    selectItem: {
        width: '25%',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: 'rgba(75,139,175,0.60)'
        },
        lineHeight: '24px',
        cursor: 'pointer'
    },
    selected: {
        backgroundColor: 'rgba(75,139,175,0.60)'
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
            min: 0,
            max: 100
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

const selectList = [
    {
        text: '近7天',
        duration: '7day'
    },
    {
        text: '近24小时',
        duration: '24h'
    },
    {
        text: '近6小时',
        duration: '6h'
    },
    {
        text: '近半小时',
        duration: '0.5h'
    }
]

class TaskMetric extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 3
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

    valuesWrapper = (arr, config) => {
        let values = {
            data: [],
            date: []
        }
        if (arr.length > 0) {
            let data = arr[0].values;
            for (let i = 0; i < data.length; i++) {
                let dateString = getPreciseTime(data[i][0] * 1000);
                values.date.push(dateString);
                values.data.push(config.dataWrap(data[i][1]));
            }
        }
        return values;
    }

    selectData = (duration, index) => (event) => {
        //dispatch
        this.setState({
            selectedIndex: index
        })
    }

    render() {
        const { classes, className, children, data, PrometheusData } = this.props;
        const { CPUData, diskData, memoryData } = PrometheusData;

        const CPUValues = this.valuesWrapper(CPUData, CPUConfig);
        const diskValues = this.valuesWrapper(diskData, diskConfig);
        const memoryValues = this.valuesWrapper(memoryData, memoryConfig);

        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        const selectedItem = classes.selectItem + ' ' + classes.selected;

        return (
            <div className={classNameWrap}>
                <div className={classes.selectList}>
                    {
                        selectList.map((item, index) => {
                            if(index===this.state.selectedIndex){
                                return <div className={selectedItem} onClick={this.selectData(item.duration, index)} key={item.text}>{item.text}</div>
                            }
                            else{
                                return <div className={classes.selectItem} onClick={this.selectData(item.duration, index)} key={item.text}>{item.text}</div>
                            }
                        })
                    }
                </div>
                <WrappedGraph className={classes.graph} config={CPUConfig} values={CPUValues} />
                <WrappedGraph className={classes.graph} config={diskConfig} values={diskValues} />
                <WrappedGraph className={classes.graph} config={memoryConfig} values={memoryValues} />
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