import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { formatTime } from '../../utils/formatTime';
import RunningEvent from './RunningEvent';
import TaskMetric from './TaskMetric';
import TaskLog from './TaskLog';
import Select from '../../components/Select/SelectButton';
import KvItem from '../../components/KvItem';
import Command from '../../components/Select/CommandSet';
import { stopAllocation, restartAllocation, stopBlockingAllocDetail } from '../../actions/Allocation';

const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '30px',
        overflow: 'auto'
    },
    breadcrumb: {
        display: 'flex',
        fontSize: '18px',
        color: '#4B8BAF',
        paddingBottom: '10px',
        borderBottom: '2px solid #cccccc',
        marginBottom: '20px'
    },
    splitLine: {
        color: '#a2a2a2',
        margin: '0px 7px'
    },
    prevLabel: {
        // cursor: 'pointer'
    },
    currentLabel: {
        color: '#609',
        cursor: 'default'
    },
    labelContent: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    boxShadow: {
        boxShadow: '1px 1px 6px #ababab'
    },
    allocArea: {
        width: '280px',
        maxWidth: '365px'
    },
    allocHeader: {
        paddingBottom: '10px',
        borderBottom: '1px dashed rgb(205, 205, 209)',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    allocTitle: {
        marginBottom: '4px',
        color: '#4B8BAF',
        fontSize: '18px'
    },
    allocID: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        color: '#8a8e99',
        fontSize: '12px',
        maxWidth: '180px'
    },
    allocLocation: {
        fontSize: '13px',
        color: '#8a8e99',
        marginBottom: '4px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    allocNode: {
        display: 'inline-block',
        padding: '0px 4px',
        float: 'right',
        fontSize: '13px',
        color: '#8a8e99',
        backgroundColor: 'rgba(158, 158, 158, 0.35)',
        cursor: 'pointer'
    },
    kvItem: {
        marginBottom: '10px'
    },
    arrowForward: {
        lineHeight: '430px',
        color: 'rgb(204, 204, 204)',
        fontSize: '29px',
        margin: '0px 6px'
    },
    keyName: {
        fontSize: '15px',
        fontWeight: '400',
        marginBottom: '3px',
        color: 'rgb(92, 92, 92)'
    },
    taskList: {
        fontSize: '13px',
        fontWeight: '300',
        color: 'rgb(138, 142, 153)'
    },
    taskItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1px 6px',
        marginBottom: '2px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgb(238, 238, 238)'
        }
    },
    taskName: {
        maxWidth: '45px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    selectedItem: {
        backgroundColor: 'rgb(238, 238, 238)'
    },
    statusSign: {
        '&:after': {
            content: '""',
            width: '7px',
            height: '7px',
            position: 'relative',
            top: '5px',
            float: 'left',
            display: 'inline-block',
            marginRight: '5px',
            borderRadius: '50%'
        }
    },
    running: {
        '&:after': {
            backgroundColor: '#4BAF7E',
        }
    },
    pending: {
        '&:after': {
            backgroundColor: '#AF954B',
        }
    },
    dead: {
        '&:after': {
            backgroundColor: '#ABABAB',
        }
    },
    mainTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 15px',
        backgroundColor: 'rgb(238, 238, 238)',
        fontSize: '20px',
        color: 'rgb(116, 116, 116)'
    },
    command: {
        position: 'relative',
        height: '25px',
        width: '76px',
        lineHeight: '25px',
        fontSize: '13px',
        color: '#EEF9FF'
    },
    displayText: {
        padding: '0px 10px',
        marginRight: '-20px'
    },
    expandMore: {
        '&:hover': {
            '& $expandMoreArrow': {
                transform: 'scale(0.8) rotate(180deg)'
            },
            '& $selectList': {
                height: 'auto'
            }
        }
    },
    expandMoreArrow: {
        left: '4px',
        transform: 'scale(0.8)'
    },
    selectList: {

    },
    allocDetail: {
        padding: '15px'
    },
    taskDetail: {
        display: 'flex',
        padding: '15px'
    },
    contentTitle: {
        color: '#4B8BAF',
        fontSize: '18px',
        borderBottom: '2px solid rgb(205, 205, 209)',
        paddingBottom: '8px',
        marginBottom: '15px'
    },
    flexLeft: {
        minWidth: '400px',
        maxWidth: '450px',
        marginRight: '40px'
    },
    flexRight: {
        width: '420px'
    },
    marginBottom: {
        marginBottom: '20px'
    },
    runningEvent: {
        height: '195px'
    },
    taskLog: {
        padding: '0px'
    },
    taskMetric: {
        padding: '0px'
    },
    overflow: {
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '0px 10px 0px 0px'
    }
});

const statusMap = {
    ready: '就绪',
    running: '运行中',
    dead: '已停止',
    stop: '已停止',
    pending: '启动中',
    complete: '已完成'
}

