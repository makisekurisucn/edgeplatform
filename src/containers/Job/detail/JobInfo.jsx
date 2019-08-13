import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KvItem from '../../../components/KvItem';
import Tabs from '../../../components/Tabs';
import { formatTime } from '../../../utils/formatTime';
import Select from '../../../components/Select/SelectButton';

const styles = theme => ({
    root: {
        position: 'relative',
        top: '0',
        left: 0,
        opacity: 1,
        padding: '19px 52px',
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
        padding: '0px 24px'
    },
    SelectButton: {
        // top: '12px',
        // position: 'relative',
        width: '98px',
        fontSize: '14px',
        fontWeight: '400',
        verticalAlign: 'middle',
        backgroundColor: 'rgba(97,139,162,0.8)'
    }
});

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

    showConstraint = (constraints) => {
        //把constraint字段进行显示
        //如果一个job有多个约束，那么是放到一个constraint下，还是有多个constraint
        //constraint好像是一个存放对象的数组
        //cli和api拿到的数据的字段是一样的吗，是attribute、value、operator还是ltarget、rtarget和operand

        if (constraints instanceof Array) {
            let strArr = [];
            constraints.forEach(constraint => {
                if (constraint.Operand === 'distinct_hosts' && constraint.RTarget == 'true') {
                    strArr.push(`不同主机`)
                } else {
                    strArr.push(`${constraint.LTarget}${constraint.Operand}${constraint.RTarget}`);
                }
            })
            return strArr.join('\n');
        } else {
            return constraints;
        }
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
        const { detail, status } = jobDetail;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        const taskList = detail.TaskGroups ? detail.TaskGroups[0].Tasks : [];
        // const taskInfo = detail.TaskGroups ? detail.TaskGroups[0].Tasks[0] : { Config: {} };
        const taskInfo = taskList[this.state.selectedTaskIndex] || { Config: {} };
        if (className) {
            classNameWrap += ' ' + className;
        }

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
                <div className={classes.subContent}>
                    <div className={classes.aboveContent}>
                        <div className={classes.subTitle}>基本信息</div>
                        <div className={classes.kvContent}>
                            <KvItem keyName="类型" className={classes.kvItem} value={kvMap[detail.Type] || detail.Type} style={style} />
                            <KvItem keyName="更改时间" className={classes.kvItem} value={formatTime(detail.SubmitTime)} style={style} />
                            <KvItem keyName="Region" className={classes.kvItem} value={detail.Region} style={style} />
                            <KvItem keyName="数据中心" className={classes.kvItem} value={this.showDatacenter(detail.Datacenters)} style={style} />
                            <KvItem keyName="当前版本" className={classes.kvItem} value={detail.Version} style={style} />
                            <KvItem keyName="状态" className={classes.kvItem} value={kvMap[detail.Status] || detail.Status} style={style} />
                        </div>
                    </div>
                    <div className={classes.belowContent}>
                        <div className={classes.subTitle}>调度策略</div>
                        <div className={classes.kvContent}>
                            {/* <KvItem keyName="类型" className={classes.kvItem} value={kvMap[detail.Type] || detail.Type} style={style} /> */}
                            <div className={classes.schedule}>
                                {`abc=ced\nabc=ced`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.subContent}>
                    <div className={classes.subTitle}>
                        <div>应用信息</div>
                        {/* <div></div> */}
                        <Select className={classes.SelectButton} list={taskList} value={taskInfo.Name} valueKey={'Name'} displayKey={'Name'} onSelected={this.selectTask} />
                    </div>
                    {/* <div className={classes.subTitle}>应用信息</div> */}
                    <div className={classes.kvContent}>
                        <KvItem keyName="运行时类型" className={classes.kvItem} value={taskInfo.Driver} style={style} />
                        <KvItem keyName="容器镜像" className={classes.kvItem} value={taskInfo.Config.image} style={style} />
                        <KvItem keyName="CPU" className={classes.kvItem} value={taskInfo.CPU} style={style} />
                        <KvItem keyName="内存" className={classes.kvItem} value={taskInfo.MemoryMB} style={style} />
                        <KvItem keyName="实例数" className={classes.kvItem} value={detail.TaskGroups ? detail.TaskGroups[0].Count : ''} style={style} />
                        <KvItem keyName="启动命令" className={classes.kvItem} value={taskInfo.Config.command} style={style} />
                        <KvItem keyName="启动参数" className={classes.kvItem} value={taskInfo.Config.args ? taskInfo.Config.args.join('\n') : ''} style={style} />
                        <KvItem keyName="环境变量" className={classes.kvItem} value={this.objToString(taskInfo.Env)} style={style} />
                        <KvItem keyName="端口与服务" className={classes.kvItem} value={''} style={style} />
                        {/* 启动命令，环境变量和端口服务还没设置好数据 */}
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