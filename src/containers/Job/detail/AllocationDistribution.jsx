import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { formatTime } from '../../../utils/formatTime';
import { Map, Marker, Circle } from 'react-amap';
import FixedHeight from '../../../components/FixedHeight';
import SearchBox from '../../../components/SearchBox';
import ListItem from '../../../components/AllocationListItem';
import EmptyListItem from '../../../components/DashboardListItem/EmptyListItem';
import FadeWrap from '../../../components/FadeWrap';
import TaskView from '../../TaskView';
import AllocationList from './AllocationList';
import { getWorkerList } from '../../../actions/Node';
import { getAllocationDetail, startBlockingAllocDetail, stopBlockingAllocDetail } from '../../../actions/Allocation';

const styles = theme => ({
    root: {
        position: 'relative'
    },
    searchWrap: {
        position: 'absolute',
        top: 10,
        left: 8,
        height: '36px',
        width: '256px',
        lineHeight: '36px',
        fontSize: '15px',
        fontWeight: '300'
    },
    listWrap: {
        position: 'absolute',
        width: 256,
        left: 8,
        top: 54,
        // backgroundColor: 'rgba(22,22,22,0.8)',
        boxShadow: '1px 1px 6px #ababab'
    },
    detailWrap: {
        position: 'absolute',
        width: 1170,
        top: 10,
        left: 278,
        boxShadow: '1px 1px 6px #ababab'
    },


});

class AllocationDistribution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllocListHidden: false,
            alloc: {},
            allocID: null,
            extraData: {}
        };

    }

    componentDidMount() {
        const { dispatch } = this.props;
        getWorkerList(dispatch);
    }

    switchComponent = (data) => {
        const { isAllocListHidden, extraData } = data;
        const { allocationList, dispatch } = this.props
        if (isAllocListHidden === true) {
            const allocID = extraData.ID;
            // getAllocationDetail(dispatch, allocID);
            startBlockingAllocDetail(dispatch, allocID, '2m');
            let alloc = {};
            allocationList.forEach(item => {
                if (item.ID === allocID) {
                    alloc = item;
                }
            })
            this.setState({
                isAllocListHidden,
                extraData,
                alloc,
                allocID
            })
        } else if (isAllocListHidden === false) {
            stopBlockingAllocDetail(dispatch, this.state.allocID)
            this.setState({
                isAllocListHidden,
                extraData: {},
                alloc: {},
                allocID: null
            })
        }

    }

    showAlloc = (item, index) => {
        this.setState({
            allocIndex: index,
            currentNodeID: item.id
        })
    }

    render() {
        const { classes, className, data, allocationList, DCInfoMap, nodelist } = this.props;
        const { ID, detail: jobDetail, status } = data;


        return (
            <div className={classes.root}>
                <div style={{ width: '100%', display: `${this.state.isAllocListHidden ? 'none' : 'block'}` }}>
                    <AllocationList data={{ allocationList, ...data }} DCInfoMap={DCInfoMap} nodelist={nodelist} switchComponent={this.switchComponent} />
                </div>
                <div style={{ width: '100%', display: `${this.state.isAllocListHidden ? 'block' : 'none'}` }}>
                    {/* <TaskView extraData={this.state.extraData} allocID={this.state.allocID} alloc={this.state.alloc} switchComponent={this.switchComponent} /> */}
                    <TaskView extraData={this.state.extraData} allocID={this.state.allocID} switchComponent={this.switchComponent} />
                </div>
            </div>
        );
    }
}
AllocationDistribution.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        allocationList: state.jobdetail.allocationList,
        DCInfoMap: state.DClist.DCInfoMap,
        nodelist: state.nodeWorkerList.list
    };
}
export default connect(mapStateToProps)(withStyles(styles)(AllocationDistribution));