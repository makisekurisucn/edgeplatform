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

import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
const runtimeList = ["docker", "exec", "java", "qemu", "raw_exec", "rkt"];

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    fab: {
        margin: theme.spacing.unit,
        position: "absolute",
        right: 3 * theme.spacing.unit,
        bottom: 3 * theme.spacing.unit,
    },
    headerContainer: {
        padding: 16,

    },
    headerTtile: {
        fontSize: 24,
        height: 30,
        lineHeight: "30px",
        marginRight: 10
    },
    headerStatus: {
        fontSize: 14,
        color: blueGrey[50],
        backgroundColor: blueGrey[200],
        padding: "2px 10px",
        borderRadius: 4
    },
    contentHeader: {
        fontWeight: 'bold',
        margin: 0
    },
    contentBody: {
        textIndent: 50,
    },
    contentItem: {
        marginBottom: 20,
    },
    bold: {
        fontWeight: 'bold'
    },
    contentDivider: {
        marginBottom: 20,
        marginTop: 20
    },
    headerUnderline: {
        marginTop: 10,
        marginBottom: 10
    },
    taskItem: {
        marginBottom: 20
    },
    taskItemName: {
        textAlign: 'right'
    },
    large: {
        fontSize: 20
    },
    groupName: {
        color: lightBlue[800]
    },
    secondaryColor: {
        color: theme.sec
    },
    historyHeader: {
        marginRight: 20
    },
    statusList: {
        fontSize: '1rem',
        lineHeight: '1.75',
        display: 'flex'

    },
    statusItem: {
        width: 28,
        height: 28,
        borderRadius: '50%',
        textAlign: 'center',
        marginRight: 18,
        cursor: 'pointer'
    },
    statusGrey: {
        color: blueGrey[50],
        backgroundColor: blueGrey[200],
    },
    statusGreen: {
        color: lightGreen[50],
        backgroundColor: lightGreen[700],
    },
    statusYellow: {
        color: amber[50],
        backgroundColor: amber[800],
    },
    statusSelected: {
        transform: 'scale(1.2)'
    },
    logWrap: {
        backgroundColor: blueGrey[900],
        height: 300,
        overflowY: 'auto',
        borderRadius: 4,
        padding: 8
    },
    logContent: {
        fontSize: 16,
        color: blueGrey[50],
        marginTop: 4,
        marginBottom: 4
    },
    taskGroupWrap: {
        backgroundColor: blueGrey[50]
    },
    driverStatus: {
        fontSize: 12,
        fontWeight: 'normal'
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


        return (
            <Paper className={classes.root}>
                {/* <Typography component="div">
                    <Grid container className={classes.headerContainer} alignItems="center">
                        <Grid className={classes.headerTtile}>{detail.Name}</Grid>
                        <Grid className={`${classes.headerStatus} ${detail.Status === "ready" ? classes.statusGreen : null} ${detail.Status === "pending" ? classes.statusYellow : null}`}>{detail.Status}</Grid>
                    </Grid>
                </Typography> */}
                {/* <AppBar position="static">
                    <Tabs value={index} onChange={this.handleChange}>
                        <Tab label="基本信息" />
                        <Tab label="事件信息" />

                    </Tabs>
                </AppBar> */}
                {/* 基本信息 */}
                {/* {index === 0 && detail.Attributes && */}
                {detail.Attributes &&
                    <TabContainer>
                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    类型
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    工作节点
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    数据中心
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Datacenter}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    主机名
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["unique.hostname"]}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    处理器架构
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["cpu.arch"]}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    处理器频率
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["cpu.frequency"]}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    处理器型号
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["cpu.modelname"]}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    处理器核数
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["cpu.numcores"]}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    操作系统
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["os.name"]}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    操作系统版本
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["os.version"]}
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    内核版本
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Attributes["kernel.version"]}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider className={classes.contentDivider} />
                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={3}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    运行时
                                </Typography>
                            </Grid>
                        </Grid>
                        {
                            runtimeList.map((runtime) => (
                                <ExpansionPanel className={classes.taskGroupWrap} key={runtime}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.bold + ' ' + classes.large + ' ' + classes.groupName}>{runtime}
                                            <span className={classes.driverStatus}>({detail.Drivers[runtime] && detail.Drivers[runtime].Detected ? "可用" : "不可用"})</span>
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <Divider />

                                    <ExpansionPanelDetails>
                                        {detail.Drivers[runtime] &&

                                            <Grid container>
                                                <Grid item xs={12}>

                                                    <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                                                        <Grid item xs={2}>
                                                            <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                                                健康度
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                {detail.Drivers[runtime] && detail.Drivers[runtime].Detected && detail.Drivers[runtime].Healthy ? "健康" : "不健康/不可用"}
                                                                {/* {detail.Drivers[runtime] && !detail.Drivers[runtime].Detected ? "不可用": ""} */}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    {detail.Drivers[runtime] && detail.Drivers[runtime].Attributes && runtime === "docker" &&

                                                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                                                            <Grid item xs={2}>
                                                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                                                    docker版本
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={10}>
                                                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                    {detail.Drivers[runtime].Attributes['driver.docker.version']}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>


                                                    }


                                                </Grid>
                                            </Grid>

                                        }


                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            ))}



                        <Divider className={classes.contentDivider} />
                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={3}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    配置信息
                                </Typography>
                            </Grid>
                        </Grid>
                        {detail && detail.Resources && detail.Reserved &&

                            <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                                <Grid item xs={1}>
                                    <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                        保留CPU
                                    </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                        {detail.Reserved.CPU} MHz
                                    </Typography>
                                </Grid>


                                <Grid item xs={1}>
                                    <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                        保留内存
                                    </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                        {detail.Reserved.MemoryMB} MB
                                    </Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                        保留磁盘
                                    </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                        {detail.Reserved.DiskMB} MB
                                    </Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                        可用CPU
                                    </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                        {detail.Resources.CPU} MHz
                                    </Typography>
                                </Grid>


                                <Grid item xs={1}>
                                    <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                        可用内存
                                    </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                        {detail.Resources.MemoryMB} MB
                                    </Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                        可用磁盘
                                    </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                        {detail.Resources.DiskMB} MB
                                    </Typography>
                                </Grid>
                            </Grid>


                        }

                    </TabContainer>}

                {/* {index === 1 && <TabContainer>


                    <div className={classes.logWrap}>
                        {detail.Events.map((e, eIndex) => (
                            <p className={classes.logContent} key={eIndex} >{e.Timestamp}: {e.Message}</p>
                        ))

                        }
                    </div>
                </TabContainer>}

                {index === 2 && <TabContainer>


                    {
                        history.Versions.map(version => (
                            <ExpansionPanel className={classes.contentItem} key={version.Version}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading + ' ' + classes.historyHeader}>版本-{version.Version}</Typography>
                                    <Typography className={classes.heading + ' ' + classes.historyHeader}>修改时间-{version.SubmitTime}</Typography>
                                    {
                                        (version.Version === detail.Version) && <Typography className={classes.heading + ' ' + classes.historyHeader} color="textSecondary">当前版本</Typography>
                                    }


                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <JSONInput
                                        width="100%"
                                        placeholder={version}
                                        locale={locale}
                                        viewOnly
                                    ></JSONInput>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))
                    }
                </TabContainer>} */}

            </Paper>
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