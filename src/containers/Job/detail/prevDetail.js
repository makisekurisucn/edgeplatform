import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getJobDetail, resetStatus } from '../../../actions/Job';
import { blueGrey, lightGreen, amber, lightBlue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/zh-cn';
import moment from 'moment';
import {formatTime} from '../../../utils/formatTime';
import AppMainUpper from '../../../components/AppMainUpper'

import Typography from '@material-ui/core/Typography';
import { GridList } from '@material-ui/core';

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


// import { isAbsolute } from 'path';

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
    }
});
class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }
    componentDidMount() {

        const { dispatch } = this.props;
        resetStatus(dispatch);
        let id = this.props.match.params.id;
        getJobDetail(dispatch, id);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.statusIndex) {
            this.setState({
                statusIndex: nextProps.statusIndex
            });
        }

    }
    handleChange = (event, index) => {
        this.setState({
            index: index
        });
    }
    handleSwitchInstance = (params) => (e) => {

        let statusIndex = this.state.statusIndex;
        statusIndex[params.taskGroup][params.task] = params.index;
        this.setState({
            statusIndex: statusIndex
        });
        // alert(params);
    }
    render() {
        const { classes, match, detail, history, status } = this.props;
        console.log(status);
        const { taskGroup, nodeInfo } = status;
        const { index, statusIndex } = this.state;
        return (
            <Paper className={classes.root}>
                <AppMainUpper type='job_detail' />
                <Typography component="div">
                    <Grid container className={classes.headerContainer} alignItems="center">
                        <Grid className={classes.headerTtile}>{match.params.id}</Grid>
                        <Grid className={`${classes.headerStatus} ${detail.Status == "running" ? classes.statusGreen : null} ${detail.Status == "pending" ? classes.statusYellow : null}`}>{detail.Status}</Grid>

                    </Grid>
                </Typography>
                <AppBar position="static">
                    <Tabs value={index} onChange={this.handleChange}>
                        <Tab label="配置" />
                        <Tab label="状态" />
                        <Tab label="版本历史" />
                    </Tabs>
                </AppBar>
                {/* 基本信息 */}
                {index === 0 &&
                    <TabContainer>
                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    类型
              </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Type}
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    更改时间
              </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {formatTime(detail.SubmitTime)}
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    Region
              </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Region}
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
                                    {detail.Datacenters}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
            <Grid item xs={3}>
              <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
              调度优先级
              </Typography> 
            </Grid>
            <Grid item xs={9}>
              <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
              {detail.Priority}
              </Typography> 
            </Grid>
          </Grid>  */}
                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={1}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    当前版本
              </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                    {detail.Version}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.contentDivider} />
                        <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                            <Grid item xs={3}>
                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                    任务组
              </Typography>
                            </Grid>
                        </Grid>
                        {
                            detail.TaskGroups && detail.TaskGroups.map((taskGroupItem,taskGroupItemIndex) => (
                                <ExpansionPanel defaultExpanded className={classes.taskGroupWrap} key={taskGroupItemIndex}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.bold + ' ' + classes.large + ' ' + classes.groupName}>任务组

 --- {taskGroupItem.Name}</Typography>
                                    </ExpansionPanelSummary>
                                    <Divider />

                                    <ExpansionPanelDetails>

                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container justify="flex-start" alignItems="center" className={classes.contentItem}>
                                                    <Grid item xs={2}>
                                                        <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                                            实例数
                      </Typography>
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                            {taskGroupItem.Count}
                                                        </Typography>
                                                    </Grid>

                                                    {
                                                        taskGroupItem.EphemeralDisk ? (
                                                            <Grid item xs={2}>
                                                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                                                    卷
                          </Typography>
                                                            </Grid>
                                                        ) : null
                                                    }
                                                    {
                                                        taskGroupItem.EphemeralDisk ? (
                                                            <Grid item xs={10}>
                                                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                    {taskGroupItem.EphemeralDisk.SizeMB}MB (EphemeralDisk)
                        </Typography>
                                                            </Grid>
                                                        ) : null
                                                    }
                                                </Grid>
                                                {
                                                    taskGroupItem.Tasks.map((taskItem,taskItemIndex) => (
                                                        <Grid container className={classes.taskItem} alignItems="center" key={taskItemIndex} >
                                                            <Grid item xs={2}>
                                                                <Typography gutterBottom color="textPrimary" variant="subtitle1" className={classes.contentHeader}>
                                                                    任务-{taskItem.Name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={10} >
                                                                {taskGroup && (
                                                                    <div className={classes.statusList}>
                                                                        {
                                                                            taskGroup[taskGroupItem.Name] && taskGroup[taskGroupItem.Name][taskItem.Name].map((item, index) => {
                                                                                let className = " ";
                                                                                if (statusIndex && statusIndex[taskGroupItem.Name] && statusIndex[taskGroupItem.Name][taskItem.Name] == index) {
                                                                                    className += classes.statusSelected;
                                                                                }
                                                                                if (item.State === "running") {
                                                                                    className = classes.statusGreen;
                                                                                }

                                                                                return <span className={classes.statusItem + " " + classes.statusGrey + " " + className} onClick={this.handleSwitchInstance({ taskGroup: taskGroupItem.Name, task: taskItem.Name, index: index })} key={index+1}>{index + 1}</span>
                                                                            })}
                                                                    </div>
                                                                )
                                                                }
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <Divider className={classes.headerUnderline} />
                                                            </Grid>
                                                            <Grid container>
                                                                <Grid item xs={4} container>




                                                                    <Grid item xs={3} className={classes.taskItemName}>
                                                                        <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                            运行时驱动
                              </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={9}>
                                                                        <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                            {taskItem.Driver}
                                                                        </Typography>
                                                                    </Grid>
                                                                    {/* 镜像 */}
                                                                    {
                                                                        taskItem.Config && taskItem.Config.image && (
                                                                            <Grid item xs={3} className={classes.taskItemName}>
                                                                                <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                    镜像
                                  </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    {
                                                                        taskItem.Config && taskItem.Config.image && (
                                                                            <Grid item xs={9}>
                                                                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                    {taskItem.Config.image}
                                                                                </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    {/* CPU */}
                                                                    {
                                                                        taskItem.CPU && (
                                                                            <Grid item xs={3} className={classes.taskItemName}>
                                                                                <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                    CPU
                                  </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    {
                                                                        taskItem.CPU && (
                                                                            <Grid item xs={9}>
                                                                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                    {taskItem.CPU} MHz
                                  </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    {/* 内存 */}
                                                                    {
                                                                        taskItem.MemoryMB && (
                                                                            <Grid item xs={3} className={classes.taskItemName}>
                                                                                <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                    内存
                                  </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    {
                                                                        taskItem.MemoryMB && (
                                                                            <Grid item xs={9}>
                                                                                <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                    {taskItem.MemoryMB} MB
                                  </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    {/* 端口 */}
                                                                    {
                                                                        taskItem.ports.length && (
                                                                            <Grid item xs={3} className={classes.taskItemName}>
                                                                                <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                    端口
                                  </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    {
                                                                        taskItem.ports.length && (
                                                                            <Grid item xs={9}>
                                                                                {
                                                                                    taskItem.ports.map((p,pIndex) => (
                                                                                        <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody} key={pIndex} >
                                                                                            {p.name}:{p.originPort} ----> {p.DynamicPort ? '动态宿主机映射' : null}{p.ReservedPort}  {p.service ? '---- 注册为' + p.service.Name : null}
                                                                                        </Typography>
                                                                                    ))
                                                                                }

                                                                            </Grid>
                                                                        )
                                                                    }


                                                                    {/* 环境变量 */}
                                                                    {taskItem.Env && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                环境变量
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.Env && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {
                                                                                    Object.keys(taskItem.Env).map((key, index) => (
                                                                                        <span key={index}>
                                                                                            {key}={taskItem.Env[key]}{index < (Object.keys(taskItem.Env).length - 1) ? ',' : null}
                                                                                        </span>
                                                                                    ))

                                                                                }
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}



                                                                    {/* 启动命令 */}
                                                                    {taskItem.Config && taskItem.Config.command && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                启动命令
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.Config && taskItem.Config.command && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {taskItem.Config.command}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}

                                                                    {/* 启动参数 */}
                                                                    {taskItem.Config && taskItem.Config.args && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                启动参数
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.Config && taskItem.Config.args && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {taskItem.Config.args.join(' ')}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}

                                                                    {/* 网络模式 */}
                                                                    {taskItem.Config && taskItem.Config.network_mode && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                网络模式
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.Config && taskItem.Config.network_mode && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {taskItem.Config.network_mode}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}

                                                                    {/* 虚拟机镜像路径 */}
                                                                    {taskItem.Config && taskItem.Config.image_path && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                虚拟机镜像路径
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.Config && taskItem.Config.image_path && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {taskItem.Config.image_path}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}


                                                                    {/* 加速器 */}
                                                                    {taskItem.Config && taskItem.Config.accelerator && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                加速器
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.Config && taskItem.Config.accelerator && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {taskItem.Config.accelerator}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}

                                                                    {/* 日志文件 */}
                                                                    {taskItem.LogMaxFileSizeMB && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                日志文件分割大小
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.LogMaxFileSizeMB && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {taskItem.LogMaxFileSizeMB}MB
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {/* 日志文件数量 */}
                                                                    {taskItem.LogMaxFiles && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                日志文件最大数量
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {taskItem.LogMaxFiles && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {taskItem.LogMaxFiles}个
                                </Typography>
                                                                        </Grid>
                                                                    )}


                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                实例状态
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {status.taskGroup[taskGroupItem.Name][taskItem.Name][statusIndex[taskGroupItem.Name][taskItem.Name]].State}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}

                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                所属节点
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && nodeInfo && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {nodeInfo[status.taskGroup[taskGroupItem.Name][taskItem.Name][statusIndex[taskGroupItem.Name][taskItem.Name]].NodeID].name}({nodeInfo[status.taskGroup[taskGroupItem.Name][taskItem.Name][statusIndex[taskGroupItem.Name][taskItem.Name]].NodeID].address})
                                </Typography>
                                                                        </Grid>
                                                                    )}


                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                实例创建时间
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {status.taskGroup[taskGroupItem.Name][taskItem.Name][statusIndex[taskGroupItem.Name][taskItem.Name]].CreateTime}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}

                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && (
                                                                        <Grid item xs={3} className={classes.taskItemName}>
                                                                            <Typography gutterBottom color="textPrimary" variant="subtitle2" className={classes.contentHeader}>
                                                                                实例重启次数
                                </Typography>
                                                                        </Grid>
                                                                    )}
                                                                    {statusIndex && status.taskGroup && statusIndex[taskGroupItem.Name] && (
                                                                        <Grid item xs={9}>
                                                                            <Typography color="textSecondary" variant="subtitle2" className={classes.contentBody}>
                                                                                {status.taskGroup[taskGroupItem.Name][taskItem.Name][statusIndex[taskGroupItem.Name][taskItem.Name]].Restarts}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}






                                                                </Grid>
                                                                <Grid item xs={8}>
                                                                    {statusIndex && status.taskGroup && (
                                                                        <div className={classes.logWrap}>
                                                                            {status.taskGroup[taskGroupItem.Name][taskItem.Name][statusIndex[taskGroupItem.Name][taskItem.Name]].Events.map((e,eIndex) => (
                                                                                <p className={classes.logContent} key={eIndex} >{e.time}: {e.message}</p>
                                                                            ))

                                                                            }
                                                                        </div>
                                                                    )

                                                                    }

                                                                </Grid>

                                                            </Grid>










                                                        </Grid>





                                                    ))
                                                }



                                            </Grid>
                                            {/* <Grid item xs={8}></Grid> */}

                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            ))}
                    </TabContainer>}

                {index === 1 && <TabContainer>Item Three</TabContainer>}

                {index === 2 && <TabContainer>


                    {
                        history.Versions.map((version,versionIndex) => (
                            <ExpansionPanel className={classes.contentItem} key={versionIndex}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading + ' ' + classes.historyHeader}>版本-{version.Version}</Typography>
                                    <Typography className={classes.heading + ' ' + classes.historyHeader}>修改时间-{formatTime(version.SubmitTime)}</Typography>
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

                </TabContainer>}
            </Paper>
        );
    }
}
JobDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {

    return state.jobdetail;
}

export default connect(mapStateToProps)(withStyles(styles)(JobDetail));