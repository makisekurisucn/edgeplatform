import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tabs from '../../components/Tabs';
import RunningEvent from './RunningEvent';
import TaskMetric from './TaskMetric';
import TaskLog from './TaskLog';

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
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        height: '20px',
        lineHeight: '20px'
    }

});
const tabList = [
    {
        name: '运行时间',
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
const status = {
    ready: '就绪',
    running: '运行中',
    dead:'已停止',
    pending:'启动中'
}
class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // componentWillMount() {

    //   this.setState({
    //     isHidden: true,
    //     animateStarted: false,
    //     animateFinished: false
    //   });
    //   console.log('hello');
    // }
    // componentWillReceiveProps(nextProp) {
    //     console.log(nextProp)
    // }

    // componentDidUpdate(){

    // }
    render() {
        const { classes, className, children, DCInfo, allocDetail={} } = this.props;
        // const { isHidden, stage} = this.state;
        const allocName=allocDetail.Name;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                <div className={classes.appHeader}>
                    <div className={classes.headerTop}>
                        <div className={classes.headerName}>
                            <p className={classes.mainTitle}>{allocName}</p>
                            <span className={classes.status}>运行中</span>
                        </div>
                        <p className={classes.subTitle}>{DCInfo.region} - {DCInfo.DC}</p>
                    </div>
                    <p className={classes.headerContent}>
                        {DCInfo.address}
                    </p>
                </div>
                <Tabs contentList={tabList} viewProps={{}} reducedHeight={343} tabWrapColor="rgba(75,139,175,0.7)" />
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