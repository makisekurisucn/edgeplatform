import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import DesktopMac from '@material-ui/icons/DesktopMac';


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
        const { classes, barName, regionList, className, itemData = {}, index, selected, type, region, Datacenter } = this.props;
        let classNameWrap;
        let item = {};
        if (type === 'dc') {
            item = { region, Datacenter,DCInfo:itemData };
        }
        else {
            item = { region, ID: itemData.ID };
        }
        if (className) {
            classNameWrap = className + " " + classes.root;
        }
        else {
            classNameWrap = classes.root;
        }
        if (selected) {
            classNameWrap += ' ' + classes.selected;
        }
        return (
            <div className={classNameWrap} onClick={this.clickHandler(item, index)}>
                <div className={classes.innerWrap}>
                    {
                        type === 'dc' && (<DesktopMac className={classes.index} />)
                    }
                    {
                        type === 'node' && (<p className={classes.index}>{index + 1}</p>)
                    }
                    <div className={classes.main}>
                        {
                            type === 'dc' && (
                                <div className={classes.mainUpper}>
                                    <p className={classes.mainTitle}>{itemData.DC}</p>
                                    <p className={classes.subTitle}>{itemData.region}</p>
                                </div>
                            )
                        }
                        {
                            type === 'node' && (
                                <div className={classes.mainUpper}>
                                    <p className={classes.mainTitle}>{itemData.name}</p>
                                    <p className={classes.subTitle}>{itemData.region} - {itemData.DC}</p>
                                </div>
                            )
                        }
                        <div className={classes.mainLower} title={itemData.address}>{itemData.address}</div>
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