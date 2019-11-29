import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Notification from '../Notification';
import { getRegionList } from '../../actions/Region'
import TopButton from '../NavButton'
import Select from '../Select'
import { setRegion } from '../../utils/handleRequest'

const styles = theme => ({
    root: {
        display: 'flex',
        height: 60,
        backgroundColor: "rgba(33,54,66,0.82)",
        lineHeight: "60px",
        justifyContent: "space-between"
    },
    logoSide: {
        display: 'flex',
    },
    menuList: {
        height: 60,
        padding: "0px 10px",
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: "relative",
    },
    title: {
        height: 60,
        width: 260,
        textAlign: 'center',
        lineHeight: '60px',
        color: '#EEF9FF',
        backgroundColor: '#213642'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    formControl: {
        margin: theme.spacing.unit,
        width: 240,
        color: "#fff"
    },
    topSelect: {
        color: "#fff"
    },
    actionArea: {
        // padding: "0px 10px"
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonRoot: {
        height: 60,
        width: 180,
        // boxSizing: 'border-box',
        lineHeight: '60px',
        textAlign: 'center',
        padding: '0px 4px',
        fontSize: 18

    },
    selected: {
        height: 4,
        backgroundColor: '#4B8BAF',
        marginTop: -60
    }
});
// let regionListDemo = [
//   {regionName: "华东-杭州",regionId: 'ce-hangzhou'},
//   {regionName: "华东-上海",regionId: 'ce-shanghai'}
// ];

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: null
        };
    }
    UNSAFE_componentWillMount() {
        const { dispatch } = this.props;
        getRegionList(dispatch);
    }
    UNSAFE_componentWillReceiveProps(nextProp) {
        if (nextProp.regionList.length && !this.state.currentRegion) {
            this.setState({
                currentRegion: nextProp.regionList[0]
            });
            setRegion(nextProp.regionList[0]);
        }
    }
    selectRegion = region => {
        this.setState({
            currentRegion: region
        });
        setRegion(region);
    }
    render() {
        const { classes, barName, regionList, className } = this.props;
        console.log(regionList)
        return (
            <div className={className + " " + classes.root}>
                {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
                <div className={classes.logoSide}>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        {barName}
                    </Typography>

                    <div className={classes.menuList}>
                        {/* <TopButton content="看板" link="/dashboard" className={{ buttonRoot: classes.buttonRoot, selected: classes.selected }}></TopButton> */}
                        <TopButton content="控制台" link="/console" className={{ buttonRoot: classes.buttonRoot, selected: classes.selected }}></TopButton>
                    </div>
                </div>
                <div className={classes.actionArea}>
                    <Select title="地域"
                        list={regionList}
                        // valueKey="regionId" 
                        // displayKey="regionName" 
                        value={this.state.currentRegion}
                        onSelected={this.selectRegion} ></Select>
                    <Notification />
                </div>
            </div>
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(TopBar));