const getAllocationName = (prevName) => {
    if (typeof prevName === 'string') {
        const index = prevName.indexOf('.');
        return prevName.substr(index + 1);
    }
    return prevName;
}
class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTaskIndex: 0
        };
    }

    componentWillUnmount() {
        const { dispatch, allocID } = this.props;
        stopBlockingAllocDetail(dispatch, allocID);
    }

    turnToNodeDetail = () => {
        const nodeID = this.props.alloc.NodeID;
        if (nodeID) {
            window.location.href = `/#/console/node/worker/${nodeID}`;
        }
    }

    handleBack = () => {
        if (this.props.switchComponent) {
            this.props.switchComponent({
                isAllocListHidden: false
            });
        }
        this.setState({
            currentTaskIndex: 0
        })
    }

    selectTask = (index) => (event) => {
        this.setState({
            currentTaskIndex: index
        })
    }
    render() {
        const { classes, className, dispatch, alloc = {}, extraData } = this.props;
        const { DCInfo = {}, location, NodeName } = extraData;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        let taskList = [];
        for (let taskName in alloc.TaskStates) {
            taskList.push(taskName)
        }
        taskList.sort();

        const defaultCommand = {
            name: '停止实例',
            handleClick: () => {
                stopAllocation(dispatch, alloc.ID)
            }
        };
        const commandList = [
            {
                name: '重启实例',
                handleClick: () => {
                    restartAllocation(dispatch, alloc.ID);
                }
            }
        ]

        const style = {
            keyName: {
                fontSize: '15px',
                fontWeight: '400',
                marginBottom: '3px',
                color: 'rgb(92, 92, 92)'
            },
            value: {
                fontSize: '13px',
                fontWeight: '300',
                color: '#8a8e99'
            }
        }

        return (
            <div className={classNameWrap}>
                {/* 面包屑 */}
                <div className={classes.breadcrumb}>
                    {/* <div className={classes.prevLabel} onClick={this.handleBack}>实例列表</div>
                    <div className={classes.splitLine}>/</div>
                    <div className={classes.currentLabel}>实例详情</div> */}
                    <div className={classes.prevLabel}>实例详情</div>
                </div>
                {/* 面包屑 */}
                <div className={classes.labelContent}>
                    <div className={classes.boxShadow + ' ' + classes.allocArea}>
                        <div className={classes.mainTitle}>
                            <div>实例详情</div>
                            <Command
                                className={classes.command}
                                defaultCommand={defaultCommand}
                                commandList={commandList}
                                extendedClasses={{
                                    displayText: classes.displayText,
                                    expandMore: classes.expandMore,
                                    expandMoreArrow: classes.expandMoreArrow,
                                    selectList: classes.selectList
                                }}
                            />
                        </div>
                        <div className={classes.allocDetail}>
                            <div className={classes.allocHeader}>
                                <div>
                                    <div className={classes.allocTitle}>{getAllocationName(alloc.Name)}</div>
                                    <div className={classes.allocID} title={alloc.ID}>{`ID: ${alloc.ID}`}</div>
                                </div>
                                <div>
                                    <div className={classes.allocLocation}>{location}</div>
                                    <div className={classes.allocNode} onClick={this.turnToNodeDetail}>{NodeName}</div>
                                </div>
                            </div>
                            <div>
                                <KvItem keyName={'状态'} className={classes.kvItem} value={statusMap[alloc.ClientStatus]} style={style} />
                                <KvItem keyName={'创建时间'} className={classes.kvItem} value={formatTime(alloc.CreateTime)} style={style} />
                                <KvItem keyName={'更新时间'} className={classes.kvItem} value={formatTime(alloc.ModifyTime)} style={style} />
                                <KvItem keyName={'地址'} className={classes.kvItem} value={DCInfo.address} style={style} />
                                <div>
                                    <div className={classes.keyName}>任务列表</div>
                                    <div className={classes.taskList}>
                                        {
                                            taskList.map((taskName, index) => {
                                                const CreateTime = new Date(alloc.TaskStates[taskName].StartedAt).valueOf();
                                                const state = alloc.TaskStates[taskName].State;
                                                const isSelected = this.state.currentTaskIndex === index;
                                                return (
                                                    <div
                                                        className={isSelected ? classes.taskItem + ' ' + classes.selectedItem : classes.taskItem}
                                                        key={taskName}
                                                        onClick={this.selectTask(index)}
                                                    >
                                                        <div className={classes.taskName} title={taskName}>{taskName}</div>
                                                        <div>{formatTime(CreateTime)}</div>
                                                        <div className={classes.statusSign + ' ' + classes[state]}>{statusMap[state]}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'icon-arrow-forward ' + classes.arrowForward}></div>
                    <div className={classes.boxShadow}>
                        <div className={classes.mainTitle}>
                            <div>任务</div>
                        </div>
                        <div className={classes.taskDetail}>
                            <div className={classes.flexLeft}>
                                <div className={classes.marginBottom}>
                                    <div className={classes.contentTitle}>运行事件</div>
                                    <div className={classes.runningEvent}>
                                        <RunningEvent className={classes.overflow} data={{ alloc, taskName: taskList[this.state.currentTaskIndex] }} />
                                    </div>
                                </div>
                                <div className={classes.taskLog}>
                                    <div className={classes.contentTitle}>应用日志</div>
                                    <div className={classes.taskLog}>
                                        <TaskLog className={classes.taskLog} data={{ alloc, taskName: taskList[this.state.currentTaskIndex] }} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.flexRight}>
                                <div className={classes.contentTitle}>监控</div>
                                <div className={classes.taskMetric}>
                                    <TaskMetric className={classes.taskMetric} data={{ alloc, taskName: taskList[this.state.currentTaskIndex] }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TaskView.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        alloc: state.Allocationlist.detail
    };
}
export default connect(mapStateToProps)(withStyles(styles)(TaskView));