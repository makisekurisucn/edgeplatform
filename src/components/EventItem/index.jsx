import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        display:'flex',
        backgroundColor:'rgba(0,0,0,0.44)'
    },
    date: {
        fontSize: 12,
        // color: '#EEF9FF',
        fontWeight: 400,
        // marginBottom: 6,
        backgroundColor:'rgba(255, 255, 255,0.22)',
        padding:'16px 13px'
    },
    event: {
        fontSize: 12,
        // color: '#EEF9FF',
        fontWeight: 400,
        padding:'16px 0px 16px 16px'
    }
});
class EventItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { classes, className, date, event } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        return (
            <div className={classNameWrap}>
                <div className={classes.date}>2019/08/02 12:32:32</div>
                <div className={classes.event}>Task's sibling "jobmanageri1" failed</div>
            </div>
        );
    }
}
EventItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(EventItem));