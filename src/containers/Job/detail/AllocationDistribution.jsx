import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TaskView from '../../TaskView';
import AllocationList from './AllocationList';
import { getWorkerList } from '../../../actions/Node';
import { startBlockingAllocDetail, stopBlockingAllocDetail } from '../../../actions/Allocation';

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
        boxShadow: '1px 1px 6px #ababab'
    },
    detailWrap: {
        position: 'absolute',
        width: 1170,
        top: 10,
        left: 278,
        boxShadow: '1px 1px 6px #ababab'
    }
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
        window.addEventListener('refreshListState', this.refresh);
    }

    componentWillUnmount() {
        window.removeEventListener('refreshListState', this.refresh);
    }

    refresh = () => {
        this.setState({
            isAllocListHidden: false,
            extraData: {},
            alloc: {},
            allocID: null
        })
    }

    switchComponent = (data) => {
        const { isAllocListHidden, extraData } = data;
        const { allocationList, dispatch } = this.props
        if (isAllocListHidden === true) {
            const allocID = extraData.ID;
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
        const { classes, data, allocationList, DCInfoMap, nodelist } = this.props;

        return (
            <div className={classes.root}>
                <div style={{ width: '100%', display: `${this.state.isAllocListHidden ? 'none' : 'block'}` }}>
                    <AllocationList data={{ allocationList, ...data }} DCInfoMap={DCInfoMap} nodelist={nodelist} switchComponent={this.switchComponent} />
                </div>
                <div style={{ width: '100%', display: `${this.state.isAllocListHidden ? 'block' : 'none'}` }}>
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