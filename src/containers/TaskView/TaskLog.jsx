import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getTaskLogs, getBothTaskLogs } from '../../actions/Allocation';
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
    logContent: {
        // marginBottom: 30,
        height: '150px',
        color: '#EEF9FF',
        border: '1px solid rgba(113,113,113,1)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
            isStderrHidden: true,
            isStdoutHidden: false,
            isStdoutFirstTimeLoad: false,
            isStderrFirstTimeLoad: false
        };
        this.stdoutLog = null;
        this.stderrLog = null;
        this.scrollTimeID = null;
        this.stderrScrollBottom = 0;
        this.stdoutScrollBottom = 0;
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
        this.stdoutLog.addEventListener('scroll', this.scrollListener);
        this.stderrLog.addEventListener('scroll', this.scrollListener);
    }

    componentWillUnmount() {
        this.stdoutLog.removeEventListener('scroll', this.scrollListener);
        this.stderrLog.removeEventListener('scroll', this.scrollListener);
    }

    UNSAFE_componentWillUpdate() {
        if (this.state.isStdoutHidden === false && this.state.isStderrHidden === true) {
            this.stdoutScrollBottom = this.stdoutLog.scrollHeight - this.stdoutLog.scrollTop;
        } else if (this.state.isStdoutHidden === true && this.state.isStderrHidden === false) {
            this.stderrScrollBottom = this.stderrLog.scrollHeight - this.stderrLog.scrollTop;
        }
    }

    componentDidUpdate() {
        if (this.props.data.alloc.ID && this.props.data.taskName) {
            if (this.state.isStdoutHidden === false && this.state.isStderrHidden === true) {
                if (this.state.isStdoutFirstTimeLoad === true && this.stdoutLog.scrollHeight > this.stdoutLog.clientHeight) {
                    this.stdoutLog.scrollTop = this.stdoutLog.scrollHeight - this.stdoutLog.clientHeight;
                    this.setState({
                        isStdoutFirstTimeLoad: false
                    })
                } else {
                    this.stdoutLog.scrollTop = this.stdoutLog.scrollHeight - this.stdoutScrollBottom;
                }
            } else if (this.state.isStdoutHidden === true && this.state.isStderrHidden === false) {
                if (this.state.isStderrFirstTimeLoad === true && this.stderrLog.scrollHeight > this.stderrLog.clientHeight) {
                    this.stderrLog.scrollTop = this.stderrLog.scrollHeight - this.stderrLog.clientHeight;
                    this.setState({
                        isStderrFirstTimeLoad: false
                    })
                } else {
                    this.stderrLog.scrollTop = this.stderrLog.scrollHeight - this.stderrScrollBottom;
                }
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data.alloc.ID && nextProps.data.taskName) {
            const prevAllocID = this.props.data.alloc.ID;
            const prevTaskName = this.props.data.taskName;
            const nextAllocID = nextProps.data.alloc.ID;
            const nextTaskName = nextProps.data.taskName;
            if (prevAllocID === nextAllocID && prevTaskName === nextTaskName) {
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
        }

    }

    selectData = (index) => {
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
        this.scrollTimeID = setTimeout(this.scrollLoading, 200);
    }

    scrollLoading = () => {
        if (this.state.isStdoutHidden === false && this.state.isStderrHidden === true) {
            if (this.stdoutLog.scrollHeight > this.stdoutLog.clientHeight && this.stdoutLog.scrollTop < 90) {
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
            }
        } else if (this.state.isStdoutHidden === true && this.state.isStderrHidden === false) {
            if (this.stderrLog.scrollHeight > this.stderrLog.clientHeight && this.stderrLog.scrollTop < 90) {
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
            }
        }
    }


    render() {
        const { classes, className, stdout, stderr } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        const selectedItem = classes.selectItem + ' ' + classes.selected;

        return (
            <div className={classNameWrap}>
                <Select className={classes.selectList} selectList={selectList} selectedIndex={this.state.selectedIndex} onClick={this.selectData}></Select>
                <div className={classes.logContent}>
                    {/* <FixedHeight className={classes.fixedHeight} reducedHeight={423}> */}
                    <div style={{ height: '100%', display: `${this.state.isStdoutHidden ? 'none' : 'block'}` }}>
                        <div className={classes.logText} ref={ele => this.stdoutLog = ele}>
                            {stdout}
                        </div>
                    </div>
                    <div style={{ height: '100%', display: `${this.state.isStderrHidden ? 'none' : 'block'}` }}>
                        <div className={classes.logText} ref={ele => this.stderrLog = ele}>
                            {stderr}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
TaskLog.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        stdout: state.Allocationlist.taskLogs.stdout,
        stderr: state.Allocationlist.taskLogs.stderr
    }
}
export default connect(mapStateToProps)(withStyles(styles)(TaskLog));