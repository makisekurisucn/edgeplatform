import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import EventItem from '../../components/EventItem';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { getTaskLogs, getBothTaskLogs } from '../../actions/Allocation';
import FixedHeight from '../../components/FixedHeight';
import Select from '../../components/Select/HorizontalButton';
import FadeWrap from '../../components/FadeWrap';

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
    logContent: {
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
    },
    logText: {
        overflowY: 'auto',
        height: '100%'
    },
    fadeWrap: {
        height: '100%'
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
const INITIALOFFSET = 2500;
class TaskLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            stdoutOffset: INITIALOFFSET,
            stderrOffset: INITIALOFFSET,
            // stdoutScrollTop:0,
            // stderrScrollTop:0,
            isStderrHidden: true,
            isStdoutHidden: false,
            isStdoutFirstTimeLoad: false,
            isStderrFirstTimeLoad: false
        };
        this.stdoutLog = null;
        this.stderrLog = null;
        this.scrollTimeID = null;
    }

    componentDidMount() {
        if (this.props.data.alloc.ID && this.props.data.taskName) {
            const { dispatch } = this.props;
            const stdoutParams = {
                task: this.props.data.taskName,
                follow: false,
                type: 'stdout',
                offset: INITIALOFFSET,
                origin: 'end',
                plain: true
            };
            const stderrParams = {
                task: this.props.data.taskName,
                follow: false,
                type: 'stderr',
                offset: INITIALOFFSET,
                origin: 'end',
                plain: true
            };
            getTaskLogs(dispatch, this.props.data.alloc.ID, stdoutParams);
            getTaskLogs(dispatch, this.props.data.alloc.ID, stderrParams);
        }
        console.log('add listener')
        this.stdoutLog.addEventListener('scroll', this.scrollListener);
        this.stderrLog.addEventListener('scroll', this.scrollListener);
    }

    componentWillUnmount() {
        this.stdoutLog.removeEventListener('scroll', this.scrollListener);
        this.stderrLog.removeEventListener('scroll', this.scrollListener);
    }

    componentDidUpdate() {
        // console.log('%%%%%')
        // console.log(this.props.data.alloc);
        // const { dispatch } = this.props;
        // getTaskLogs(dispatch, '96efbdaa-795d-1b45-6be6-14f3d84e67be', { task: 'jobmanager' });
        if (this.props.data.alloc.ID && this.props.data.taskName) {
            if (this.state.isStdoutHidden === false && this.state.isStderrHidden === true) {
                if (this.state.isStdoutFirstTimeLoad === true && this.stdoutLog.scrollHeight > this.stdoutLog.clientHeight) {
                    this.stdoutLog.scrollTop = this.stdoutLog.scrollHeight - this.stdoutLog.clientHeight;
                    this.setState({
                        isStdoutFirstTimeLoad: false
                    })
                }
            } else if (this.state.isStdoutHidden === true && this.state.isStderrHidden === false) {
                if (this.state.isStderrFirstTimeLoad === true && this.stderrLog.scrollHeight > this.stderrLog.clientHeight) {
                    this.stderrLog.scrollTop = this.stderrLog.scrollHeight - this.stderrLog.clientHeight;
                    this.setState({
                        isStderrFirstTimeLoad: false
                    })
                }
            }

            // const params = {
            //     task: this.props.data.taskName,
            //     follow: false,
            //     type: this.state.selectedIndex === 0 ? 'stdout' : 'stderr',
            //     // offset: 0,
            //     offset: this.state.selectedIndex === 0 ? this.state.stdoutOffset : this.state.stderrOffset,
            //     origin: 'end',
            //     plain: true
            // };
            // console.log('get taskLogs')
            // const { dispatch } = this.props;
            // getTaskLogs(dispatch, this.props.data.alloc.ID, params);


            // const stdoutParams = {
            //     task: nextTaskName,
            //     follow: false,
            //     type: 'stdout',
            //     offset: INITIALOFFSET,
            //     origin: 'end',
            //     plain: true
            // };
            // const stderrParams = {
            //     task: nextTaskName,
            //     follow: false,
            //     type: 'stderr',
            //     offset: INITIALOFFSET,
            //     origin: 'end',
            //     plain: true
            // };
            // getTaskLogs(dispatch, this.props.data.alloc.ID, stdoutParams);
            // getTaskLogs(dispatch, this.props.data.alloc.ID, stderrParams);

        }
    }

    componentWillReceiveProps(nextProps) {
        //需要修改，这里传进来的props为stdout和stderr，因此重复发一个相同请求后，判断前后props相同，不会更新，不会无限循环
        // console.log('prev')
        // console.log(this.props.taskLogs)
        // console.log('next')
        // console.log(next.taskLogs)
        // console.log(this.props.taskLogs.stdout === next.taskLogs.stdout)
        // console.log(this.props.taskLogs === next.taskLogs)
        console.log('will receive props')
        if (nextProps.data.alloc.ID && nextProps.data.taskName) {
            const prevAllocID = this.props.data.alloc.ID;
            const prevTaskName = this.props.data.taskName;
            const nextAllocID = nextProps.data.alloc.ID;
            const nextTaskName = nextProps.data.taskName;
            console.log('allocID and taskName existence')
            if (prevAllocID === nextAllocID && prevTaskName === nextTaskName) {
                console.log('completely same')
            } else {
                const { dispatch } = this.props;
                const params = {
                    task: nextTaskName,
                    follow: false,
                    offset: INITIALOFFSET,
                    origin: 'end',
                    plain: true
                };
                getBothTaskLogs(dispatch, nextAllocID, params);
                this.setState({
                    selectedIndex: 0,
                    stdoutOffset: INITIALOFFSET,
                    stderrOffset: INITIALOFFSET,
                    isStderrHidden: true,
                    isStdoutHidden: false,
                    isStdoutFirstTimeLoad: true,
                    isStderrFirstTimeLoad: true
                })
            }


            // console.log('get taskLogs')
            // const { dispatch } = this.props;
            // getTaskLogs(dispatch, this.props.data.alloc.ID, params);
        }

    }

    selectData = (index) => {
        //dispatch
        if (this.state.selectedIndex === index) {
        } else if (selectList[index].text === 'stdout') {
            this.setState({
                selectedIndex: index,
                isStderrHidden: true,
                isStdoutHidden: false
            })
        }
        else if (selectList[index].text === 'stderr') {
            this.setState({
                selectedIndex: index,
                isStderrHidden: false,
                isStdoutHidden: true
            })
        }
    }

    scrollListener = () => {
        clearTimeout(this.scrollTimeID);
        this.scrollTimeID = setTimeout(this.scrollLoading, 300);
    }

    scrollLoading = () => {
        if (this.state.isStdoutHidden === false && this.state.isStderrHidden === true) {
            console.log('stdout scroll')
            if (this.stdoutLog.scrollHeight > this.stdoutLog.clientHeight && this.stdoutLog.scrollTop < 30) {
                const newOffset = this.state.stdoutOffset + INITIALOFFSET;
                const { dispatch } = this.props;
                const stdoutParams = {
                    task: this.props.data.taskName,
                    follow: false,
                    type: 'stdout',
                    offset: newOffset,
                    origin: 'end',
                    plain: true
                };
                this.setState({
                    stdoutOffset: newOffset
                })
                getTaskLogs(dispatch, this.props.data.alloc.ID, stdoutParams);
                console.log('stdout < 10')
            }
        } else if (this.state.isStdoutHidden === true && this.state.isStderrHidden === false) {
            console.log('stderr scroll')
            if (this.stderrLog.scrollHeight > this.stderrLog.clientHeight && this.stderrLog.scrollTop < 30) {
                const newOffset = this.state.stderrOffset + INITIALOFFSET;
                const { dispatch } = this.props;
                const stderrParams = {
                    task: this.props.data.taskName,
                    follow: false,
                    type: 'stderr',
                    offset: newOffset,
                    origin: 'end',
                    plain: true
                };
                this.setState({
                    stderrOffset: newOffset
                })
                getTaskLogs(dispatch, this.props.data.alloc.ID, stderrParams);
                console.log('stderr < 10')
            }
        }
    }
    //对应的onclick也要记得删
    logHeight = () => {
        console.log('clientHeight= ' + this.stdoutLog.clientHeight)
        console.log('scrollHeight= ' + this.stdoutLog.scrollHeight)
        console.log('scrollTop= ' + this.stdoutLog.scrollTop)
        console.log('clientHeight= ' + this.stderrLog.clientHeight)
        console.log('scrollHeight= ' + this.stderrLog.scrollHeight)
        console.log('scrollTop= ' + this.stderrLog.scrollTop)

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
                <div className={classes.logContent}>
                    {/* {this.state.selectedIndex === 0 ? taskLogs.stdout : taskLogs.stderr} */}
                    <FixedHeight className={classes.fixedHeight} reducedHeight={423}>
                        <FadeWrap className={classes.fadeWrap} isHidden={this.state.isStdoutHidden} from="left" to="left">
                            <div className={classes.logText} ref={ele => this.stdoutLog = ele} onClick={this.logHeight}>
                                {stdout}
                            </div>
                        </FadeWrap>
                        <FadeWrap className={classes.fadeWrap} isHidden={this.state.isStderrHidden} from="right" to="right">
                            <div className={classes.logText} ref={ele => this.stderrLog = ele} onClick={this.logHeight}>
                                {stderr}
                            </div>
                        </FadeWrap>
                        {/* <div className={classes.logText} onClick={this.logHeight} ref={ele => { this.logText = ele }}>
                            {this.state.selectedIndex === 0 ? stdout : stderr}
                        </div> */}
                        {/* {this.state.selectedIndex === 0 ? stdout : stderr} */}
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