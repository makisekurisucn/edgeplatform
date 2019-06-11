import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KvItem from '../../../components/KvItem';
import Tabs from '../../../components/Tabs';
import { formatTime } from '../../../utils/formatTime';

const styles = theme => ({
    root: {
        position: 'relative',
        top: '0',
        left: 0,
        opacity: 1,
        padding: '30px 71px',
        color: 'rgb(97,139,162)',
        display: 'flex'
    },
    kvItem: {
        marginBottom: 30
    },
    subContent: {
        flex: 'auto'
    },
    subTitle: {
        height: 64,
        fontSize: 30,
        fontWeight: 300,
        lineHeight: '50px'
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
        };
    }

    showDatacenter = (Datacenters) => {
        if (Datacenters instanceof Array) {
            return Datacenters.join(', ');
        } else {
            return;
        }
    }

    render() {
        const { classes, className, data } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        const taskInfo = data.TaskGroups ? data.TaskGroups[0].Tasks[0] : { Config: {} };
        if (className) {
            classNameWrap += ' ' + className;
        }
        console.log(taskInfo)
        return (
            <div className={classNameWrap}>
                <div className={classes.subContent}>
                    <div className={classes.subTitle}>基本信息</div>
                    <KvItem keyName="类型" className={classes.kvItem} value={kvMap[data.Type] || data.Type} />
                    <KvItem keyName="更改时间" className={classes.kvItem} value={formatTime(data.SubmitTime)} />
                    <KvItem keyName="Region" className={classes.kvItem} value={data.Region} />
                    <KvItem keyName="数据中心" className={classes.kvItem} value={this.showDatacenter(data.Datacenters)} />
                    <KvItem keyName="当前版本" className={classes.kvItem} value={data.Version} />
                    <KvItem keyName="状态" className={classes.kvItem} value={kvMap[data.Status] || data.Status} />
                </div>
                <div className={classes.subContent}>
                    <div className={classes.subTitle}>应用信息</div>
                    <KvItem keyName="运行时类型" className={classes.kvItem} value={taskInfo.Driver} />
                    <KvItem keyName="容器镜像" className={classes.kvItem} value={taskInfo.Config.image} />
                    <KvItem keyName="CPU" className={classes.kvItem} value={taskInfo.CPU} />
                    <KvItem keyName="内存" className={classes.kvItem} value={taskInfo.MemoryMB} />
                    <KvItem keyName="当前版本" className={classes.kvItem} value={''} />
                    <KvItem keyName="主机名" className={classes.kvItem} value={''} />
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