import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { Map, Marker } from 'react-amap';
import Search from '@material-ui/icons/Search';
import SearchBox from '../../components/SearchBox';
import ListItem from '../../components/DashboardListItem';
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
            DCInfo: {},
            currentRegion: '',
            currentDatacenter: '',
            nodeIndex: -1
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
        this.setState({
            isDCListHidden: false,
            isNodeListHidden: true,
            isNodeDetailHidden: true
        });
    }
    showList = (item, index) => {
        const { dispatch } = this.props;
        getNodeList(dispatch, item.region, item.Datacenter);
        console.log(this.props)
        console.log(this);

        this.setState({
            isDCListHidden: true,
            isNodeListHidden: false,
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
        getPrometheus(dispatch, item.ID, item.Datacenter);
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
    render() {
        const { classes, DClist, nodeWorkerDetail, regionCount } = this.props;
        const { list, nodelist, DCCount } = DClist;
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

        return (

            <div className={classes.dashboard}>
                <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} >
                    {
                        this.state.isNodeListHidden ? list.map((item, index) => {
                            return <Marker key={item.Datacenter} position={{ longitude: item.DCInfo.longitude, latitude: item.DCInfo.latitude }} />
                        }) : (DCInfo.longitude ?
                            <Marker position={{ longitude: DCInfo.longitude, latitude: DCInfo.latitude }} /> : ''
                            )
                    }
                    {/* <Marker position={this.position} />
                    <Marker position={this.position2} /> */}
                </Map>



                <div className={classes.dashboardInnerWrap}>
                    <SearchBox className={classes.searchWrap} />
                    <div className={classes.listWrap}>
                        <FadeWrap className={classes.listBkg} isHidden={this.state.isDCListHidden} from="left" to="left">
                            {list.map((item, index) => {
                                return <ListItem type='dc' itemData={item.DCInfo} region={item.region} Datacenter={item.Datacenter} index={index} onClick={this.showList} key={item.Datacenter} />
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
