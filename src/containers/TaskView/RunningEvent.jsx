import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import EventItem from '../../components/EventItem';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { formatTime } from '../../utils/formatTime';

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
        color: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    arrow: {
        fontSize: '19px',
        // marginBottom: '-3px',
        color: 'rgb(0, 0, 0)',
        paddingLeft: '56px'
    },
    marginBottom: {
        marginBottom: '-4px'
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
        let taskEvents = [];
        if (data.alloc.TaskStates) {
            let tmpArr = data.alloc.TaskStates[data.taskName].Events || [];
            tmpArr.forEach(event => {
                taskEvents.push(event);
            })

            // taskEvents = data.alloc.TaskStates[data.taskName].Events.reverse;
        }
        taskEvents = taskEvents.reverse();

        return (
            <div className={classNameWrap}>
                {
                    taskEvents.map((event, index) => {
                        if (index === (taskEvents.length - 1)) {
                            return <EventItem className={classes.eventItem} date={formatTime(event.Time)} event={event.DisplayMessage} key={index} />
                        } else {
                            return <div className={classes.marginBottom} key={index}>
                                <EventItem className={classes.eventItem} date={formatTime(event.Time)} event={event.DisplayMessage} />
                                <KeyboardArrowUp className={classes.arrow}></KeyboardArrowUp>
                            </div>

                        }
                    })
                }
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