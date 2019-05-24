import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {formatTime} from '../../utils/formatTime';
import {setRegion} from '../../utils/handleRequest';

const styles = theme => ({
    root: {

        height: 74,
        // width: '100%',
        boxSizing: 'border-box',
        border: '1px solid rgba(151,151,151,0.49)',
        backgroundColor: 'rgba(216,216,216,0.11)',
        position: 'relative'
    },
    appHeader: {
        height: 31,
        display: 'flex',
        justifyContent: 'space-between'
    },
    appName: {
        display: 'block',
        height: 31,
        lineHeight: '31px',
        fontSize: '16px',
        color: '#EEF9FF',
        padding: '0px 14px',
        backgroundColor: '#696969',
        fontWeight: 500
    },
    appDate: {
        display: 'block',
        height: 31,
        lineHeight: '31px',
        fontSize: '12px',
        color: '#696969',
        padding: '0px 8px',
    },
    appBrief: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 22,
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    detailLink: {
        fontSize: 14,
        color: '#76ADCB',
        padding: '0px 7px',
        cursor: 'pointer'
    },
    statusItem: {
        padding: '0px 7px',
        color: '#EEF9FF',
        fontSize: 12
    },
    appStatus: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    itemCount: {
        fontSize: 16
    },
    mr4: {
        marginRight: 4
    },
    colorGreen: {
        color: '#4BAF7E'
    },
    colorYellow: {
        color: '#AF954B'
    },
    colorGray: {
        color: '#ABABAB'
    }
});
class AppCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    //   componentWillMount() {
    //     const { dispatch } = this.props;
    //     getRegionList(dispatch);
    //   }
    componentWillReceiveProps(nextProp) {

    }

    turnToJobDetail=()=>{
        const currentRegion=this.props.data.currentRegion;
        const jobID=this.props.data.JobID;

        setRegion(currentRegion);
        window.location.href=`/#/console/jobs/detail/${jobID}`;

    }

    render() {
        const { classes, className,data } = this.props;
        let classNameWrap;
        let pendingTasksNumber=0,deadTasksNumber=0,runningTaskNumber=0;
        Object.keys(data.TaskStates).forEach(item=>{
            switch(data.TaskStates[item].State){
                case 'dead':
                    deadTasksNumber++;break;
                case 'pending':
                    pendingTasksNumber++;break;
                case 'running':
                    runningTaskNumber++;break;
                default:
            }
        })
        if (className) {
            classNameWrap = className + " " + classes.root;
        }
        else {
            classNameWrap = classes.root;
        }
        return (
            <div className={classNameWrap}>
                <p className={classes.appHeader}>
                    <span className={classes.appName}>{data.Name}</span>
                    <span className={classes.appDate}>{formatTime(data.CreateTime)}</span>
                </p>
                <div className={classes.appBrief}>
                    <div className={classes.appStatus}>
                        <p className={classes.statusItem}>
                            <span className={classes.itemCount}>
                                {runningTaskNumber}
                 </span>
                            <span className={classes.mr4}>个任务</span>
                            <span className={classes.colorGreen}>运行中</span>
                        </p>
                        <p className={classes.statusItem}>
                            <span className={classes.itemCount}>
                                {pendingTasksNumber}
                 </span>
                            <span className={classes.mr4}>个任务</span>
                            <span className={classes.colorYellow}>启动中</span>
                        </p>
                        <p className={classes.statusItem}>
                            <span className={classes.itemCount}>
                                {deadTasksNumber}
                 </span>
                            <span className={classes.mr4}>个任务</span>
                            <span className={classes.colorGray}>已停止</span>
                        </p>
                    </div>
                    <a className={classes.detailLink} onClick={this.turnToJobDetail} >详情</a>
                </div>
            </div>
        );
    }
}

AppCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppCard);