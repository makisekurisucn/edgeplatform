import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KvItem from '../../../components/KvItem';
import Tabs from '../../../components/Tabs';
import { formatTime } from '../../../utils/formatTime';
import Select from '../../../components/Select/SelectButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const styles = theme => ({
    root: {
        position: 'relative',
        top: '0',
        left: 0,
        opacity: 1,
        padding: '38px 34px',
        color: 'rgb(97,139,162)',
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
        height: 42,
        fontSize: 30,
        fontWeight: 300,
        lineHeight: '42px',
        backgroundColor: 'rgba(97, 139, 162, 0.1)',
        paddingLeft: '24px'
    },
    SelectButton: {
        top: '12px',
        position: 'relative',
        fontSize: '14px',
        fontWeight: '400',
        verticalAlign: 'middle',
        backgroundColor: 'rgba(97,139,162,0.8)'
    }
});

const kvMap = {
    pending: '启动中',
    service: '服务',
    running: '运行中',
    dead: '已停止'
}

function HandleDifference(props) {
    const style = {
        keyName: {
            fontSize: '14',
            fontWeight: '300',
            marginBottom: '3px'
        },
        value: {
            fontSize: '16',
            fontWeight: '400',
            whiteSpace: 'pre-line',
            wordBreak: 'break-all'
        }
    }
    if (props.value === props.prevValue) {
        return <KvItem keyName={props.keyName} className={props.classes.kvItem} value={props.value} style={style} />;
    } else {
        return <div>
            <KvItem keyName={props.keyName} className={props.classes.greenKvItem} value={props.value} sign={'++'} style={style} />
            <KvItem keyName={props.keyName} className={props.classes.redKvItem} value={props.prevValue} sign={'--'} style={style} />
            {/* <KvItem keyName="启动参数" className={classes.kvItem} value={taskInfo.Config.args ? taskInfo.Config.args.join('\n') : ''} sign={'--'} style={style} /> */}
        </div>
    }
}

