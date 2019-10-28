import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '../../../components/Tabs';
import Paper from '@material-ui/core/Paper';
import { getJobDetail, resetStatus, stopJob, startJob, deleteJob, startBlockingJobDetail, stopBlockingJobDetail } from '../../../actions/Job';
import { getDCList } from '../../../actions/DC';
import { setRegion, getRegion } from '../../../utils/handleRequest';
import AppMainUpper from '../../../components/AppMainUpper';
import JobInfo from './JobInfo';
import AllocationDistribution from './AllocationDistribution';
import JobHistory from './JobHistory';
import Confirm from '../../../components/Dialog/Confirm';




// import { isAbsolute } from 'path';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        borderRadius: 0
    },
    bgcolor: {
        position: 'relative',
        zIndex: 100,
        backgroundColor: '#F5F6F6',
        color: '#4B8BAF',//'#fff',
        fontSize: '18px',
        //下边框阴影
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    },
    selected: {
        color: '#416E87',//'#fff',
        '&:before': {
            backgroundColor: '#416E87',//'#fff',
        }
    },
    delete: {
        overflow: 'hidden',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }


});

const tabList = [
    {
        name: '概览',
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
    running: '运行中',
    dead: '已停止'
}

const colorMap = {
    pending: 'yellow',
    running: 'green',
    dead: 'gray'
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
        startBlockingJobDetail(dispatch, id, '2m')
        getDCList(dispatch);
        setRegion(currentRegion);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.statusIndex) {
            this.setState({
                statusIndex: nextProps.statusIndex
            });
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        let id = this.props.match.params.id;
        stopBlockingJobDetail(dispatch, id)
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
    }

    render() {
        const { classes, detail, jobHistory, status, allocationList, nativeDetail } = this.props;
        const jobID = this.props.match.params.id;
        const detailCopy = JSON.parse(JSON.stringify(nativeDetail))
        let defaultCommand = {};

        switch (detail.Status) {
            case 'running':
            case 'pending':
                defaultCommand = {
                    name: '停止',
                    handleClick: () => {
                        console.log('stop')
                        detailCopy.Meta = Object.assign({}, detailCopy.Meta, { realCount: detailCopy.TaskGroups[0].Count.toString() });
                        detailCopy.TaskGroups[0].Count = 0;
                        stopJob(this.props.dispatch, jobID, { Job: detailCopy });
                    }
                };
                break;
            default:
                defaultCommand = {
                    name: '启动',
                    handleClick: () => {
                        console.log('start');
                        // detailCopy.Meta = Object.assign({}, detailCopy.Meta, { realCount: detailCopy.TaskGroups[0].Count });
                        detailCopy.TaskGroups[0].Count = (detailCopy.Meta && Number.parseInt(detailCopy.Meta.realCount)) || detailCopy.TaskGroups[0].Count;
                        startJob(this.props.dispatch, jobID, { Job: detailCopy });
                    }
                };
        }

        const commandList = [
            {
                name: '编辑',
                handleClick: () => {
                    console.log('edit');
                    this.props.history.push(`/console/jobs/${detail.ID}/edit`);
                }
            },
            {
                name: '删除',
                component: <Confirm
                    render={(clickOpen) => (<div className={classes.delete} onClick={clickOpen}>删除</div>)}
                    agree={{
                        text: '确认',
                        func: () => {
                            console.log('delete');
                            deleteJob(this.props.dispatch, detail.ID);
                            this.props.history.push(`/console/jobs/list`);
                        },
                    }}
                    disagree={{ text: '取消' }}
                    dialogTitle={'警告'}
                    dialogContent={'将会删除当前应用及其所有相关信息，确认删除吗'}
                />
            }
        ]

        return (
            <Paper className={classes.root}>
                <AppMainUpper type='job_detail' status={kvMap[detail.Status] || detail.Status} statusColor={colorMap[detail.Status] || ''} data={{ defaultCommand, commandList, name: detail.Name }} />
                <Tabs contentList={tabList} viewProps={{ detail, status, allocationList, jobHistory }} reducedHeight={163} className2={{ bg: classes.bgcolor, selected: classes.selected }} />       {/* tabWrapColor='rgb(96,139,162)'  */}
            </Paper>
        );
    }
}
JobDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        detail: state.jobdetail.detail,
        jobHistory: state.jobdetail.history,
        allocationList: state.jobdetail.allocationList,
        status: state.jobdetail.status,
        nativeDetail: state.jobdetail.nativeDetail
    };
}

export default connect(mapStateToProps)(withStyles(styles)(JobDetail));