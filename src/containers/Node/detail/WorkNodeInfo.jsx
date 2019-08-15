import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { blueGrey, lightGreen, amber, lightBlue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/zh-cn';
import java from '../../../assets/img/java.png'
import docker from '../../../assets/img/docker-logo.png'
import exec from '../../../assets/img/exec.png'
import qemu from '../../../assets/img/qemu.png'
import rkt from '../../../assets/img/rkt.png'
import rawexec from '../../../assets/img/raw-exec.png'

import Typography from '@material-ui/core/Typography';
import KvItem from '../../../components/KvItem';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 0 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
const runtimeList = ["docker", "qemu", "exec", "raw_exec", "rkt", "java"];

const styles = theme => ({
    root: {
        position: 'relative',
        top: '0',
        left: 0,
        opacity: 1,
        padding: '19px 52px',
        color: 'rgb(116, 116, 116)',//'rgb(97,139,162)',
        display: 'flex'
    },
    kvContent: {
        backgroundColor: 'rgba(68,105,128,0.02)',//backgroundColor: 'rgba(68,105,128,0.02)',
        paddingTop: '20px',
        paddingBottom: '1px',
        marginBottom: '35px'
    },
    execicons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:'rgba(68,105,128,0.02)',
        paddingTop: '20px',
        paddingBottom: '1px',
        paddingRight: '28px',
        paddingLeft: '28px',
        paddingBottom: '15px',
        //marginBottom: '10px',
        alignItems: 'center',
    },
    icons: {
       width:'85px',
       height:'85px',
       textAlign: 'center',
       alignItems: 'center',
    },
    execnames: {
        display: 'flex',
        fontSize: '14px',
        fontWeight: '400',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:'rgba(68,105,128,0.02)',
        //paddingTop: '20px',
        //paddingBottom: '1px',
        paddingRight: '0px',
        paddingLeft: '0px',
        marginBottom: '30px',
        alignItems: 'center',
    },
    execnamesOn: {
        color: '#01653D',

    },
    execnamediv:{
      
        textAlign: 'center',
        flexDirection: 'row',
        marginBottom: '30px',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        paddingBottom: '1px',
        paddingRight: '24px',
        paddingLeft: '20px',
        width:'695px'

    },
    kvItem: {
        marginBottom: 30,
        paddingLeft: '24px'
    },
    subContent: {
        flex: 'auto',
        minWidth: '400px',
        maxWidth: '480px',//520
        width: '27%',
        marginRight: '35px'
    },
    subContentleft: {
        flex: 'auto',
        minWidth: '400px',
        maxWidth: '720px',
        width: '27%',
        marginRight: '35px',
        backgroundColor: 'rgba(68,105,128,0.02)',
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
        padding: '0px 24px',
        color: '#618BA2'
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

class WorkNodeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    selectTask = (index) => [
        this.setState({
            selectedTaskIndex: index
        })
    ]

    render() {
        const { classes, className, data: detail } = this.props;
        let classNameWrap = classes.root;
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

        return (
            <div>
                {detail.Attributes &&
                    <TabContainer>
                        <div className={classNameWrap}>
                            <div className={classes.subContent}>
                                <div className={classes.aboveContent}>
                                    <div className={classes.subTitle}>节点信息</div>
                                    <div className={classes.kvContent}>
                                        <KvItem keyName="工作节点" className={classes.kvItem} value={'工作节点'} style={style} />
                                        <KvItem keyName="数据中心" className={classes.kvItem} value={detail.Datacenter} style={style} />
                                        <KvItem keyName="主机名" className={classes.kvItem} value={detail.Attributes["unique.hostname"]} style={style} />
                                        <KvItem keyName="处理器架构" className={classes.kvItem} value={detail.Attributes["cpu.arch"]} style={style} />
                                        <KvItem keyName="处理器频率" className={classes.kvItem} value={detail.Attributes["cpu.frequency"]} style={style} />
                                        <KvItem keyName="处理器型号" className={classes.kvItem} value={detail.Attributes["cpu.modelname"]} style={style} />
                                        <KvItem keyName="处理器核数" className={classes.kvItem} value={detail.Attributes["cpu.numcores"]} style={style} />
                                        <KvItem keyName="操作系统" className={classes.kvItem} value={detail.Attributes["os.name"]} style={style} />
                                        <KvItem keyName="系统版本" className={classes.kvItem} value={detail.Attributes["os.version"]} style={style} />
                                        <KvItem keyName="内核版本" className={classes.kvItem} value={detail.Attributes["kernel.version"]} style={style} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.subContentleft}>
                                <div className={classes.subTitle}>
                                    <div>运行环境</div>
                                </div>
                                <div>
                                <div className={classes.execicons}>
                                    <div className={classes.icons}>
                                    <img src={docker} width="81" height="67" /></div>
                                    <div className={classes.icons}>
                                    <img src={qemu} width="68" height="68" /></div>
                                    <div className={classes.icons}>
                                    <img src={exec} width="83" height="83" /></div>
                                    <div className={classes.icons}>
                                    <img src={rawexec} width="79" height="79" /></div>
                                    <div className={classes.icons+''+{paddingTop:'20px'}}>
                                    <img src={rkt} width="81" height="32" /></div>
                                    <div className={classes.icons}>
                                    <img src={java} width="45" height="65" /></div>
                                </div>
                                <div className={classes.execnamediv}>
                                    {
                                        runtimeList.map((runtime) => (
                                            <div className={classes.execnamediv}>
                                                <p className={detail.Drivers[runtime] && detail.Drivers[runtime].Detected ? (classes.execnames + ' ' + classes.execnamesOn) : classes.execnames}>
                                                    {runtime}
                                                    <br />
                                                    {detail.Drivers[runtime] && detail.Drivers[runtime].Detected ? "可用" : "不可用"}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                                </div>
                                <div className={classes.belowContent}>
                                    <div className={classes.subTitle}>资源</div>
                                </div>
                            </div>
                        </div>
                    </TabContainer>}
            </div>


        );
    }
}
WorkNodeInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(WorkNodeInfo));