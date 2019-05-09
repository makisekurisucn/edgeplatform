import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const styles = theme => ({
    root: {
        position: 'relative',
        height: 108,
        width: '100%',
        boxSizing: 'border-box',
        padding: '0px 9px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(22,22,22,0.55)'
        }
    },
    innerWrap: {
        height: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.46)',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        '&:before': {
            content: '""',
            position: 'absolute',
            height: '81%',
            width: 6,
            top: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
            backgroundColor: '#4B8BAF',
            cursor: 'default'
        }
    },
    index: {
        fontSize: 38,
        color: '#EEF9FF',
        width: 60,
        textAlign: 'center',
        textShadow: '0px 0px 20px #009AF0'

    },
    arrow: {
        color: '#979797',
        fontSize: 20,

    },
    main: {
        height: '100%',
        width: '80%'
    },
    mainUpper: {
        height: '65%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainTitle: {
        color: '#EEF9FF',
        fontSize: 22,
        '&:before': {
            content: '""',
            backgroundColor: "#4BAF7E",
            width: 12,
            height: 12,
            display: 'inline-block',
            borderRadius: '50%',
            marginRight: 4
        }
    },
    subTitle: {
        color: '#EEF9FF',
        fontSize: 16
    },
    mainLower: {
        fontSize: 14,
        color: '#EEF9FF',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }

});
class ListItem extends Component {
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
    selectRegion = region => {
        this.setState({
            currentRegion: region
        });
    }
    render() {
        const { classes, barName, regionList, className } = this.props;
        let classNameWrap;
        if (className) {
            classNameWrap = className + " " + classes.root;
        }
        else {
            classNameWrap = classes.root;
        }
        return (
            <div className={classNameWrap}>
                <div className={classes.innerWrap + ' ' + classes.selected}>
                    <p className={classes.index}>2</p>
                    <div className={classes.main}>
                        <div className={classes.mainUpper}>
                            <p className={classes.mainTitle}>节点1</p>
                            <p className={classes.subTitle}>华东-杭州</p>
                        </div>
                        <div className={classes.mainLower} title="浙江省杭州市西湖区西斗门路3号天堂">浙江省杭州市西湖区西斗门路3号天堂</div>
                    </div>
                    <ArrowForwardIos className={classes.arrow} />
                </div>
            </div>
        );
    }
}

ListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(ListItem));