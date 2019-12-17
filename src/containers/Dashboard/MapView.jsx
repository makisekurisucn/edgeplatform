import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { Map, Marker, Circle } from 'react-amap';
import SearchBox from '../../components/SearchBox';
import ListItem from '../../components/DashboardListItem';
import EmptyListItem from '../../components/DashboardListItem/EmptyListItem';
import FadeWrap from '../../components/FadeWrap';
import ListNav from '../../components/ListNav';
import DashboardNodeView from '../../containers/DashboardNodeView';
import NumberBoard from '../../components/NumberBoard'
import { getDCList, getNodeList } from '../../actions/DC';
import { getWorkerDetail } from '../../actions/Node';
import { setRegion } from '../../utils/handleRequest';
import { getAllocationList } from '../../actions/Allocation';
import { getNodePrometheus } from '../../actions/Prometheus';


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
            inputValue: '',
            mapZoom: '',
            mapScale: '',
            mapCenter: null
        };
        this.timeID = null;
        this.delay = 200;
        this.prevScroll = 0;
        this.mapEvents = {
            created: (map) => {
                this.mapInstance = map;
                this.mapInstance.on('mousewheel', this.scrollListener);
                //showcenter的原意？
                // this.showCenter();
            },
            // moveend: () => { this.showCenter() }
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getDCList(dispatch);

    }
    componentWillUnmount() {
        if (this.mapInstance) {
            // this.mapInstance.removeEventListener('scroll',this.scrollListener);
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
        if (this.mapInstance) {
            this.setState({
                mapZoom: this.mapInstance.getZoom(),
                mapScale: this.mapInstance.getScale(),
                mapCenter: this.mapInstance.getCenter()
            })
        }
    }
    goBack = (title) => {
        if (this.state.isSearched) {
            this.setState({
                isDCListHidden: true,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden: false,
                nodeIndex: -1,
                mapCenter: null
            });
        } else {
            this.setState({
                isDCListHidden: false,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden: true,
                nodeIndex: -1,
                mapCenter: null
            });
        }
    }
    showList = (item, index) => {
        const { dispatch } = this.props;
        getNodeList(dispatch, item.region, item.Datacenter);

        this.setState({
            isDCListHidden: true,
            isNodeListHidden: false,
            isSearchListHidden: true,
            isNodeDetailHidden: true,
            currentRegion: item.region,
            currentDatacenter: item.Datacenter,
            DCInfo: item.DCInfo,
            nodeIndex: -1,
            mapCenter: null
        });
    }
    showDetail = (item, index) => {
        let isHidden = false;
        setRegion(item.region);
        const { dispatch } = this.props;
        getWorkerDetail(dispatch, item.ID);
        getAllocationList(dispatch);
        if (this.state.nodeIndex !== index) {
            getNodePrometheus(dispatch, item.ID, item.Datacenter);
            this.setState({
                isNodeDetailHidden: isHidden,
                nodeIndex: index,
                mapCenter: null
            })
        }
        else {
            this.setState({
                isNodeDetailHidden: !isHidden,
                nodeIndex: -1,
                mapCenter: null
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
                inputValue: inputValue,
                mapCenter: null
            })
        } else {
            this.setState({
                isDCListHidden: true,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden: false,
                isSearched: true,
                inputValue: inputValue,
                nodeIndex: -1,
                mapCenter: null
            })
        }
    }
    render() {
        const { classes, DClist, nodeWorkerDetail, regionCount } = this.props;
        const { list, nodelist, allRegionNodelist, DCInfoMap } = DClist;

        let { detail } = nodeWorkerDetail;
        if (this.state.isNodeDetailHidden) {
            detail = {};
        }
        const plugins = ['Scale', 'ControlBar'];

        const currentRegion = this.state.currentRegion;
        const currentDatacenter = this.state.currentDatacenter;

        const DCInfo = this.state.DCInfo;

        let DCListLongitude = 0, DCListLatitude = 0, searchListLongitude = 0, searchListLatitude = 0;
        let validDCNumber = 0, validSearchNumber = 0;
        let DCListCenter = {}, searchListCenter = {};


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
                DCListLongitude += parseFloat(DCInfo.longitude);
                DCListLatitude += parseFloat(DCInfo.latitude);
                validDCNumber++;
            }
            let isMatched = false;

            if (this.state.isSearched === true) {
                const searchInfo = {
                    DC: DCInfo.DC,
                    region: DCInfo.region,
                    address: DCInfo.address
                };
                for (let key in searchInfo) {
                    if (searchInfo[key].indexOf(this.state.inputValue) > -1) {
                        isMatched = true;
                    }
                }
                if (isMatched === true) {
                    searchList.push({ DC: DC, type: 'dc', DCInfo: DCInfo });
                    if (DCInfo.longitude !== '未知' && DCInfo.latitude !== '未知') {
                        searchListLongitude += parseFloat(DCInfo.longitude);
                        searchListLatitude += parseFloat(DCInfo.latitude);
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
                    searchListLongitude += parseFloat(DCInfo.longitude);
                    searchListLatitude += parseFloat(DCInfo.latitude);
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
            const screenRadius = this.state.mapScale ? (radius / this.state.mapScale) : 1;
            if (screenRadius < 0.01) {
                MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || center} events={this.mapEvents}>
                    <Marker position={center} />
                </Map>;
            } else {
                MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || center} events={this.mapEvents}>
                    <Circle center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                </Map>;
            }
        } else if (!this.state.isSearchListHidden) {
            if (this.state.nodeIndex > -1) {
                const node = searchList[this.state.nodeIndex];
                center = getCenter(node.DCInfo.longitude, node.DCInfo.latitude);
                radius = getRadius(node.DCInfo.range);
                const screenRadius = this.state.mapScale ? (radius / this.state.mapScale) : 1;
                if (screenRadius < 0.01) {
                    MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || center} events={this.mapEvents}>
                        <Marker position={center} />
                    </Map>;
                } else {
                    MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || center} events={this.mapEvents}>
                        <Circle center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                    </Map>;
                }
            } else {
                MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || searchListCenter} events={this.mapEvents}>
                    {
                        searchList.map((item, index) => {
                            center = getCenter(item.DCInfo.longitude, item.DCInfo.latitude);
                            radius = getRadius(item.DCInfo.range);
                            const screenRadius = this.state.mapScale ? (radius / this.state.mapScale) : 1;
                            if (screenRadius < 0.01) {
                                return <Marker key={index} position={center} />
                            } else {
                                return <Circle key={index} center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                            }
                        })
                    }
                </Map>;
            }
        } else {
            MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter || DCListCenter} events={this.mapEvents}>
                {
                    list.map((item, index) => {
                        const DCInfo = DCInfoMap[item.region][item.Datacenter];
                        center = getCenter(DCInfo.longitude, DCInfo.latitude);
                        radius = getRadius(DCInfo.range);
                        const screenRadius = this.state.mapScale ? (radius / this.state.mapScale) : 1;
                        if (screenRadius < 0.01) {
                            return <Marker key={item.Datacenter} position={center} />
                        } else {
                            return <Circle key={item.Datacenter} center={center} style={mapCircleStyle.yellowCircle} radius={radius} />
                        }
                    })
                }
            </Map>;
        }

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
                                        return <ListItem type='search_node' itemData={{ ...item.DCInfo, name: item.node.name, ID: item.node.ID }} region={item.node.region} Datacenter={item.node.Datacenter} index={index} onClick={this.showDetail} key={index} selected={index === this.state.nodeIndex} />
                                    } else {
                                        return null;
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

    return {
        DClist: state.DClist,
        nodeWorkerDetail: state.nodeWorkerDetail,
        regionCount: state.region.regionList.length
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
