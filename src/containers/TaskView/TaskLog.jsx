import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import EventItem from '../../components/EventItem';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { getTaskLogs } from '../../actions/Allocation';
import FixedHeight from '../../components/FixedHeight';
import Select from '../../components/Select/HorizontalButton';

const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '11px'
    },
    selectList: {
        height: 24,
        width: '100%'
    },
    log: {
        // marginBottom: 30,
        color: '#EEF9FF',
        border: '1px solid rgba(113,113,113,1)',
        backgroundColor: 'rgba(0,0,0,0.3)',
        fontSize: 12,
        fontWeight: 300,
        boxSizing: 'border-box',
        padding: '11px 5px 11px 14px',
        whiteSpace: 'pre-line'
    },
    fixedHeight: {
        overflow: 'hidden'
    }

});
const selectList = [
    {
        text: 'stdout'
    },
    {
        text: 'stderr'
    }
]
class TaskLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            currentOffset: 100
        };
        this.logText = null;
    }

    componentDidMount() {
        if (this.props.data.alloc.id && this.props.data.taskName) {
            const params = {
                task: this.props.data.taskName,
                follow: false,
                type: this.state.selectedIndex === 0 ? 'stdout' : 'stderr',
                offset: 0,
                origin: 'end',
                plain: true
            };
            const { dispatch } = this.props;
            getTaskLogs(dispatch, this.props.data.alloc.id, params);
        }
    }

    componentDidUpdate() {
        // console.log('%%%%%')
        // console.log(this.props.data.alloc);
        const { dispatch } = this.props;
        // getTaskLogs(dispatch, '96efbdaa-795d-1b45-6be6-14f3d84e67be', { task: 'jobmanager' });
        if (this.props.data.alloc.ID && this.props.data.taskName) {
            const params = {
                task: this.props.data.taskName,
                follow: false,
                type: this.state.selectedIndex === 0 ? 'stdout' : 'stderr',
                offset: 0,
                origin: 'end',
                plain: true
            };
            console.log('get taskLogs')
            const { dispatch } = this.props;
            getTaskLogs(dispatch, this.props.data.alloc.ID, params);
        }
    }

    componentWillReceiveProps(next) {
        //需要修改，这里传进来的props为stdout和stderr，因此重复发一个相同请求后，判断前后props相同，不会更新，不会无限循环
        // console.log('prev')
        // console.log(this.props.taskLogs)
        // console.log('next')
        // console.log(next.taskLogs)
        // console.log(this.props.taskLogs.stdout === next.taskLogs.stdout)
        // console.log(this.props.taskLogs === next.taskLogs)

    }

    selectData = (index) => {
        //dispatch
        if (this.state.selectedIndex !== index) {
            this.setState({
                selectedIndex: index,
                currentOffset: 100
            });
        }
    }

    logHeight = () => {
        console.log('clientHeight= ' + this.logText.clientHeight)
        console.log('scrollHeight= ' + this.logText.scrollHeight)
        console.log('scrollTop= ' + this.logText.scrollTop)

    }

    render() {
        const { classes, className, data, taskLogs, stdout, stderr } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        // console.log(taskLogs)
        const selectedItem = classes.selectItem + ' ' + classes.selected;

        return (
            <div className={classNameWrap}>
                <Select className={classes.selectList} selectList={selectList} selectedIndex={this.state.selectedIndex} onClick={this.selectData}></Select>
                {/* <FixedHeight reducedHeight={399}>
                    <div className={classes.log}>
                        {this.state.selectedIndex === 0 ? stdout : stderr}
                    </div>
                </FixedHeight > */}
                <div className={classes.log}>
                    {/* {this.state.selectedIndex === 0 ? taskLogs.stdout : taskLogs.stderr} */}
                    <FixedHeight reducedHeight={423}>
                        {/* <div onClick={this.logHeight} ref={ele => { this.logText = ele }}>
                            {this.state.selectedIndex === 0 ? stdout : stderr}
                        </div> */}
                        {this.state.selectedIndex === 0 ? stdout : stderr}
                    </FixedHeight>

                </div>
            </div>
        );
    }
}
TaskLog.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    console.log(state)
    // return { taskLogs: state.Allocationlist.taskLogs }
    return {
        stdout: state.Allocationlist.taskLogs.stdout,
        stderr: state.Allocationlist.taskLogs.stderr
    }
    // return {
    //     taskLogs: {
    //         stdout: state.Allocationlist.taskLogs.stdout,
    //         stderr: state.Allocationlist.taskLogs.stderr
    //     }
    // }
}
export default connect(mapStateToProps)(withStyles(styles)(TaskLog));