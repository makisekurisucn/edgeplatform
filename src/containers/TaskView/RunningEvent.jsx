import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import EventItem from '../../components/EventItem';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '12px'
    },
    eventItem: {
        // marginBottom: 30,
        color: '#EEF9FF'
    },
    arrow:{
        color:'#EEF9FF',
        paddingLeft:'56px'
    }
});
class RunningEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes, className, data } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                <EventItem date="类型" className={classes.eventItem} event="工作节点" />
                {/* <EventItem date="主机名" className={classes.eventItem} event={'aaa'} /> */}
                <KeyboardArrowUp className={classes.arrow}></KeyboardArrowUp>
                <EventItem date="类型" className={classes.eventItem} event="工作节点" />
                <KeyboardArrowUp className={classes.arrow}></KeyboardArrowUp>
                <EventItem date="类型" className={classes.eventItem} event="工作节点" />
                <KeyboardArrowUp className={classes.arrow}></KeyboardArrowUp>
                <EventItem date="类型" className={classes.eventItem} event="工作节点" />
            </div>
        );
    }
}
RunningEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(RunningEvent));