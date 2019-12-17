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
        display: 'table',
        backgroundColor: 'rgba(0,0,0,0.44)',
        color: '#EEF9FF',
    },
    date: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '134px',
        fontSize: 12,
        // color: '#EEF9FF',
        fontWeight: 400,
        // marginBottom: 6,
        backgroundColor: 'rgba(255, 255, 255,0.22)',
        // padding:'16px 13px',
        boxSizing: 'border-box'
    },
    event: {
        display: 'table-cell',
        width: '340px',
        lineHeight: '16px',
        fontSize: 12,
        // color: '#EEF9FF',
        fontWeight: 400,
        padding: '7px 1px 7px 16px',
        boxSizing: 'border-box',
        wordBreak: 'break-word'
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
                <div className={classes.date}>{date}</div>
                <div className={classes.event}>{event}</div>
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