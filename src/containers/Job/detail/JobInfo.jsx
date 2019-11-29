import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KvItem from '../../../components/KvItem';
import { formatTime } from '../../../utils/formatTime';
import Select from '../../../components/Select/SelectButton';

const styles = theme => ({
    root: {
        position: 'relative',
        top: '0',
        left: 0,
        opacity: 1,
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
    subContent: {
        flex: 'auto',
        minWidth: '400px',
        maxWidth: '520px',
        width: '27%',
        marginRight: '35px'
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
    subTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 42,
        fontSize: 24,
        fontWeight: 300,
        // lineHeight: '42px',
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

function KvItemFilter(props) {
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
    if (props.value === undefined || props.value === '' || props.value === null) {
        return null;
    } else {
        return <KvItem keyName={props.keyName} className={props.classes.kvItem} value={props.value} style={style} />;
    }
    // return props.value ? <KvItem keyName={props.keyName} className={props.classes.kvItem} value={props.value} style={style} /> : null;
}

const kvMap = {
    pending: '启动中',
    service: '服务',
    running: '运行中'
}

class JobInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTaskIndex: 0
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

    portDataProcess = (ports = []) => {
        let resArr = [];
        ports.forEach(port => {
            if (port.DynamicPort) {
                resArr.push(`${port.name}: ${port.originPort}-> 动态映射`);
            } else if (port.ReservedPort) {
                resArr.push(`${port.name}: ${port.originPort}-> ${port.ReservedPort}`);
            }
        })
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
        const { detail } = jobDetail;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        const taskList = detail.TaskGroups ? detail.TaskGroups[0].Tasks : [];
        // const taskInfo = detail.TaskGroups ? detail.TaskGroups[0].Tasks[0] : { Config: {} };
        const taskInfo = taskList[this.state.selectedTaskIndex] || { Config: {} };
        if (className) {
            classNameWrap += ' ' + className;
        }
        console.log(taskInfo)
        return (
            <div className={classNameWrap}>
                <div className={classes.subContent}>
                    <div className={classes.aboveContent}>
                        <div className={classes.subTitle}>基本信息</div>
                        <div className={classes.kvContent}>
                            <KvItemFilter classes={classes} keyName="类型" value={kvMap[detail.Type] || detail.Type} />
                            <KvItemFilter classes={classes} keyName="更改时间" value={formatTime(detail.SubmitTime)} />
                            <KvItemFilter classes={classes} keyName="地域" value={detail.Region} />
                            <KvItemFilter classes={classes} keyName="数据中心" value={this.showDatacenter(detail.Datacenters)} />
                            <KvItemFilter classes={classes} keyName="当前版本" value={detail.Version} />
                            <KvItemFilter classes={classes} keyName="状态" value={kvMap[detail.Status] || detail.Status} />
                        </div>
                    </div>
                    <div className={classes.belowContent}>
                        <div className={classes.subTitle}>调度策略</div>
                        <div className={classes.kvContent}>
                            {/* <KvItem keyName="类型" className={classes.kvItem} value={kvMap[detail.Type] || detail.Type} style={style} /> */}
                            <div className={classes.schedule}>
                                {/* {`abc=ced\nabc=ced`} */}
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
                            list={taskList} value={taskInfo.Name}
                            valueKey={'Name'} displayKey={'Name'}
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
                        <KvItemFilter classes={classes} keyName="运行时类型" value={taskInfo.Driver} />
                        <KvItemFilter classes={classes} keyName="容器镜像" value={taskInfo.Config.image} />
                        <KvItemFilter classes={classes} keyName="CPU" value={taskInfo.CPU} />
                        <KvItemFilter classes={classes} keyName="内存" value={taskInfo.MemoryMB} />
                        <KvItemFilter classes={classes} keyName="实例数" value={detail.TaskGroups ? detail.TaskGroups[0].Count : ''} />
                        <KvItemFilter classes={classes} keyName="启动命令" value={taskInfo.Config.command} />
                        <KvItemFilter classes={classes} keyName="启动参数" value={taskInfo.Config.args ? taskInfo.Config.args.join('\n') : ''} />
                        <KvItemFilter classes={classes} keyName="环境变量" value={this.objToString(taskInfo.Env)} />
                        <KvItemFilter classes={classes} keyName="端口与服务" value={this.portDataProcess(taskInfo.ports)} />
                    </div>
                </div>
            </div>
        );
    }
}
JobInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(JobInfo));