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
        border: '1px solid rgb(105,105,105)',
        margin: '5px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.12)'
        },
        color: '#EEF9FF',
        fontSize: 12,
        backgroundColor: 'rgba(216,216,216,0.11)'
    },
    topContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14,
        boxSizing: 'border-box',
        textAlign: 'center',
        width: 80,
        height: 20,
        backgroundColor: 'rgb(105,105,105)'

    },
    date: {
        fontWeight: 300,
        color: 'rgb(181,181,181)',
        margin: '3px 15px'
    },
    middleContent: {
        height: 26
    },
    bottomContent: {
        height: 22,
        display: 'flex',
        justifyContent: 'space-between'
    },
    itemCount: {
        fontSize: 16,
        fontWeight: 500,
        marginLeft: 4,
        marginRight: 3
    },
    status: {
        color: 'rgb(75, 175, 126)'
    },
    location: {
        fontWeight: 500,
        lineHeight: '22px',
        marginRight: 5
    },
    // innerWrap: {
    //     height: '100%',
    //     borderBottom: '1px solid rgba(255,255,255,0.46)',
    //     boxSizing: 'border-box',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    // },
    selectedBkg: {
        backgroundColor: 'rgba(0,0,0,0.12)'
    },
    // index: {
    //     fontSize: 38,
    //     color: '#EEF9FF',
    //     width: 60,
    //     textAlign: 'center',
    //     textShadow: '0px 0px 20px #009AF0'

    // },
    arrow: {
        // color: '#979797',
        fontSize: 18,
        float: 'right'
    },
    selectedArrow: {
        color: 'rgb(75,139,175)'
    },
    selectedTitle: {
        backgroundColor: 'rgba(73,117,142,0.83)'
    }
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
    // componentWillReceiveProps(nextProp) {
    //     if (nextProp.regionList.length && !this.state.currentRegion) {
    //         this.setState({
    //             currentRegion: nextProp.regionList[0]
    //         });
    //     }
    // }
    clickHandler = (nodeID, index) => (event) => {
        if (this.props.onClick) {
            this.props.onClick(nodeID, index)
        }
    }
    // selectRegion = region => {
    //     this.setState({
    //         currentRegion: region
    //     });
    // }
    render() {
        const { classes, className, index, selected, itemData={}, region, Datacenter } = this.props;
        let classNameWrap = classes.root;
        let titleWrap = classes.title;
        let arrowWrap = classes.arrow;


        if (className) {
            classNameWrap = classes.root + ' ' + className;
        }

        if (selected) {
            classNameWrap += ' ' + classes.selectedBkg;
            titleWrap += ' ' + classes.selectedTitle;
            arrowWrap += ' ' + classes.selectedArrow;
        }
        console.log(classNameWrap)

        return (
            <div className={classNameWrap} onClick={this.clickHandler(itemData.NodeID, index)}>
                <div className={classes.topContent}>
                    <div className={titleWrap}>组名称-1</div>
                    <div className={classes.date}>2019/01/23 12:32:33</div>
                </div>
                <div className={classes.middleContent}>
                    <ArrowForwardIos className={arrowWrap} />
                </div>
                <div className={classes.bottomContent}>
                    <div>
                        <span className={classes.itemCount}>1</span>
                        <span className={classes.status}>运行中</span>
                    </div>
                    {/* <div className={classes.status}>1运行中</div> */}
                    <div className={classes.location}>杭州-华东</div>
                </div>

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