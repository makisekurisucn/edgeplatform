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
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
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
        cursor: 'pointer'
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






    // appHeader: {
    //     width: '100%',
    //     minWidth: '1100px',
    //     height: 50,
    //     paddingLeft: '16px',
    //     boxSizing: 'border-box',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     color: 'rgb(116, 116, 116)',
    //     boxShadow: '1px 1px 6px #ababab',
    //     marginBottom: '20px'
    // },
    // headerName: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     lineHeight: '50px'
    // },
    // status: {
    //     display: 'inline-block',
    //     width: '75px',
    //     height: '27px',
    //     border: '2px solid #4BAF7E',
    //     color: '#4BAF7E',
    //     lineHeight: '27px',
    //     textAlign: 'center',
    //     fontSize: '18px',
    //     fontWeight: 400,
    //     marginRight: '20px'
    // },
    mainTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 15px',
        backgroundColor: 'rgb(238, 238, 238)',
        fontSize: '20px',
        color: 'rgb(116, 116, 116)'
    },
    // link: {
    //     color: 'rgb(44,99,130)',
    //     backgroundColor: 'rgb(213, 214, 214)',
    //     padding: '2px 4px',
    //     position: 'relative',
    //     float: 'right',
    //     cursor: 'pointer'
    // },
    // address: {
    //     fontSize: '17px',
    //     fontWeight: 400,
    //     maxWidth: '480px',
    //     overflow: 'hidden',
    //     whiteSpace: 'nowrap',
    //     textOverflow: 'ellipsis',
    //     marginRight: '34px'
    // },
    // workNode: {
    //     minWidth: '100px',
    //     fontSize: '17px',
    //     fontWeight: '400',
    //     marginRight: '10px'
    // },
    command: {
        position: 'relative',
        height: '25px',
        width: '55px',
        lineHeight: '25px',
        fontSize: '13px',
        color: '#EEF9FF'
    },
    // selectButton: {
    //     height: '100%',
    //     width: '140px',
    //     fontSize: '18px',
    //     fontWeight: '400',
    //     verticalAlign: 'middle',
    //     backgroundColor: 'rgba(97,139,162,0.8)',
    //     boxShadow: '1px 1px 6px #ababab'
    // },
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
        left: '2px',
        transform: 'scale(0.8)'
    },
    selectList: {

    },
    // option: {

    // },
    // arrowBack: {
    //     color: '#979797',
    //     fontSize: 29,
    //     cursor: 'pointer',
    //     height: '50px'
    // },
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
        // let status = '';
        for (let taskName in alloc.TaskStates) {
            taskList.push(taskName)
        }
        taskList.sort();
        // if (alloc.TaskStates) {
        //     status = statusMap[alloc.TaskStates[list[this.state.currentTaskIndex]].State]
        // }

        const defaultCommand = {
            name: '停止',
            handleClick: () => {
                stopAllocation(dispatch, alloc.ID)
            }
        };
        const commandList = [
            {
                name: '重启',
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
                    <div className={classes.prevLabel} onClick={this.handleBack}>实例列表</div>
                    <div className={classes.splitLine}>/</div>
                    <div className={classes.currentLabel}>实例详情</div>
                </div>
                {/* 面包屑 */}
                {/* 外层添加的div，不用面包屑就把这层div删掉，给root加上flex内容 */}
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
                                    selectList: classes.selectList,
                                    // option: classes.option
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
                                                        <div>{taskName}</div>
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
                {/* 外层div */}




                {/* <div className={classes.appHeader}>
                    <div className={classes.flex}>
                        <div className={classes.headerName}>
                            <ArrowBackIos className={classes.arrowBack} onClick={this.handleArrowBack} />
                            <p className={classes.mainTitle} title={getAllocationName(alloc.Name)}>{getAllocationName(alloc.Name)}</p>

                            <span className={classes.status}>{status}</span>

                        </div>
                        <Command className={classes.command} defaultCommand={defaultCommand} commandList={commandList} />
                    </div>
                    <div className={classes.address} title={DCInfo.address}>
                        {`地址：${DCInfo.address} ( ${DCInfo.region} - ${DCInfo.DC} )`}
                    </div>
                    <div className={classes.workNode}>
                        {`工作节点：`}
                        <div className={classes.link} onClick={this.turnToNodeDetail}>{extraData.NodeName}</div>
                    </div>
                    <Select
                        className={classes.selectButton}
                        title={'任务'}
                        list={list}
                        value={list[this.state.currentTaskIndex]}
                        onSelected={this.selectTask}
                        extendedClasses={{
                            displayText: classes.displayText,
                            textArrow: classes.textArrow,
                            selectList: classes.selectList,
                            option: classes.option
                        }}
                    />
                </div>
                <div className={classes.mainContent}>
                    <div className={classes.breadcrumb}>{`${getAllocationName(alloc.Name)} / ${list[this.state.currentTaskIndex]}`}</div>
                    <div className={classes.taskDetail}>
                        <div className={classes.flexLeft}>
                            <div className={classes.marginBottom}>
                                <div className={classes.contentTitle}>运行事件</div>
                                <div className={classes.runningEvent}>
                                    <RunningEvent className={classes.overflow} data={{ alloc, region, taskName: list[this.state.currentTaskIndex] }} />
                                </div>
                            </div>
                            <div className={classes.taskLog}>
                                <div className={classes.contentTitle}>应用日志</div>
                                <div className={classes.taskLog}>
                                    <TaskLog data={{ alloc, region, taskName: list[this.state.currentTaskIndex] }} />
                                </div>
                            </div>
                        </div>
                        <div className={classes.flexRight}>
                            <div className={classes.contentTitle}>监控</div>
                            <div className={classes.taskMetric}>
                                <TaskMetric data={{ alloc, region, taskName: list[this.state.currentTaskIndex] }} />
                            </div>
                        </div>
                    </div>
                </div> */}
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