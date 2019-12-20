import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KvItem from '../../../components/KvItem';
import { formatTime } from '../../../utils/formatTime';
import Select from '../../../components/Select/SelectButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const styles = theme => ({
    root: {
        position: 'relative',
        top: '0',
        left: 0,
        opacity: 1,
        // padding: '38px 34px',
        padding: '19px 52px',
        color: 'rgb(116, 116, 116)',
        display: 'flex'
    },
    kvContent: {
        backgroundColor: 'rgba(68,105,128,0.02)',
        paddingTop: '20px',
        paddingBottom: '1px',
        marginBottom: '35px'
    },
    kvItem: {
        marginBottom: 30,
        paddingLeft: '24px'
    },
    greenKvItem: {
        marginBottom: 30,
        paddingLeft: '24px',
        color: 'rgb(86,158,5)'
    },
    redKvItem: {
        marginBottom: 30,
        paddingLeft: '24px',
        color: 'rgb(208, 2, 27)'
    },
    schedule: {
        paddingLeft: '24px',
        marginBottom: '30px',
        lineHeight: '40px',
        fontSize: '30px',
        fontWeight: "400",
        whiteSpace: 'pre-line',
        wordBreak: 'break-all'
    },
    versionList: {
        backgroundColor: 'rgba(68,105,128,0.02)',
        flex: 'auto',
        padding: '20px 15px',
        boxSizing: 'border-box',
        minWidth: '280px',
        maxWidth: '280px',
        // width: '280px',
        // height: '100%',
        marginRight: '35px',
        marginBottom: '35px',
        alignItems: 'stretch'
    },
    versionContent: {
        textAlign: 'center'
    },
    version: {
        height: '56px',
        lineHeight: '56px',
        marginBottom: '6px',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: '400',
        color: 'rgb(97,139,162)',
        backgroundColor: 'rgba(75,139,175,0.2)',
        cursor: 'pointer'
    },
    selected: {
        color: 'rgb(238,249,255)',
        backgroundColor: 'rgb(97,139,162)'
    },
    arrow: {
        fontSize: '28px',
        // marginBottom: '-3px',
        color: 'rgb(75, 139, 175)',
        // paddingLeft: '56px'
    },
    subContent: {
        flex: 'auto',
        minWidth: '400px',
        maxWidth: '520px',
        width: '27%',
        marginRight: '35px'
    },
    subTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 42,
        fontSize: 24,
        fontWeight: 300,
        backgroundColor: 'rgba(97, 139, 162, 0.1)',
        paddingLeft: '24px'
    },
    SelectButton: {
        height: '100%',
        width: '111px',
        fontSize: '18px',
        fontWeight: '400',
        verticalAlign: 'middle',
        backgroundColor: 'rgba(97,139,162,0.8)'
    },
    displayText: {
        maxWidth: 'calc(100% - 40px)',
        marginRight: '-27px'
    },
    textArrow: {
        left: '27px',
        fontSize: '27px'
    },
    selectList: {
        top: 42
    },
    option: {
        height: '42px',
        lineHeight: '42px'
    }
});

const kvMap = {
    pending: '启动中',
    service: '服务',
    running: '运行中',
    dead: '已停止'
}

function HandleDiff(props) {
    const style = {
        keyName: {
            fontSize: '16px',
            fontWeight: '400',
            marginBottom: '3px'
        },
        value: {
            fontSize: '14px',
            fontWeight: '300',
            whiteSpace: 'pre-line',
            wordBreak: 'break-all'
        }
    }
    if (props.toDiff === false) {
        return <KvItem keyName={props.keyName} className={props.classes.kvItem} value={props.value} style={style} />;
    } else if (props.value === props.prevValue) {
        return props.value ? <KvItem keyName={props.keyName} className={props.classes.kvItem} value={props.value} style={style} /> : null;
    } else {
        return <div>
            {
                props.value || props.value === 0 ? <KvItem keyName={props.keyName} className={props.classes.greenKvItem} value={props.value} sign={'++'} style={style} /> : null
            }
            {
                props.prevValue || props.prevValue === 0 ? <KvItem keyName={props.keyName} className={props.classes.redKvItem} value={props.prevValue} sign={'--'} style={style} /> : null
            }
        </div>
    }
}


class JobHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTaskIndex: 0,
            selectedVersionIndex: 0
        };
    }

    showDatacenter = (Datacenters) => {
        if (Datacenters instanceof Array) {
            return Datacenters.join(', ');
        } else {
            return;
        }
    }

    selectTask = (index) => [
        this.setState({
            selectedTaskIndex: index
        })
    ]

    // selectVersion = (index) => (event) => {
    //     this.setState({
    //         selectedVersionIndex: index,
    //         selectedTaskIndex: 0
    //     })
    // }
    selectVersion = (index) => {
        this.setState({
            selectedVersionIndex: index,
            selectedTaskIndex: 0
        })
    }

    arrToString = (arr) => {
        if (arr instanceof Array) {
            return arr.join('\n');
        } else {
            return arr;
        }
    }

    constraintProcess = (constraints = []) => {
        if (constraints === null) {
            return '';
        }
        let resArr = [];
        constraints.forEach(constraint => {
            if (constraint.Operand === 'distinct_hosts') {
                resArr.push(`不同主机`)
            } else {
                resArr.push(`${constraint.LTarget}${constraint.Operand}${constraint.RTarget}`);
            }
        })
        return resArr.join('\n');

    }

    portDataProcess = (port_Map = [], networks = []) => {
        let ports = {}, resArr = [];
        port_Map && port_Map.forEach(portItem => {
            for (let key in portItem) {
                ports[key] = {
                    originPort: portItem[key]
                };
            }
        })
        networks && networks.forEach(nw => {
            if (nw.DynamicPorts) {
                nw.DynamicPorts.forEach(nwdp => {
                    if (ports[nwdp.Label]) {
                        ports[nwdp.Label].DynamicPort = true;
                    }
                });
            }
            if (nw.ReservedPorts) {
                nw.ReservedPorts.forEach(nwrp => {
                    if (ports[nwrp.Label]) {
                        ports[nwrp.Label].ReservedPort = nwrp.Value;
                    }
                });
            }
        });
        for (let key in ports) {
            if (ports[key].DynamicPort) {
                resArr.push(`${key}: ${ports[key].originPort}-> 动态映射`);
            } else if (ports[key].ReservedPort) {
                resArr.push(`${key}: ${ports[key].originPort}-> ${ports[key].ReservedPort}`);
            }
        }
        return resArr.join('\n');
    }

    objToString = (obj) => {
        if (obj instanceof Object) {
            let strArr = [];
            for (let key in obj) {
                strArr.push(`${key}=${obj[key]}`);
            }
            return strArr.join('\n');
        } else {
            return obj;
        }
    }

    render() {
        const { classes, className, data: jobDetail } = this.props;
        const { detail, jobHistory } = jobDetail;
        let classNameWrap = classes.root;

        const selectedVersion = classes.version + ' ' + classes.selected;
        if (className) {
            classNameWrap += ' ' + className;
        }

        let versions = jobHistory.Versions || [];
        let versionList = [];
        versions.forEach((version, index) => {
            versionList.push({
                display: `v${version.Version}`,
                info: version
            })
        })

        let currentVersion = versionList[this.state.selectedVersionIndex] ? versionList[this.state.selectedVersionIndex].info : {};
        let prevVersion = currentVersion;
        if (this.state.selectedVersionIndex !== (versionList.length - 1)) {
            prevVersion = versionList[this.state.selectedVersionIndex + 1] ? versionList[this.state.selectedVersionIndex + 1].info : {};
        }

        const taskGroup = currentVersion.TaskGroups ? currentVersion.TaskGroups[0] : {};
        const taskInfo = taskGroup.Tasks ? taskGroup.Tasks[this.state.selectedTaskIndex] : { Config: {}, Resources: {} };
        const currentTaskName = taskInfo.Name;

        const prevTaskGroup = prevVersion.TaskGroups ? prevVersion.TaskGroups[0] : {};
        const prevTasks = prevTaskGroup.Tasks || [];
        let prevTaskInfo = { Config: {}, Resources: {} };
        prevTasks.forEach((task) => {
            if (task.Name === currentTaskName) {
                prevTaskInfo = task;
            }
        })

        return (
            <div className={classNameWrap}>
                {/* <div className={classes.versionList}>
                    {
                        versionList.map((version, index) => {
                            return (
                                <div key={version.display} className={classes.versionContent}>
                                    {
                                        index === 0 ?
                                            null : <KeyboardArrowUp className={classes.arrow}></KeyboardArrowUp>
                                    }
                                    {
                                        index === this.state.selectedVersionIndex ?
                                            <div className={selectedVersion}>{version.display}</div> :
                                            <div className={classes.version} onClick={this.selectVersion(index)}>{version.display}</div>
                                    }

                                </div>
                            )

                        })
                    }
                </div> */}
                <div className={classes.subContent}>
                    <div>
                        <div className={classes.subTitle}>
                            <div>基本信息</div>
                            <Select
                                className={classes.SelectButton}
                                list={versionList || []}
                                title={'版本'}
                                value={versionList[this.state.selectedVersionIndex] && versionList[this.state.selectedVersionIndex].display}
                                valueKey={'display'}
                                displayKey={'display'}
                                onSelected={this.selectVersion}
                                extendedClasses={{
                                    displayText: classes.displayText,
                                    textArrow: classes.textArrow,
                                    selectList: classes.selectList,
                                    option: classes.option
                                }}
                            />
                        </div>
                        <div className={classes.kvContent}>
                            <HandleDiff classes={classes} keyName="类型" value={kvMap[currentVersion.Type] || currentVersion.Type} prevValue={kvMap[prevVersion.Type] || prevVersion.Type} />
                            <HandleDiff classes={classes} keyName="更改时间" value={formatTime(currentVersion.SubmitTime)} toDiff={false} />
                            <HandleDiff classes={classes} keyName="地域" value={currentVersion.Region} prevValue={prevVersion.Region} />
                            <HandleDiff classes={classes} keyName="数据中心" value={this.showDatacenter(currentVersion.Datacenters)} prevValue={this.showDatacenter(prevVersion.Datacenters)} />
                            <HandleDiff classes={classes} keyName="当前版本" value={currentVersion.Version} toDiff={false} />
                            <HandleDiff classes={classes} keyName="状态" value={kvMap[currentVersion.Status] || currentVersion.Status} prevValue={kvMap[prevVersion.Status] || prevVersion.Status} />
                        </div>
                    </div>
                    <div>
                        <div className={classes.subTitle}>调度策略</div>
                        <div className={classes.kvContent}>
                            <div className={classes.schedule}>
                                {
                                    this.constraintProcess(detail.Constraints)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.subContent}>
                    <div className={classes.subTitle}>
                        <div>应用信息</div>
                        <Select
                            className={classes.SelectButton}
                            list={taskGroup.Tasks || []}
                            title={'任务'}
                            value={taskInfo.Name}
                            valueKey={'Name'}
                            displayKey={'Name'}
                            onSelected={this.selectTask}
                            extendedClasses={{
                                displayText: classes.displayText,
                                textArrow: classes.textArrow,
                                selectList: classes.selectList,
                                option: classes.option
                            }}
                        />
                    </div>
                    <div className={classes.kvContent}>
                        <HandleDiff classes={classes} keyName="运行时类型" value={taskInfo.Driver} prevValue={prevTaskInfo.Driver} />
                        <HandleDiff classes={classes} keyName="容器镜像" value={taskInfo.Config.image} prevValue={prevTaskInfo.Config.image} />
                        <HandleDiff classes={classes} keyName="CPU" value={taskInfo.Resources.CPU + 'MHz'} prevValue={prevTaskInfo.Resources.CPU + 'MHz'} />
                        <HandleDiff classes={classes} keyName="内存" value={taskInfo.Resources.MemoryMB + 'MB'} prevValue={prevTaskInfo.Resources.MemoryMB + 'MB'} />
                        <HandleDiff classes={classes} keyName="实例数" value={taskGroup.Count} prevValue={prevTaskGroup.Count} />
                        <HandleDiff classes={classes} keyName="启动命令" value={taskInfo.Config.command} prevValue={prevTaskInfo.Config.command} />
                        <HandleDiff classes={classes} keyName="启动参数" value={this.arrToString(taskInfo.Config.args)} prevValue={this.arrToString(prevTaskInfo.Config.args)} />
                        <HandleDiff classes={classes} keyName="环境变量" value={this.objToString(taskInfo.Env)} prevValue={this.objToString(prevTaskInfo.Env)} />
                        <HandleDiff classes={classes} keyName="端口与服务"
                            value={this.portDataProcess(taskInfo.Config.port_map, taskInfo.Resources.Networks)}
                            prevValue={this.portDataProcess(prevTaskInfo.Config.port_map, prevTaskInfo.Resources.Networks)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
JobHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(JobHistory));