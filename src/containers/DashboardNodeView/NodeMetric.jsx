import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import WrappedGraph from '../../components/WrappedGraph';
import {getPrometheus} from '../../actions/Prometheus'
const styles = theme => ({
    root: {
        padding: 10
    },
    graph: {
        marginBottom: 10
    }
});
const CPUConfig={
    title:'CPU',
    unit:'%',
    dataWrap:(data)=>{
        return parseFloat(data).toFixed(2);
    },
    option:{
        tooltip:{
            formatter:'时间 : {b0}<br/>{a0} : {c0} %'
        }
    }
}
const diskConfig={
    title:'磁盘',
    unit:'GB',
    dataWrap:(data)=>{
        return (parseFloat(data)/1024/1024/1024).toFixed(3);
    },
    option:{
        tooltip:{
            formatter:'时间 : {b0}<br/>{a0} : {c0} GB'
        }
    }
}
const memoryConfig={
    title:'内存',
    unit:'GB',
    dataWrap:(data)=>{
        return (parseFloat(data)/1024/1024/1024).toFixed(3);
    },
    option:{
        tooltip:{
            formatter:'时间 : {b0}<br/>{a0} : {c0} GB'
        }
    }
}
let timeID='';

class NodeMetric extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUpdate(){
        const {dispatch}=this.props;
        console.log('nodemetric will update')
        console.log(this.props)
        if(this.props.data.ID){
            clearTimeout(timeID);
            const nodeID=this.props.data.ID;
            const Datacenter=this.props.data.Datacenter;
            timeID=setTimeout(function(){
                getPrometheus(dispatch,nodeID,Datacenter);
            },60000)
        }
    }

    render() {
        const { classes, className, children, data, PrometheusData } = this.props;
        const { CPUData, diskData, memoryData } = PrometheusData;
        console.log('this is node metric')
        const nodeInfo = {
            nodeID: data.ID,
            region: data.region,
            Datacenter: data.Datacenter
        }
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        // nodeinfo有没有必要放进去？
        return (
            <div className={classNameWrap}>
                <WrappedGraph className={classes.graph} config={CPUConfig} nodeInfo={nodeInfo} data={CPUData} />
                <WrappedGraph className={classes.graph} config={diskConfig} nodeInfo={nodeInfo} data={diskData} />
                <WrappedGraph className={classes.graph} config={memoryConfig} nodeInfo={nodeInfo} data={memoryData} />
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