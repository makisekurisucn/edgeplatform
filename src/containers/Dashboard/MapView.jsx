import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { Map, Marker } from 'react-amap';
import Search from '@material-ui/icons/Search';
import SearchBox from '../../components/SearchBox';
import ListItem from '../../components/DashboardListItem';
import EmptyListItem from '../../components/DashboardListItem/EmptyListItem';
import FadeWrap from '../../components/FadeWrap';
import ListNav from '../../components/ListNav';
import DashboardNodeView from '../../containers/DashboardNodeView';
import NumberBoard from '../../components/NumberBoard'
import Button from '@material-ui/core/Button';
import { getDCList, getNodeList, getDCCount } from '../../actions/DC';
import { getWorkerDetail } from '../../actions/Node';
import { setRegion } from '../../utils/handleRequest';
import { getAllocationList } from '../../actions/Allocation';
import { getPrometheus } from '../../actions/Prometheus'
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
            mapCenter: {},
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
        this.position = {
            longitude: 120,
            latitude: 30
        }
        this.position2 = {
            longitude: 121,
            latitude: 30
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getDCList(dispatch);
        getDCCount(dispatch);

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
        if(this.state.isSearched){
            this.setState({
                isDCListHidden: true,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden:false,
                nodeIndex:-1
            });
        }else{
            this.setState({
                isDCListHidden: false,
                isNodeListHidden: true,
                isNodeDetailHidden: true,
                isSearchListHidden:true,
                nodeIndex:-1
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
            isSearchListHidden:true,
            isNodeDetailHidden:true,
            currentRegion: item.region,
            currentDatacenter: item.Datacenter,
            DCInfo: item.DCInfo,
            nodeIndex: -1,
            mapCenter: {
                longitude: item.DCInfo.longitude,
                latitude: item.DCInfo.latitude
            }
        });
    }
    showDetail = (item, index) => {
        let isHidden = false;
        setRegion(item.region);
        const { dispatch } = this.props;
        getWorkerDetail(dispatch, item.ID);
        getAllocationList(dispatch);
        // getPrometheus(dispatch, item.ID, item.Datacenter);        记得取消注释
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
                nodeIndex:-1
            })
        }
    }
    render() {
        const { classes, DClist, nodeWorkerDetail, regionCount } = this.props;
        const { list, nodelist, DCCount, allRegionNodelist } = DClist;
        const { detail } = nodeWorkerDetail;
        const plugins = ['Scale', 'ControlBar'];
        const currentRegion = this.state.currentRegion;
        const currentDatacenter = this.state.currentDatacenter;
        const DCInfo = this.state.DCInfo;
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
        let DCInfoForEveryDC = {};
        list.forEach((DC) => {
            let isMatched = false;
            if (!DCInfoForEveryDC[DC.region]) {
                DCInfoForEveryDC[DC.region] = {};
            }
            DCInfoForEveryDC[DC.region][DC.Datacenter] = DC.DCInfo;
            const searchInfo = { DC: DC.DCInfo.DC, region: DC.DCInfo.region, address: DC.DCInfo.address };
            for (let key in searchInfo) {
                if (searchInfo[key].indexOf(this.state.inputValue) > -1) {
                    isMatched = true;
                }
            }
            if (isMatched === true) {
                searchList.push({ DC: DC, type: 'dc' });
            }
        })
        allRegionNodelist.forEach((node) => {
            let isMatched = false;
            const DCInfo = DCInfoForEveryDC[node.region][node.Datacenter];
            const searchInfo = { name: node.name, DC: DCInfo.DC, region: DCInfo.region, address: DCInfo.address };
            for (let key in searchInfo) {
                if (searchInfo[key].indexOf(this.state.inputValue) > -1) {
                    isMatched = true;
                }
            }
            if (isMatched === true) {
                searchList.push({ type: 'node', node, DCInfo });
            }
        })
        console.log(searchList)

        // {
        //     region1:{
        //         datacenter1:{
        //             DC:
        //             region:
        //             address:                   
        //         }
        //         datacenter4:null
        //     }
        //     region2:null,
        //     region3:{
        //         datacenter3:null
        //     }
        // }


        let MyMap = null;
        if (this.state.isNodeListHidden) {
            MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={{ longitude: 121, latitude: 31 }}>
                {
                    list.map((item, index) => {
                        return <Marker key={item.Datacenter} position={{ longitude: item.DCInfo.longitude, latitude: item.DCInfo.latitude }} />
                    })
                }
            </Map>;
        } else {
            MyMap = <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={this.state.mapCenter}>
                <Marker position={this.state.mapCenter} />
            </Map>;
        }


        return (

            <div className={classes.dashboard}>
                {/* <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={{ longitude: 121, latitude: 31 }}>
                    {
                        this.state.isNodeListHidden ? list.map((item, index) => {
                            return <Marker key={item.Datacenter} position={{ longitude: item.DCInfo.longitude, latitude: item.DCInfo.latitude }} />
                        }) : (DCInfo.longitude ?
                            <Marker position={{ longitude: DCInfo.longitude, latitude: DCInfo.latitude }} /> : ''
                            )
                    }
                </Map> */}
                {MyMap}


                <div className={classes.dashboardInnerWrap}>
                    <SearchBox className={classes.searchWrap} onSearch={this.handleSearch} />
                    <div className={classes.listWrap}>
                        <FadeWrap className={classes.listBkg} isHidden={this.state.isDCListHidden} from="left" to="left">
                            {list.map((item, index) => {
                                return <ListItem type='dc' itemData={item.DCInfo} region={item.region} Datacenter={item.Datacenter} index={index} onClick={this.showList} key={index} />
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
                    {/* 搜索列表 */}
                    <div className={classes.listWrap}>
                        <FadeWrap className={classes.listBkg} isHidden={this.state.isSearchListHidden} from="bottom" to="top">
                            
                                 <EmptyListItem></EmptyListItem>
                            
                            {searchList.map((item,index)=>{
                                if(item.type==='dc'){
                                    return <ListItem type='dc' itemData={item.DC.DCInfo} region={item.DC.region} Datacenter={item.DC.Datacenter} index={index} onClick={this.showList} key={index} />
                                }else if(item.type==='node'){
                                    return <ListItem type='search_node' itemData={{ ...item.DCInfo, name: item.node.name, ID: item.node.ID }} region={item.node.region} Datacenter={item.node.Datacenter} index={index} onClick={this.showDetail} key={index} selected={index==this.state.nodeIndex} />
                                }

                            })}
                            {/* <ListItem type='dc' itemData={{ address: '浙江省宁波市浙江大学软件学院', DC: '宁波', region: '华西' }} region={'huaxi'} Datacenter={'ningbo'} /> */}

                        </FadeWrap>
                    </div>
                    {/* 搜索列表 */}
                    <div className={classes.detailWrap}>
                        <FadeWrap className={classes.darkBkg} isHidden={this.state.isNodeDetailHidden} from='left' to='left'>
                            <DashboardNodeView region={currentRegion} Datacenter={currentDatacenter} detail={detail} />
                        </FadeWrap>
                    </div>
                    <div className={classes.numberBoard}>
                        <NumberBoard className={classes.marginBottom10} title='地域' number={regionCount} />
                        <NumberBoard className={classes.marginBottom10} title='DC' number={DCCount} />
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
