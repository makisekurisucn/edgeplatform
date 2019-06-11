import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { formatTime } from '../../../utils/formatTime';
import { Map, Marker,Circle } from 'react-amap';
import FixedHeight from '../../../components/FixedHeight';
import SearchBox from '../../../components/SearchBox';
import ListItem from '../../../components/AllocationListItem';
import EmptyListItem from '../../../components/DashboardListItem/EmptyListItem';
import FadeWrap from '../../../components/FadeWrap';

const styles = theme => ({
    root: {
        position: 'relative',
        // height:'300px',
        // height:'100px',
        // width:'100px',
        // backgroundColor:'gray'
        // top: '0',
        // left: 0,
        // opacity: 1,
        // padding: '30px 71px',
        // color: 'rgb(97,139,162)',
        // display: 'flex'
    },
    searchWrap:{
        position: 'absolute',
        top: 10,
        left: 7,
        height:'36px',
        width:'256px'
    },
    listWrap: {
        position: 'absolute',
        width: 256,
        left: 7,
        top: 54,
        backgroundColor: 'rgba(22,22,22,0.8)',

    },
    listBkg: {
        backgroundColor: 'rgba(22,22,22,0.8)',
    }
    
    
});

const kvMap = {
    pending: '启动中',
    service: '服务',
    running: '运行中'
}

const mapCircleStyle={
    yellowCircle:{
        fillColor:'#AF954B',
        fillOpacity:0.5,
        strokeWeight:0,
        strokeColor:'#AF954B',
        zIndex:10
    },
    greenCircle:{
        fillColor:'#4BAF7E',
        fillOpacity:0.5,
        strokeWeight:0,
        strokeColor:'#4BAF7E',
        zIndex:10
    },
    grayCircle:{
        fillColor:'#ABABAB',
        fillOpacity:0.5,
        strokeWeight:0,
        strokeColor:'#ABABAB',
        zIndex:10
    }

}

class AllocationDistribution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canUpdata:true
        };
        this.mapDiv={};
    }



    componentDidUpdate(){
        // console.log('did update')
        // console.log(this.props.isHidden)
        // console.log('canupdate: '+this.state.canUpdata)
        // console.log('height: '+this.rootDiv.clientHeight)
        if(this.props.isHidden===false){
            if(this.mapDiv.clientHeight>0&&this.state.canUpdata===true){
                this.setState({
                    canUpdata:false
                })
            }
        }
        else{
            if(this.state.canUpdata===false){
                this.setState({
                    canUpdata:true
                })
            }
        }
    }

    render() {
        const { classes, className, data } = this.props;
        const plugins = ['Scale', 'ControlBar'];
        // console.log('render')
        // console.log(this.props.isHidden)
        // console.log('canupdate: '+this.state.canUpdata)
        // console.log('height: '+this.rootDiv.clientHeight)
        

        return (
            <div className={classes.root}>
                <FixedHeight reducedHeight={163} >
                    <div style={{height:'100%',width:'100%'}} ref={(ele)=>{this.mapDiv=ele}}>
                        {
                            this.mapDiv.clientHeight>0?
                                <Map viewMode="3D" mapStyle="fresh" useAMapUI="true" plugins={plugins} center={{longitude:120,latitude:30}} >
                                </Map>
                                :null
                        }
                        <SearchBox className={classes.searchWrap} onSearch={this.handleSearch} />
                        <div className={classes.listWrap}>
                            {/* <ListItem type='dc' itemData={item.DCInfo} region={item.region} Datacenter={item.Datacenter} index={index} onClick={this.showList} key={index} /> */}
                            {/* <EmptyListItem></EmptyListItem> */}
                            <ListItem></ListItem>
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
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(AllocationDistribution));