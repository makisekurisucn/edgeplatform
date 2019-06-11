import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';



const styles = theme => ({
    root: {
        position: 'relative',
        height: 73,
        boxSizing: 'border-box',
        border:'1px solid rgb(105,105,105)',
        margin: '5px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(22,22,22,0.55)'
        },
        color:'#EEF9FF',
        fontSize:12
    },
    topContent:{
        display:'flex',
        justifyContent:'space-between'
    },
    title:{
        fontSize:14,
        boxSizing:'border-box',
        textAlign:'center',
        width:80,
        height:20,
        backgroundColor:'rgb(105,105,105)'
        
    },
    date:{
        fontWeight:300,
        color:'rgb(181,181,181)',
        margin:'3px 15px'
    },
    middleContent:{
        height:26
    },
    bottomContent:{
        height:22,
        display:'flex',
        justifyContent:'space-between'
    },
    itemCount:{
        fontSize:16,
        fontWeight:500,
        marginLeft:4,
        marginRight:3
    },
    status:{
        color:'rgb(75, 175, 126)'
    },
    location:{
        fontWeight:500,
        lineHeight:'22px',
        marginRight:5
    },
    // innerWrap: {
    //     height: '100%',
    //     borderBottom: '1px solid rgba(255,255,255,0.46)',
    //     boxSizing: 'border-box',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    // },
    // selected: {
    //     '&:before': {
    //         content: '""',
    //         position: 'absolute',
    //         height: '80%',
    //         width: 6,
    //         top: 0,
    //         bottom: 0,
    //         left: 0,
    //         margin: 'auto',
    //         backgroundColor: '#4B8BAF',
    //         cursor: 'default'
    //     }
    // },
    // index: {
    //     fontSize: 38,
    //     color: '#EEF9FF',
    //     width: 60,
    //     textAlign: 'center',
    //     textShadow: '0px 0px 20px #009AF0'

    // },
    arrow: {
        // color: '#979797',
        fontSize: 22,
        float:'right'
    },
    // main: {
    //     height: '100%',
    //     width: '80%'
    // },
    // mainUpper: {
    //     height: '65%',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    // },
    // mainTitle: {
    //     color: '#EEF9FF',
    //     fontSize: 22,
    //     '&:before': {
    //         content: '""',
    //         backgroundColor: "#4BAF7E",
    //         width: 12,
    //         height: 12,
    //         display: 'inline-block',
    //         borderRadius: '50%',
    //         marginRight: 4
    //     }
    // },
    // subTitle: {
    //     color: '#EEF9FF',
    //     fontSize: 16
    // },
    // mainLower: {
    //     fontSize: 14,
    //     color: '#EEF9FF',
    //     width: '100%',
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap'
    // }

});
class AllocationListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: null
        };
    }
    //   componentWillMount() {
    //     const { dispatch } = this.props;
    //     getRegionList(dispatch);
    //   }
    componentWillReceiveProps(nextProp) {
        if (nextProp.regionList.length && !this.state.currentRegion) {
            this.setState({
                currentRegion: nextProp.regionList[0]
            });
        }
    }
    clickHandler = (itemData, index) => (event) => {
        if (this.props.onClick) {
            this.props.onClick(itemData, index)
        }
    }
    selectRegion = region => {
        this.setState({
            currentRegion: region
        });
    }
    render() {
        const { classes,  className, index, selected,region, Datacenter } = this.props;
        let classNameWrap=classes.root;
 
        
        if (className) {
            classNameWrap = classes.root + " " + className;
        }
        
        if (selected) {
            classNameWrap += ' ' + classes.selected;
        }

        return (
            <div className={classNameWrap} onClick={this.clickHandler()}>
                <div className={classes.topContent}>
                    <div className={classes.title}>组名称-1</div>
                    <div className={classes.date}>2019/01/23 12:32:33</div>
                </div>
                <div className={classes.middleContent}>
                    <ArrowForwardIos className={classes.arrow} />
                </div>
                <div className={classes.bottomContent}>
                    <div>
                        <span className={classes.itemCount}>1</span>
                        <span className={classes.status}>运行中</span>
                    </div>
                    {/* <div className={classes.status}>1运行中</div> */}
                    <div className={classes.location}>杭州-华东</div>
                </div>


                {/* <div className={classes.innerWrap}>
                    <p className={classes.index}>{index + 1}</p>
                    <div className={classes.main}>
                        <div className={classes.mainUpper}>
                            <p className={classes.mainTitle}>{itemData.DC}</p>
                            <p className={classes.subTitle}>{itemData.region}</p>
                        </div>
                        <div className={classes.mainLower} title={itemData.address}>{itemData.address}</div>
                    </div>
                    <ArrowForwardIos className={classes.arrow} />
                </div> */}
            </div>
        );
    }
}

AllocationListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(AllocationListItem));