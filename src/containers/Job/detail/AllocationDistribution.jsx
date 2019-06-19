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
import { getWorkerList } from '../../../actions/Node';
import { getPrometheus } from '../../../actions/Prometheus';

const styles = theme => ({
    root: {
        position: 'relative'
    },
    searchWrap: {
        position: 'absolute',
        top: 10,
        left: 8,
        height: '36px',
        width: '256px'
    },
    listWrap: {
        position: 'absolute',
        width: 256,
        left: 8,
        top: 54,
        backgroundColor: 'rgba(22,22,22,0.8)',

    },
    // listBkg: {
    //     backgroundColor: 'rgba(216,216,216,0.11)',
    // },
    darkBkg: {
        backgroundColor: 'rgba(21,21,21,0.9)'
    },
    detailWrap: {
        position: 'absolute',
        width: 512,
        top: 10,
        left: 272
    },


});


const mapCircleStyle = {
    yellowCircle: {
        fillColor: '#AF954B',
        fillOpacity: 0.5,
        strokeWeight: 0,
        strokeColor: '#AF954B',
        zIndex: 10
    },
    greenCircle: {
        fillColor: '#4BAF7E',
        fillOpacity: 0.5,
        strokeWeight: 0,
        strokeColor: '#4BAF7E',
        zIndex: 10
    },
    grayCircle: {
        fillColor: '#ABABAB',
        fillOpacity: 0.5,
        strokeWeight: 0,
        strokeColor: '#ABABAB',
        zIndex: 10
    }

}

const getAllocationName = (prevName) => {
    if (typeof prevName === 'string') {
        const index = prevName.indexOf('.');
        return prevName.substr(index + 1);
    }
    return prevName;
}

class AllocationDistribution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canUpdata: true,
            allocIndex: -1,
            currentNodeID: '',
            isTaskDetailHidden: true
        };
        this.mapDiv = {};
    }

    componentDidMount() {
        const { dispatch } = this.props;
        getWorkerList(dispatch);
    }

    componentDidUpdate() {
        // console.log('did update')
        // console.log(this.props.isHidden)
        // console.log('canupdate: '+this.state.canUpdata)
        // console.log('height: '+this.rootDiv.clientHeight)
        if (this.props.isHidden === false) {
            if (this.mapDiv.clientHeight > 0 && this.state.canUpdata === true) {
                this.setState({
                    canUpdata: false
                })
            }
        }
        else {
            if (this.state.canUpdata === false) {
                this.setState({
                    canUpdata: true
                })
            }
        }
    }

    showAlloc = (item, index) => {
        let isHidden = false;
        const { dispatch } = this.props;
        getPrometheus(dispatch, item.id, item.Datacenter);
        if (this.state.allocIndex !== index) {
            this.setState({
                isTaskDetailHidden: isHidden,
                allocIndex: index,
                currentNodeID: item.id
            })
        }
        else {
            this.setState({
                isTaskDetailHidden: !isHidden,
                allocIndex: -1,
                currentNodeID: ''
            })
        }
    }

    render() {
        const { classes, className, data, DCInfoMap, nodelist } = this.props;
        const { detail: jobDetail, status, allocationList } = data;
        const plugins = ['Scale', 'ControlBar'];
        let DCInfo = {};
        let currentNode = {}
        nodelist.forEach(node => {
            if (node.ID === this.state.currentNodeID) {
                currentNode = node;
            }
        })
        if (jobDetail.Region && currentNode.Datacenter) {
            DCInfo = DCInfoMap[jobDetail.Region][currentNode.Datacenter];
        }

        return (
            <div className={classes.root}>
                <FixedHeight reducedHeight={163} >
                    <div style={{ height: '100%', width: '100%' }} ref={(ele) => { this.mapDiv = ele }}>
                        {
                            this.mapDiv.clientHeight > 0 ?
                                <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={{ longitude: 120, latitude: 30 }} >
                                </Map>
                                : null
                        }
                        <SearchBox className={classes.searchWrap} onSearch={this.handleSearch} />
                        <div className={classes.listWrap}>
                            {/* <ListItem type='dc' itemData={item.DCInfo} region={item.region} Datacenter={item.Datacenter} index={index} onClick={this.showList} key={index} /> */}
                            {/* <EmptyListItem></EmptyListItem> */}
                            <FixedHeight reducedHeight={227}>
                                {
                                    allocationList.map((alloc, index) => {
                                        let DCInfo = {};
                                        let runningTasksNumber = 0;
                                        let Datacenter = '';
                                        nodelist.forEach(node => {
                                            if (node.ID === alloc.NodeID && DCInfoMap[jobDetail.Region]) {
                                                DCInfo = DCInfoMap[jobDetail.Region][node.Datacenter];
                                                Datacenter = node.Datacenter;
                                            }
                                        })
                                        console.log(alloc.TaskStates)
                                        for (let task in alloc.TaskStates) {
                                            if (alloc.TaskStates[task].State === 'running') {
                                                runningTasksNumber++;
                                            }

                                        }
                                        const itemData = {
                                            title: getAllocationName(alloc.Name),
                                            date: formatTime(alloc.CreateTime),
                                            itemCount: runningTasksNumber,
                                            location: `${DCInfo.DC}-${DCInfo.region}`,
                                            id: alloc.NodeID,
                                            Datacenter,
                                            region: jobDetail.Region
                                        }
                                        if (index === this.state.allocIndex) {
                                            return <ListItem onClick={this.showAlloc} index={index} itemData={itemData} key={alloc.ID} selected></ListItem>;
                                        } else {
                                            return <ListItem onClick={this.showAlloc} index={index} itemData={itemData} key={alloc.ID}></ListItem>;
                                        }
                                    })
                                }
                            </FixedHeight>
                        </div>
                        <div className={classes.detailWrap}>
                            <FadeWrap className={classes.darkBkg} isHidden={this.state.isTaskDetailHidden} from='left' to='left'>
                                <TaskView DCInfo={DCInfo} node={currentNode} alloc={allocationList[this.state.allocIndex]} region={jobDetail.Region} />
                            </FadeWrap>
                        </div>
                    </div>

                </FixedHeight>

            </div>
        );
    }
}
AllocationDistribution.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        DCInfoMap: state.DClist.DCInfoMap,
        nodelist: state.nodeWorkerList.list
    };
}
export default connect(mapStateToProps)(withStyles(styles)(AllocationDistribution));