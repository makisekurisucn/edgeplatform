import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
//import SelectNoResult from '@material-ui/icons/PriorityHigh';
// import SelectNoResult from '@material-ui/icons/Error';
import SelectNoResult from '@material-ui/icons/ErrorOutline';

const styles = theme => ({
    root: {
        //position: 'relative',
        height: 108,
        width: '100%',
        boxSizing: 'border-box',
        padding: '0px 9px',
        //cursor: 'pointer',
        display:'flex',
        '&:hover': {
            backgroundColor: 'rgba(22,22,22,0.55)'
        }
    },
    innerWrap: {
        height: '100%',
        // borderBottom: '1px solid rgba(255,255,255,0.46)',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainTitle: {
        color: '#EEF9FF',
        fontSize: 22,
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        margin: '0px 12px',
        '&:before': {
            backgroundColor: "#4BAF7E",
            width: 12,
            height: 12,
            display: 'inline-block',
            borderRadius: '50%',
            marginRight: 4
        }
    },
    incons:{
        alignItems: 'center',
        color: '#EEF9FF',
        height: '100%',
        //width: 40,
        fontSize:'30px',
    }
});
class EmptyListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes, className } = this.props;
        let classNameWrap;
        if (className) {
            classNameWrap = className + " " + classes.root;
        }
        else {
            classNameWrap = classes.root;
        }
        return (
            <div className={classNameWrap} >
                <SelectNoResult className={classes.incons}/>
                <p className={classes.mainTitle}>{'没有匹配的结果'}</p> 
            </div>
        );
    }
}

EmptyListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(EmptyListItem));