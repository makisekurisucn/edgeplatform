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
        padding: '11px'
    },
    log: {
        // marginBottom: 30,
        color: '#EEF9FF',
        border:'1px solid rgba(113,113,113,1)',
        backgroundColor:'rgba(0,0,0,0.3)',
        fontSize:12,
        fontWeight:300,
        boxSizing:'border-box',
        padding:'11px 14px'
    },

});
class TaskLog extends Component {
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
                <div className={classes.log}>
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.nomad.broker.total_blocked': 0.000 
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.nomad.plan.queue_depth': 0.000 [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.malloc_count': 7568.000 
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.total_gc_runs': 8.000 [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.nomad.broker.total_ready': 0.000 
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.num_goroutines': 56.000 [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.sys_bytes': 3999992.000 
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.heap_objects': 4135.000 [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.nomad.heartbeat.active': 1.000 
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.nomad.broker.total_unacked': 0.000 [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.nomad.broker.total_waiting': 0.000 
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.alloc_bytes': 634056.000 [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.free_count': 3433.000 
                    [2015-09-17 16:59:40 -0700 PDT][G] 'nomad.runtime.total_gc_pause_ns': 6572135.000 [2015-09-17 16:59:40 -0700 PDT][C] 'nomad.memberlist.msg.alive': Count: 1 Sum: 1.000 
                    [2015-09-17 16:59:40 -0700 PDT][C] 'nomad.serf.m
                </div>
            </div>
        );
    }
}
TaskLog.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(TaskLog));