import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { Map, Marker, Circle } from 'react-amap';
import Search from '@material-ui/icons/Search';
import SearchBox from '../../components/SearchBox';
import ListItem from '../../components/DashboardListItem';
import EmptyListItem from '../../components/DashboardListItem/EmptyListItem';
import FadeWrap from '../../components/FadeWrap';
import ListNav from '../../components/ListNav';
import DashboardNodeView from '../../containers/DashboardNodeView';
import NumberBoard from '../../components/NumberBoard'
import Button from '@material-ui/core/Button';
import { getDCList, getNodeList } from '../../actions/DC';
import { getWorkerDetail } from '../../actions/Node';
import { setRegion } from '../../utils/handleRequest';
import { getAllocationList } from '../../actions/Allocation';
import { getNodePrometheus } from '../../actions/Prometheus';
import { node } from 'prop-types';



// import Drawer from '@material-ui/core/Drawer';
// import Grid from '@material-ui/core/Grid';
// import logo from './logo.svg';
// import './App.css';
const styles = {
    dashboard: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    inputs: {
        height: 48,
        width: 384,
        position: 'absolute',
        zIndex: 100,
        top: 24,
        left: 24,
        backgroundColor: 'rgba(22,22,22,0.8)',
        boxShadow: '1px 1px 6px #ababab',
        lineHeight: "48px",
        textIndent: 30,
        fontSize: 20,
        border: 'none',
        color: '#EEF9FF',
        '&:focus': {
            outline: 'none'
        }
    },
    dashboardInnerWrap: {
        position: 'absolute',
        width: '100%',
        top: 60,
        height: 0,
        overflow: 'visible'
    },
    searchWrap: {
        position: 'absolute',
        top: 24,
        left: 24
    },
    listWrap: {
        position: 'absolute',
        width: 384,
        left: 24,
        top: 84,

    },
    listBkg: {
        backgroundColor: 'rgba(22,22,22,0.8)',
    },
    darkBkg: {
        backgroundColor: 'rgba(21,21,21,0.9)'
    },
    detailWrap: {
        position: 'absolute',
        width: 512,
        top: 24,
        left: 420
    },
    numberBoard: {
        position: 'absolute',
        top: 24,
        right: 24
    },
    marginBottom10: {
        marginBottom: 10
    }

};
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
        zIndex: 1000
    },
    grayCircle: {
        fillColor: '#ff0000',
        fillOpacity: 0.5,
        strokeWeight: 0,
        strokeColor: '#ABABAB',
        zIndex: 10
    }

}
const getRadius = (str) => {
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

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isDCListHidden: false,
            isNodeListHidden: true,
            isNodeDetailHidden: true,
            isSearchListHidden: true,
            DCInfo: {},
            currentRegion: '',
            currentDatacenter: '',
            nodeIndex: -1,
            isSearched: false,
            inputValue: ''
        };
        this.mapEvents = {
            created: (map) => {
                this.mapInstance = map;
                this.showCenter();
            },
            moveend: () => { this.showCenter() }
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getDCList(dispatch);

        // console.log(this.textInput);
        // const { dispatch } = this.props;
        // initCreateJob(dispatch);

        // setInterval(()=>{
        //     this.setState({
        //         isNodeListHidden: !this.state.isNodeListHidden
        //     });
        // },2000)

    }
    goBack = (title) => {
        if (this.state.isSearched) {
            this.setState({
                isDCListHidden: true,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden: false,
                nodeIndex: -1
            });
        } else {
            this.setState({
                isDCListHidden: false,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden: true,
                nodeIndex: -1
            });
        }
    }
    showList = (item, index) => {
        const { dispatch } = this.props;
        getNodeList(dispatch, item.region, item.Datacenter);
        console.log(this.props)
        console.log(this);

        this.setState({
            isDCListHidden: true,
            isNodeListHidden: false,
            isSearchListHidden: true,
            isNodeDetailHidden: true,
            currentRegion: item.region,
            currentDatacenter: item.Datacenter,
            DCInfo: item.DCInfo,
            nodeIndex: -1
        });
    }
    showDetail = (item, index) => {
        let isHidden = false;
        setRegion(item.region);
        const { dispatch } = this.props;
        getWorkerDetail(dispatch, item.ID);
        getAllocationList(dispatch);
        getNodePrometheus(dispatch, item.ID, item.Datacenter);
        if (this.state.nodeIndex !== index) {
            this.setState({
                isNodeDetailHidden: isHidden,
                nodeIndex: index
            })
        }
        else {
            this.setState({
                isNodeDetailHidden: !isHidden,
                nodeIndex: -1
            })
        }
    }
    handleSearch = (inputValue) => {
        if (inputValue === '') {
            this.setState({
                isDCListHidden: false,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden: true,
                isSearched: false,
                inputValue: inputValue
            })
        } else {
            this.setState({
                isDCListHidden: true,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden: false,
                isSearched: true,
                inputValue: inputValue,
                nodeIndex: -1
            })
        }
    }
    render() {
        const { classes, DClist, nodeWorkerDetail, regionCount } = this.props;
        const { list, nodelist, allRegionNodelist, DCInfoMap } = DClist;
        const { detail } = nodeWorkerDetail;
        const plugins = ['Scale', 'ControlBar'];

        const currentRegion = this.state.currentRegion;
        const currentDatacenter = this.state.currentDatacenter;

        const DCInfo = this.state.DCInfo;

        let DCListLongitude = 0, DCListLatitude = 0, searchListLongitude = 0, searchListLatitude = 0;
        let validDCNumber = 0, validSearchNumber = 0;
        let DCListCenter = {}, searchListCenter = {};
        console.log(this.props);


        let wrappedNodelist = [];
        nodelist.forEach((item, index) => {
            if (index === this.state.nodeIndex) {
                item.selected = true;
            }
            else {
                item.selected = false;
            }
            wrappedNodelist.push(item);
        });


        let searchList = [];
        list.forEach((DC) => {
            const DCInfo = DCInfoMap[DC.region][DC.Datacenter];
            if (DCInfo.longitude !== '未知' && DCInfo.latitude !== '未知') {
                DCListLongitude += parseInt(DCInfo.longitude);
                DCListLatitude += parseInt(DCInfo.latitude);
                validDCNumber++;
            }
            let isMatched = false;

            if (this.state.isSearched === true) {
                const searchInfo = {
                    DC: DCInfo.DC,
                    region: DCInfo.region,
                    address: DCInfo.address
                };
                console.log(searchInfo)
                for (let key in searchInfo) {
                    if (searchInfo[key].indexOf(this.state.inputValue) > -1) {
                        isMatched = true;
                    }
                }
                if (isMatched === true) {
                    searchList.push({ DC: DC, type: 'dc', DCInfo: DCInfo });
                    if (DCInfo.longitude !== '未知' && DCInfo.latitude !== '未知') {
                        searchListLongitude += parseInt(DCInfo.longitude);
                        searchListLatitude += parseInt(DCInfo.latitude);
                        validSearchNumber++;
                    }
                }
            }
        })
        if (DCListLatitude === 0 && DCListLongitude === 0) {
            DCListCenter = null;
        } else {
            DCListCenter.longitude = DCListLongitude / validDCNumber;
            DCListCenter.latitude = DCListLatitude / validDCNumber;
        }

        allRegionNodelist.forEach((node) => {
            let isMatched = false;
            const DCInfo = DCInfoMap[node.region][node.Datacenter];
            const searchInfo = { name: node.name, DC: DCInfo.DC, region: DCInfo.region, address: DCInfo.address };
            for (let key in searchInfo) {
                if (searchInfo[key].indexOf(this.state.inputValue) > -1) {
                    isMatched = true;
                }
            }
            if (isMatched === true) {
                searchList.push({ type: 'node', node, DCInfo });
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
        let radius = 0;
        let center = {};
        if (!this.state.isNodeListHidden) {
            radius = getRadius(DCInfo.range);
            center = getCenter(DCInfo.longitude, DCInfo.latitude);
            MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={center}>
                <Circle center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
            </Map>;
        } else if (!this.state.isSearchListHidden) {
            if (this.state.nodeIndex > -1) {
                const node = searchList[this.state.nodeIndex];
                center = getCenter(node.DCInfo.longitude, node.DCInfo.latitude);
                radius = getRadius(node.DCInfo.range);
                MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={center}>
                    <Circle center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                </Map>;
            } else {
                MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={searchListCenter}>
                    {
                        searchList.map((item, index) => {
                            center = getCenter(item.DCInfo.longitude, item.DCInfo.latitude);
                            radius = getRadius(item.DCInfo.range);
                            return <Circle key={index} center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                        })
                    }
                </Map>;
            }
        } else {
            MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={DCListCenter}>
                {
                    list.map((item, index) => {
                        const DCInfo = DCInfoMap[item.region][item.Datacenter];
                        center = getCenter(DCInfo.longitude, DCInfo.latitude);
                        radius = getRadius(DCInfo.range);
                        return <Circle key={item.Datacenter} center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                    })
                }
            </Map>;
        }
        //         MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={{ longitude: 115, latitude: 31 }}>
        // {/* 最左三个，左侧为  先大后小    上方为  两个黄色同心圆   中间为  先小后大*/}
        //                 <Circle center={{ longitude: 113, latitude: 36 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 113, latitude: 36 }} style={mapCircleStyle.yellowCircle} radius={100000}/>

        //                 <Circle center={{ longitude: 110, latitude: 34 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 110, latitude: 34 }} style={mapCircleStyle.yellowCircle} radius={50000}/>

        //                 <Circle center={{ longitude: 113, latitude: 34 }} style={mapCircleStyle.yellowCircle} radius={50000}/>
        //                 <Circle center={{ longitude: 113, latitude: 34 }} style={mapCircleStyle.yellowCircle} radius={100000}/>


        // {/* 红黄大小“ 同心圆 ”上方为：先红后黄  下方为：先黄后红 */}
        //                 <Circle center={{ longitude: 116, latitude: 36 }} style={mapCircleStyle.grayCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 116, latitude: 36 }} style={mapCircleStyle.yellowCircle} radius={100000}/>

        //                 <Circle center={{ longitude: 116, latitude: 34 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 116, latitude: 34 }} style={mapCircleStyle.grayCircle} radius={100000}/>


        // {/* 红黄大小”不同“同心圆，红小黄大  上方为：先红后黄  下方为：先黄后红 */}
        //                 <Circle center={{ longitude: 119, latitude: 36 }} style={mapCircleStyle.grayCircle} radius={50000}/>
        //                 <Circle center={{ longitude: 119, latitude: 36 }} style={mapCircleStyle.yellowCircle} radius={100000}/>

        //                 <Circle center={{ longitude: 119, latitude: 34 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 119, latitude: 34 }} style={mapCircleStyle.grayCircle} radius={50000}/>


        // {/* 最右列，从上至下依次为   先绿（大）后黄（小）  先黄后绿   先绿后黄 */}
        //                 <Circle center={{ longitude: 122, latitude: 36 }} style={mapCircleStyle.greenCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 122, latitude: 36 }} style={mapCircleStyle.yellowCircle} radius={50000}/>

        //                 <Circle center={{ longitude: 122, latitude: 34 }} style={mapCircleStyle.yelowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 122, latitude: 34 }} style={mapCircleStyle.greenCircle} radius={100000}/>

        //                 <Circle center={{ longitude: 122, latitude: 32 }} style={mapCircleStyle.greenCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 122, latitude: 32 }} style={mapCircleStyle.yellowCircle} radius={100000}/>

        //                 <Circle center={{ longitude: 125, latitude: 36 }} style={mapCircleStyle.yellowCircle} radius={50000}/>
        //                 <Circle center={{ longitude: 125, latitude: 36 }} style={mapCircleStyle.greenCircle} radius={100000}/>

        //                 <Circle center={{ longitude: 125, latitude: 34 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 125, latitude: 34 }} style={mapCircleStyle.greenCircle} radius={50000}/>

        //                 <Circle center={{ longitude: 125, latitude: 32 }} style={mapCircleStyle.greenCircle} radius={50000}/>
        //                 <Circle center={{ longitude: 125, latitude: 32 }} style={mapCircleStyle.yellowCircle} radius={100000}/>


        // {/* 中间行，分开三个  从左至右分别为  黄色  红色  绿色*/}
        //                 <Circle center={{ longitude: 113, latitude: 32 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 116, latitude: 32 }} style={mapCircleStyle.grayCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 119, latitude: 32 }} style={mapCircleStyle.greenCircle} radius={100000}/>


        // {/* 最下行，部分重叠 */}
        //                 <Circle center={{ longitude: 113.5, latitude: 30 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 115, latitude: 30 }} style={mapCircleStyle.grayCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 115.75, latitude: 28.8 }} style={mapCircleStyle.greenCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 116.5, latitude: 30 }} style={mapCircleStyle.yellowCircle} radius={100000}/>
        //                 <Circle center={{ longitude: 118, latitude: 30 }} style={mapCircleStyle.greenCircle} radius={100000}/>


        //             </Map>;

        return (

            <div className={classes.dashboard}>

                {MyMap}

                <div className={classes.dashboardInnerWrap}>
                    <SearchBox className={classes.searchWrap} onSearch={this.handleSearch} />
                    <div className={classes.listWrap}>
                        <FadeWrap className={classes.listBkg} isHidden={this.state.isDCListHidden} from="left" to="left">
                            {list.map((item, index) => {
                                return <ListItem type='dc' itemData={DCInfoMap[item.region][item.Datacenter]} region={item.region} Datacenter={item.Datacenter} index={index} onClick={this.showList} key={index} />
                            })}
                        </FadeWrap>
                    </div>
                    <div className={classes.listWrap}>
                        <FadeWrap isHidden={this.state.isNodeListHidden} from="right" to="right">
                            <ListNav title={DCInfo.DC} onBack={this.goBack} />
                            <div className={classes.listBkg}>
                                {wrappedNodelist.map((item, index) => {
                                    return <ListItem type='node' itemData={{ ...DCInfo, name: item.name, ID: item.ID }} region={currentRegion} Datacenter={currentDatacenter} index={index} onClick={this.showDetail} key={item.name} selected={item.selected} />
                                })}
                            </div>
                        </FadeWrap>
                    </div>
                    <div className={classes.listWrap}>
                        <FadeWrap className={classes.listBkg} isHidden={this.state.isSearchListHidden} from="bottom" to="bottom">
                            {
                                searchList.length < 1 ? <EmptyListItem></EmptyListItem> : searchList.map((item, index) => {
                                    if (item.type === 'dc') {
                                        return <ListItem type='dc' itemData={item.DCInfo} region={item.DC.region} Datacenter={item.DC.Datacenter} index={index} onClick={this.showList} key={index} />
                                    } else if (item.type === 'node') {
                                        return <ListItem type='search_node' itemData={{ ...item.DCInfo, name: item.node.name, ID: item.node.ID }} region={item.node.region} Datacenter={item.node.Datacenter} index={index} onClick={this.showDetail} key={index} selected={index == this.state.nodeIndex} />
                                    }
                                })
                            }
                        </FadeWrap>
                    </div>
                    <div className={classes.detailWrap}>
                        <FadeWrap className={classes.darkBkg} isHidden={this.state.isNodeDetailHidden} from='left' to='left'>
                            <DashboardNodeView region={currentRegion} Datacenter={currentDatacenter} detail={detail} DCInfoMap={DCInfoMap} />
                        </FadeWrap>
                    </div>
                    <div className={classes.numberBoard}>
                        <NumberBoard className={classes.marginBottom10} title='地域' number={regionCount} />
                        <NumberBoard className={classes.marginBottom10} title='DC' number={list.length} />
                    </div>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state, ownProps) {
    console.log(state);

    return {
        DClist: state.DClist,
        nodeWorkerDetail: state.nodeWorkerDetail,
        regionCount: state.region.regionList.length
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
