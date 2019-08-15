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
const getRadius = (str) => {
    if (str) {
        if (str === '未知') {
            return 0;
        } else if (str.indexOf('km') > -1) {
            return parseInt(str) * 1000;
        } else if (str.indexOf('m') > -1) {
            return parseInt(str);
        } else {
            return 0;
        }
    }
}
const getCenter = (longitude, latitude) => {
    let center = {};
    if (longitude !== '未知' && latitude !== '未知') {
        center.longitude = longitude;
        center.latitude = latitude;
    } else {
        center = null;
    }
    return center;
}

class AllocationDistribution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canUpdata: true,
            allocIndex: -1,
            currentNodeID: '',
            isTaskDetailHidden: true,
            inputValue: '',
            isSearched: false,
            mapZoom: '',
            mapScale: '',
            mapCenter: null
        };
        this.mapDiv = {};
        this.timeID = null;
        this.delay = 200;
        this.prevScroll = 0;
        this.mapEvents = {
            created: (map) => {
                this.mapInstance = map;
                this.mapInstance.on('mousewheel', this.scrollListener);
            },
        };
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

    componentWillUnmount() {
        if (this.mapInstance) {
            this.mapInstance.destroy();
        }
    }

    scrollListener = () => {
        const current = Date.now();
        if ((current - this.prevScroll) >= this.delay) {
            this.redrawMap();
            this.prevScroll = current;
        } else {
            clearTimeout(this.timeID);
            this.timeID = setTimeout(() => {
                this.prevScroll = current;
                this.redrawMap();
            }, this.delay);
        }
    }

    redrawMap = () => {
        console.log('ddd')
        console.log(this.mapInstance.getZoom())
        console.log(this.mapInstance.getScale())
        if (this.mapInstance) {
            this.setState({
                mapZoom: this.mapInstance.getZoom(),
                mapScale: this.mapInstance.getScale(),
                mapCenter: this.mapInstance.getCenter()
            })
        }
    }

    showAlloc = (item, index) => {
        let isHidden = false;
        const { dispatch } = this.props;
        if (this.state.allocIndex !== index) {
            this.setState({
                isTaskDetailHidden: isHidden,
                allocIndex: index,
                currentNodeID: item.id,
                mapCenter: null
            })
        }
        else {
            this.setState({
                isTaskDetailHidden: !isHidden,
                allocIndex: -1,
                currentNodeID: '',
                mapCenter: null
            })
        }
    }

    handleSearch = (inputValue) => {
        if (inputValue === '') {
            this.setState({
                isTaskDetailHidden: true,
                inputValue: '',
                isSearched: false,
                allocIndex: -1,
                mapCenter: null
            })
        } else {
            this.setState({
                isTaskDetailHidden: true,
                inputValue: inputValue,
                isSearched: true,
                allocIndex: -1,
                mapCenter: null
            })
        }
    }

    render() {
        const { classes, className, data, DCInfoMap, nodelist } = this.props;
        const { detail: jobDetail, status, allocationList } = data;
        const plugins = ['Scale', 'ControlBar'];
        let DCInfo = {};
        let currentNode = {};
        let searchList = [];
        let searchList_temp = [];//创建searchList副本用于job排序 20190813
        let searchList_sort = [];
        let searchListLongitude = 0, searchListLatitude = 0, validSearchNumber = 0;
        let searchListCenter = {};
        nodelist.forEach(node => {
            if (node.ID === this.state.currentNodeID) {
                currentNode = node;
            }
        })
        if (jobDetail.Region && currentNode.Datacenter) {
            DCInfo = DCInfoMap[jobDetail.Region][currentNode.Datacenter];
        }


        allocationList.forEach(alloc => {
            let DCInfo = {};
            let runningTasksNumber = 0;
            let pendingTaskNumber = 0;
            let deadTaskNumber = 0;
            let Datacenter = '';
            nodelist.forEach(node => {
                if (node.ID === alloc.NodeID && DCInfoMap[jobDetail.Region]) {
                    DCInfo = DCInfoMap[jobDetail.Region][node.Datacenter];
                    Datacenter = node.Datacenter;
                }
            })
            for (let task in alloc.TaskStates) {
                switch (alloc.TaskStates[task].State) {
                    case 'running':
                        runningTasksNumber++; break;
                    case 'pending':
                        pendingTaskNumber++; break;
                    case 'dead':
                        deadTaskNumber++; break;
                    default:
                        console.log('非预期的状态');
                        console.log(alloc.TaskStates[task].State);
                }
            }
            const date = formatTime(alloc.CreateTime);
            const allocName = getAllocationName(alloc.Name);
            const location = `${DCInfo.DC}-${DCInfo.region}`;
            const itemData = {
                title: allocName,
                DCInfo,
                date,
                runningTasksNumber,
                pendingTaskNumber,
                deadTaskNumber,
                location,
                id: alloc.NodeID,
                Datacenter,
                region: jobDetail.Region
            }
            if (this.state.isSearched === true) {
                let searchInfo = {
                    allocName,
                    date,
                    runningStatus: runningTasksNumber > 0 ? runningTasksNumber + '运行中' : '',
                    pendingStatus: pendingTaskNumber > 0 ? pendingTaskNumber + '启动中' : '',
                    deadStatus: deadTaskNumber > 0 ? deadTaskNumber + '已停止' : '',
                    location
                }
                let isMatched = false;
                for (let key in searchInfo) {
                    if (searchInfo[key].indexOf(this.state.inputValue) > -1) {
                        isMatched = true;
                    }
                }
                if (isMatched === true) {
                    searchList.push(itemData);
                    if (DCInfo.longitude !== '未知' && DCInfo.latitude !== '未知') {
                        searchListLongitude += parseInt(DCInfo.longitude);
                        searchListLatitude += parseInt(DCInfo.latitude);
                        validSearchNumber++;
                    }
                }
            } else {
                searchList.push(itemData);
                if (DCInfo.longitude !== '未知' && DCInfo.latitude !== '未知') {
                    searchListLongitude += parseInt(DCInfo.longitude);
                    searchListLatitude += parseInt(DCInfo.latitude);
                    validSearchNumber++;
                }
            }

        })
        if (searchListLatitude === 0 && searchListLongitude === 0) {
            searchListCenter = null;
        } else {
            searchListCenter.longitude = searchListLongitude / validSearchNumber;
            searchListCenter.latitude = searchListLatitude / validSearchNumber;
        }

        let MyMap = null;
        if (this.state.isTaskDetailHidden) {
            MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || searchListCenter} events={this.mapEvents}>
                {
                    searchList.map((item, index) => {
                        const center = getCenter(item.DCInfo.longitude, item.DCInfo.latitude);
                        const radius = getRadius(item.DCInfo.range);
                        const screenRadius = this.state.mapScale ? (radius / this.state.mapScale) : 1;
                        if (screenRadius < 0.01) {
                            return <Marker key={index} position={center} />
                        } else {
                            return <Circle key={index} center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                        }
                    })
                }
            </Map>
        } else {
            const radius = getRadius(DCInfo.range);
            const center = getCenter(DCInfo.longitude, DCInfo.latitude);
            const screenRadius = this.state.mapScale ? (radius / this.state.mapScale) : 1;
            if (screenRadius < 0.01) {
                MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || center} events={this.mapEvents}>
                    <Marker center={center} />
                </Map>
            } else {
                MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || center} events={this.mapEvents}>
                    <Circle center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                </Map>
            }
        }

        //Date:2019-8-13
        //Change:排序三种状态
        //LiangShuang
        searchList_temp = searchList;//备份对象
        //提取数组中正在启动的对象
        let result_pending = searchList_temp.filter(function (value, index, array) {
            return (value.pendingTaskNumber > 0)
        });
        //提取数组中正在running的对象
        let result_running = searchList_temp.filter(function (value, index, array) {
            return ((value.pendingTaskNumber === 0) && (value.runningTasksNumber > 0))
        });
        //提取数组中剩余的对象
        let result_dead = searchList_temp.filter(function (el) {
            return [...result_pending, ...result_running].indexOf(el) < 0;
        });
        searchList_sort = [...result_pending, ...result_running, ...result_dead]

        return (
            <div className={classes.root}>
                <FixedHeight reducedHeight={163} >
                    <div style={{ height: '100%', width: '100%' }} ref={(ele) => { this.mapDiv = ele }}>
                        {
                            this.mapDiv.clientHeight > 0 ?
                                // <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={searchListCenter} >
                                //     {
                                //         searchList.map((item, index) => {
                                //             const center = getCenter(item.DCInfo.longitude, item.DCInfo.latitude);
                                //             const radius = getRadius(item.DCInfo.range);
                                //             return <Circle key={index} center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                                //         })
                                //     }
                                // </Map>
                                MyMap
                                : null
                        }
                        <SearchBox className={classes.searchWrap} onSearch={this.handleSearch} />
                        <div className={classes.listWrap}>
                            {/* <ListItem type='dc' itemData={item.DCInfo} region={item.region} Datacenter={item.Datacenter} index={index} onClick={this.showList} key={index} /> */}
                            {/* <EmptyListItem></EmptyListItem> */}
                            <FixedHeight reducedHeight={227}>
                                {

searchList_sort.length < 1 ? <EmptyListItem></EmptyListItem> : searchList_sort.map((item, index) => {  //searchList.map((item, index) => {
                                        if (index === this.state.allocIndex) {
                                            return <ListItem onClick={this.showAlloc} index={index} itemData={item} key={item.title} selected></ListItem>;
                                        } else {
                                            return <ListItem onClick={this.showAlloc} index={index} itemData={item} key={item.title}></ListItem>;
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