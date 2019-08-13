import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '../../../components/Tabs';
import Paper from '@material-ui/core/Paper';
// import { getJobDetail, resetStatus } from '../../../actions/Job';
// import { getDCList } from '../../../actions/DC';
import { blueGrey, lightGreen, amber, lightBlue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import { formatTime } from '../../../utils/formatTime';
import { getWorkerDetail, resetStatus } from '../../../actions/Node';
import { setRegion, getRegion } from '../../../utils/handleRequest';
import AppMainUpper from '../../../components/AppMainUpper';
import WorkNodeInfo from './WorkNodeInfo';
import EventInfo from './EventInfo';
// import AllocationDistribution from './AllocationDistribution';
// import JobHistory from './JobHistory';




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
    }

});

const tabList = [
    {
        name: '基本信息',
        component: WorkNodeInfo
    },
    {
        name: '事件信息',
        component: EventInfo
    }
];

const kvMap = {
    pending: '启动中',
    running: '运行中',
    ready: '就绪'
}

class WorkNodeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        const currentRegion = getRegion();
        setRegion(currentRegion);
        // const { dispatch } = this.props;
        // // resetStatus(dispatch);
        // let id = this.props.match.params.id;
        // // getJobDetail(dispatch, id);
        // // getDCList(dispatch);
        setRegion(currentRegion);

        const { dispatch } = this.props;
        resetStatus(dispatch);
        let id = this.props.match.params.id;
        getWorkerDetail(dispatch, id);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // if (nextProps.statusIndex) {
        //     this.setState({
        //         statusIndex: nextProps.statusIndex
        //     });
        // }

    }


    render() {
        const { classes, match, detail } = this.props;

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
                <AppMainUpper type='work_node_detail' status={kvMap[detail.Status] || detail.Status} data={{ defaultCommand, commandList, name: detail.Name }} />
                <Tabs contentList={tabList} viewProps={detail} reducedHeight={163} className2={{ bg: classes.bgcolor, selected: classes.selected }} />
            </Paper>
        );
    }
}
WorkNodeDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
    console.log(state)
    return state.nodeWorkerDetail;
}

export default connect(mapStateToProps)(withStyles(styles)(WorkNodeDetail));