const textWrapper = (arr = []) => {
    if (arr instanceof Array) {
        return arr.join('\n');
    } else {
        return '';
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

    selectVersion = (index) => (event) => {
        this.setState({
            selectedVersionIndex: index
        })
    }

    render() {
        const { classes, className, data: jobDetail } = this.props;
        const { detail, status, history: jobHistory } = jobDetail;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        // const taskList = detail.TaskGroups ? detail.TaskGroups[0].Tasks : [];
        // const taskInfo = detail.TaskGroups ? detail.TaskGroups[0].Tasks[0] : { Config: {} };
        // const taskInfo = taskList[this.state.selectedTaskIndex] || { Config: {} };
        const selectedVersion = classes.version + ' ' + classes.selected;
        if (className) {
            classNameWrap += ' ' + className;
        }

        console.log('------------------------')
        console.log(jobHistory)
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

        const prevTaskGroup = prevVersion.TaskGroups ? prevVersion.TaskGroups[0] : {};
        const prevTaskInfo = taskGroup.Tasks ? taskGroup.Tasks[this.state.selectedTaskIndex] : { Config: {}, Resources: {} };


        const style = {
            keyName: {
                fontSize: '14',
                fontWeight: '300',
                marginBottom: '3px'
            },
            value: {
                fontSize: '16',
                fontWeight: '400',
                whiteSpace: 'pre-line',
                wordBreak: 'break-all'
            }
        }
        console.log(taskInfo)
        return (
            <div className={classNameWrap}>
                <div className={classes.versionList}>
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
                </div>
                <div className={classes.subContent}>
                    <div>
                        <div className={classes.subTitle}>基本信息</div>
                        <div className={classes.kvContent}>
                            {/* <KvItem keyName="类型" className={classes.kvItem} value={kvMap[currentVersion.Type] || currentVersion.Type} style={style} />
                            <KvItem keyName="更改时间" className={classes.kvItem} value={formatTime(currentVersion.SubmitTime)} style={style} />
                            <KvItem keyName="Region" className={classes.kvItem} value={currentVersion.Region} style={style} />
                            <KvItem keyName="数据中心" className={classes.kvItem} value={this.showDatacenter(currentVersion.Datacenters)} style={style} />
                            <KvItem keyName="当前版本" className={classes.kvItem} value={currentVersion.Version} style={style} />
                            <KvItem keyName="状态" className={classes.kvItem} value={kvMap[currentVersion.Status] || currentVersion.Status} style={style} /> */}
                            <HandleDifference classes={classes} keyName="类型" value={kvMap[currentVersion.Type] || currentVersion.Type} prevValue={kvMap[prevVersion.Type] || prevVersion.Type} />
                            <HandleDifference classes={classes} keyName="更改时间" value={formatTime(currentVersion.SubmitTime)} prevValue={formatTime(prevVersion.SubmitTime)} />
                            <HandleDifference classes={classes} keyName="Region" value={currentVersion.Region} prevValue={prevVersion.Region} />
                            <HandleDifference classes={classes} keyName="数据中心" value={this.showDatacenter(currentVersion.Datacenters)} prevValue={this.showDatacenter(prevVersion.Datacenters)} />
                            {/* <HandleDifference classes={classes} keyName="当前版本" value={currentVersion.Version} prevValue={prevVersion.Version} /> */}
                            <KvItem keyName="当前版本" className={classes.kvItem} value={currentVersion.Version} style={style} />
                            <HandleDifference classes={classes} keyName="状态" value={kvMap[currentVersion.Status] || currentVersion.Status} prevValue={kvMap[prevVersion.Status] || prevVersion.Status} />
                        </div>
                    </div>
                    <div>
                        <div className={classes.subTitle}>调度策略</div>
                        <div className={classes.kvContent}>
                            <KvItem keyName="类型" className={classes.kvItem} value={kvMap[detail.Type] || detail.Type} style={style} />
                            <KvItem keyName="更改时间" className={classes.kvItem} value={formatTime(detail.SubmitTime)} style={style} />
                            <KvItem keyName="Region" className={classes.kvItem} value={detail.Region} style={style} />
                            <KvItem keyName="数据中心" className={classes.kvItem} value={this.showDatacenter(detail.Datacenters)} style={style} />
                            <KvItem keyName="当前版本" className={classes.kvItem} value={detail.Version} style={style} />
                            <KvItem keyName="状态" className={classes.kvItem} value={kvMap[detail.Status] || detail.Status} style={style} />
                        </div>
                    </div>
                </div>
                <div className={classes.subContent}>
                    <div className={classes.subTitle}>
                        <div>应用信息</div>
                        {/* <div></div> */}
                        <Select className={classes.SelectButton} list={taskGroup.Tasks || []} value={taskInfo.Name} valueKey={'Name'} displayKey={'Name'} onSelected={this.selectTask} />
                    </div>
                    {/* <div className={classes.subTitle}>应用信息</div> */}
                    <div className={classes.kvContent}>
                        <HandleDifference classes={classes} keyName="运行时类型" value={taskInfo.Driver} prevValue={prevTaskInfo.Driver} />
                        <HandleDifference classes={classes} keyName="容器镜像" value={taskInfo.Config.image} prevValue={prevTaskInfo.Config.image} />
                        <HandleDifference classes={classes} keyName="CPU" value={taskInfo.Resources.CPU} prevValue={prevTaskInfo.Resources.CPU} />
                        <HandleDifference classes={classes} keyName="内存" value={taskInfo.Resources.MemoryMB} prevValue={prevTaskInfo.Resources.MemoryMB} />
                        <HandleDifference classes={classes} keyName="实例数" value={taskGroup.Count} prevValue={prevTaskGroup.Count} />
                        <HandleDifference classes={classes} keyName="启动命令" value={taskInfo.Config.command} prevValue={prevTaskInfo.Config.command} />
                        <HandleDifference classes={classes} keyName="启动参数" value={textWrapper(taskInfo.Config.args)} prevValue={textWrapper(prevTaskInfo.Config.args)} />
                        <HandleDifference classes={classes} keyName="环境变量" value={taskInfo.Env} prevValue={prevTaskInfo.Env} />
                        <HandleDifference classes={classes} keyName="端口与服务" value={''} prevValue={''} />


                        {/* <KvItem keyName="运行时类型" className={classes.kvItem} value={taskInfo.Driver} style={style} />
                        <KvItem keyName="容器镜像" className={classes.kvItem} value={taskInfo.Config.image} style={style} />
                        <KvItem keyName="CPU" className={classes.kvItem} value={taskInfo.Resources.CPU} style={style} />
                        <KvItem keyName="内存" className={classes.kvItem} value={taskInfo.Resources.MemoryMB} style={style} />
                        <KvItem keyName="实例数" className={classes.kvItem} value={taskGroup.Count} style={style} />
                        <KvItem keyName="启动命令" className={classes.kvItem} value={taskInfo.Config.command} style={style} />
                        <KvItem keyName="启动参数" className={classes.kvItem} value={taskInfo.Config.args ? taskInfo.Config.args.join('\n') : ''} sign={'++'} style={style} />
                        <KvItem keyName="环境变量" className={classes.kvItem} value={taskInfo.Env} style={style} />
                        <KvItem keyName="端口与服务" className={classes.kvItem} value={''} style={style} /> */}
                        {/* 启动命令，环境变量和端口服务还没设置好数据 */}
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