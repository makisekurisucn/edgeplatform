import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '../../../components/Tabs';
import Paper from '@material-ui/core/Paper';
import { getJobDetail, resetStatus } from '../../../actions/Job';
import { getDCList } from '../../../actions/DC';
import { blueGrey, lightGreen, amber, lightBlue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import { formatTime } from '../../../utils/formatTime';
import { setRegion, getRegion } from '../../../utils/handleRequest';
import AppMainUpper from '../../../components/AppMainUpper';
import JobInfo from './JobInfo';
import AllocationDistribution from './AllocationDistribution';
import JobHistory from './JobHistory';




// import { isAbsolute } from 'path';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        borderRadius: 0
    }


});

const tabList = [
    {
        name: '基本信息',
        component: JobInfo
    },
    {
        name: '实例分布',
        component: AllocationDistribution
    },
    {
        name: '历史',
        component: JobHistory
    }
];

const kvMap = {
    pending: '启动中',
    running: '运行中'
}

class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }
    componentDidMount() {
        const currentRegion = getRegion();
        const { dispatch } = this.props;
        resetStatus(dispatch);
        let id = this.props.match.params.id;
        getJobDetail(dispatch, id);
        getDCList(dispatch);
        setRegion(currentRegion);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.statusIndex) {
            this.setState({
                statusIndex: nextProps.statusIndex
            });
        }

    }
    handleChange = (event, index) => {
        this.setState({
            index: index
        });
    }
    handleSwitchInstance = (params) => (e) => {

        let statusIndex = this.state.statusIndex;
        statusIndex[params.taskGroup][params.task] = params.index;
        this.setState({
            statusIndex: statusIndex
        });
        // alert(params);
    }
    render() {
        const { classes, match, detail, history, status, allocationList } = this.props;
        console.log(status);
        const { taskGroup, nodeInfo } = status;
        const { index, statusIndex } = this.state;
        let defaultCommand = {};

        switch (detail.Status) {
            case 'running':
            case 'pending':
                defaultCommand = {
                    name: '停止',
                    handleClick: () => { console.log('stop') } //待定
                };
                break;
            default:
                defaultCommand = {
                    name: '启动',
                    handleClick: () => { console.log('start') } //待定
                };
        }

        const commandList = [
            {
                name: '编辑',
                handleClick: () => { console.log('edit') } //待定
            },
            {
                name: '删除',
                handleClick: () => { console.log('delete') } //待定
            }
        ]

        return (
            <Paper className={classes.root}>
                <AppMainUpper type='job_detail' status={kvMap[detail.Status] || detail.Status} data={{ defaultCommand, commandList, name: detail.Name }} />
                <Tabs contentList={tabList} viewProps={{ detail, status, allocationList, history }} reducedHeight={163} tabWrapColor='rgb(96,139,162)' />
            </Paper>
        );
    }
}
JobDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
    console.log(state)
    return state.jobdetail;
}

export default connect(mapStateToProps)(withStyles(styles)(JobDetail));