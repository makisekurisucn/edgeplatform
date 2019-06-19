import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tabs from '../../components/Tabs';
import RunningEvent from './RunningEvent';
import TaskMetric from './TaskMetric';
import TaskLog from './TaskLog';
import Select from '../../components/Select/SelectButton'
import { stat } from 'fs';

const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1
    },
    appHeader: {
        width: '100%',
        height: 128,
        backgroundColor: 'rgba(75,139,175,0.7)',
        padding: '0px 16px',
        boxSizing: 'border-box'
    },
    headerTop: {
        height: 74,
        lineHeight: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    headerName: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        display: 'inline-block',
        width: '82px',
        height: '29px',
        border: '2px solid #4BAF7E',
        color: '#4BAF7E',
        lineHeight: '29px',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 400
    },
    mainTitle: {
        maxWidth: '200px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        color: '#EEF9FF',
        fontSize: '22px',
        marginRight: '4px',
        fontWeight: 400
    },
    subTitle: {
        fontSize: '16px',
        color: '#EEF9FF',
        fontWeight: 400
    },
    headerContent: {
        fontSize: '18px',
        fontWeight: 300,
        color: '#EEF9FF',
        maxWidth: '480px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        height: '20px',
        lineHeight: '20px'
    }

});
const tabList = [
    {
        name: '运行事件',
        component: RunningEvent
    },
    {
        name: '监控',
        component: TaskMetric
    },
    {
        name: '应用日志',
        component: TaskLog
    }
];
const statusMap = {
    ready: '就绪',
    running: '运行中',
    dead: '已停止',
    pending: '启动中'
}
const getAllocationName = (prevName) => {
    if (typeof prevName === 'string') {
        const index = prevName.indexOf('.');
        return prevName.substr(index + 1);
    }
    return prevName;
}
class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTaskIndex: 0
        };
    }

    // componentDidUpdate(){

    // }
    selectTask = (index) => {
        this.setState({
            currentTaskIndex: index
        })
    }
    render() {
        const { classes, className, children, DCInfo, alloc = {}, node, region } = this.props;
        // const { isHidden, stage} = this.state;
        console.log('-----------')
        console.log(alloc)
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        let list = [];
        let status = '';
        for (let task in alloc.TaskStates) {
            list.push(task)
        }
        if (alloc.TaskStates) {
            status = statusMap[alloc.TaskStates[list[this.state.currentTaskIndex]].State]
        }

        return (
            <div className={classNameWrap}>
                <div className={classes.appHeader}>
                    <div className={classes.headerTop}>
                        <div className={classes.headerName}>
                            <p className={classes.mainTitle} title={getAllocationName(alloc.Name)}>{getAllocationName(alloc.Name)}</p>
                            <Select list={list} value={list[this.state.currentTaskIndex]} onSelected={this.selectTask} />
                            <span className={classes.status}>{status}</span>
                        </div>
                        <p className={classes.subTitle}>{DCInfo.region} - {DCInfo.DC}</p>
                    </div>
                    <p className={classes.headerContent} title={DCInfo.address}>
                        {DCInfo.address}
                    </p>
                </div>
                <Tabs contentList={tabList} viewProps={{ alloc, node, region, taskName: list[this.state.currentTaskIndex] }} reducedHeight={343} tabWrapColor="rgba(75,139,175,0.7)" />
            </div>
        );
    }
}

TaskView.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(TaskView));