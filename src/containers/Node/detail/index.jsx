import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '../../../components/Tabs';
import Paper from '@material-ui/core/Paper';
import { getWorkerDetail, resetStatus } from '../../../actions/Node';
import { setRegion, getRegion } from '../../../utils/handleRequest';
import AppMainUpper from '../../../components/AppMainUpper';
import WorkNodeInfo from './WorkNodeInfo';
import EventInfo from './EventInfo';
import MetricInfo from './MetricInfo';


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
    },
    {
        name: '监控信息',
        component: MetricInfo
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

        const { dispatch } = this.props;
        resetStatus(dispatch);
        let id = this.props.match.params.id;
        getWorkerDetail(dispatch, id);
    }


    render() {
        const { classes, detail } = this.props;

        return (
            <Paper className={classes.root}>
                <AppMainUpper type='work_node_detail' status={kvMap[detail.Status] || detail.Status} data={{ name: detail.Name }} />
                <Tabs contentList={tabList} viewProps={detail} reducedHeight={163} className2={{ bg: classes.bgcolor, selected: classes.selected }} />
            </Paper>
        );
    }
}
WorkNodeDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
    return state.nodeWorkerDetail;
}

export default connect(mapStateToProps)(withStyles(styles)(WorkNodeDetail));