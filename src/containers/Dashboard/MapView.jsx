import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { Map, Marker } from 'react-amap';
import Search from '@material-ui/icons/Search';
import SearchBox from '../../components/SearchBox';
import ListItem from '../../components/DashboardListItem';
import FadeWrap from '../../components/FadeWrap';
import ListNav from '../../components/ListNav';
import DashboardNodeView from '../../containers/DashboardNodeView';

import Button from '@material-ui/core/Button';



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
        backgroundColor: '#161616cc',
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
        backgroundColor: '#161616cc',
    },
    darkBkg: {
        backgroundColor: '#151515e6'
    },
    detailWrap: {
        position: 'absolute',
        width: 512,
        top: 24,
        left: 420
    }

};
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isDCListHidden: false,
            isNodeListHidden: true
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
            isNodeListHidden: true
        });
    }
    showList = () => {
        console.log(this);
        this.setState({
            isDCListHidden: true,
            isNodeListHidden: false
        });
    }
    render() {
        const { classes } = this.props;
        const plugins = ['Scale', 'ControlBar'];
        return (

            <div className={classes.dashboard}>
                <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} >
                    <Marker position={this.position} />
                    <Marker position={this.position2} />
                </Map>



                <div className={classes.dashboardInnerWrap}>
                    <SearchBox className={classes.searchWrap} />
                    <div className={classes.listWrap} onClick={this.showList}>
                        <FadeWrap className={classes.listBkg} isHidden={this.state.isDCListHidden} from="left" to="left">
                            <ListItem />
                            <ListItem />
                        </FadeWrap>
                    </div>
                    <div className={classes.listWrap}>
                        <FadeWrap isHidden={this.state.isNodeListHidden} from="right" to="right">
                            <ListNav title="测试" onBack={this.goBack} />
                            <div className={classes.listBkg}>
                                <ListItem />
                                <ListItem />
                            </div>
                        </FadeWrap>
                    </div>
                    <div className={classes.detailWrap}>
                        <FadeWrap className={classes.darkBkg}>
                            <DashboardNodeView />
                        </FadeWrap>
                    </div>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(Dashboard);
