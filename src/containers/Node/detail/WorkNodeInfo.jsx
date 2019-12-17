import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KvItem from '../../../components/KvItem';
import { getNodeResources, resetNodeResources } from '../../../actions/Prometheus';
import java from '../../../assets/img/java.png'
import docker from '../../../assets/img/docker-logo.png'
import exec from '../../../assets/img/exec.png'
import qemu from '../../../assets/img/qemu.png'
import rkt from '../../../assets/img/rkt.png'
import raw_exec from '../../../assets/img/raw-exec.png'


const runtimeList = [
    { name: "docker", display: 'Docker', src: docker, width: '81', height: '67' },
    { name: "qemu", display: 'Qemu', src: qemu, width: '68', height: '68' },
    { name: "exec", display: 'Exec', src: exec, width: '83', height: '83' },
    { name: "raw_exec", display: 'Raw Exec', src: raw_exec, width: '79', height: '79' },
    { name: "rkt", display: 'rkt', src: rkt, width: '81', height: '32' },
    { name: "java", display: 'Java', src: java, width: '45', height: '65' },
];

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
    runtimeArea: {
        display: 'flex',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(68,105,128,0.02)',
        padding: '32px 0px 35px',
        marginBottom: '35px'
    },
    img: {
        width: '85px',
        height: '85px',
        lineHeight: '85px',
        // backgroundColor: 'burlywood',
        textAlign: 'center'
    },
    imgText: {
        fontSize: '14px',
        fontWeight: 400,
        color: 'rgb(1, 101, 61)',
        textAlign: 'center',
        whiteSpace: 'pre-line'
    },
    notDetectedColor: {
        color: 'rgb(150, 150, 150)'
    },
    notDetectedIconColor: {
        filter: 'grayscale(100%)'
    },
    resourcesArea: {
        backgroundColor: 'rgba(68,105,128,0.02)',
        padding: '14px',
        marginBottom: '35px'
    },
    resource: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '26px',
        marginBottom: '14px',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    icon: {
        fontSize: '69px',
        color: 'rgb(68, 68, 68)',
        marginBottom: '9px'
    },
    iconText: {
        fontSize: '14px',
        fontWeight: 400,
        color: 'rgb(78, 78, 78)',
        textAlign: 'center',
        whiteSpace: 'pre-line'
    },
    totalBar: {
        display: 'flex',
        width: '605px',
        height: '30px',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: 'rgb(216, 216, 216)',
        margin: '31px 0px'
    },
    reservedBar: {
        width: 'calc(30%)',
        height: '30px',
        backgroundColor: 'rgb(79, 222, 190)'
    },
    allocatedBar: {
        width: 'calc(30%)',
        height: '30px',
        backgroundColor: 'rgb(95, 162, 241)'
    },
    unallocatedBar: {
        width: 'calc(30%)',
        height: '30px',
        backgroundColor: 'rgb(216, 216, 216)'
    },
    legendsArea: {
        display: 'flex',
        justifyContent: 'start',
        fontSize: '12px',
        fontWeight: 400,
        color: 'rgb(78, 78, 78)'
    },
    legend: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px 6px'
    },
    reservedSquare: {
        width: '16PX',
        height: '15px',
        borderRadius: '4px',
        backgroundColor: 'rgb(79, 222, 190)',
        margin: '0px 5px'
    },
    allocatedSquare: {
        width: '16PX',
        height: '15px',
        borderRadius: '4px',
        backgroundColor: 'rgb(95, 162, 241)',
        margin: '0px 5px'
    },
    unallocatedSquare: {
        width: '16PX',
        height: '15px',
        borderRadius: '4px',
        backgroundColor: 'rgb(216, 216, 216)',
        margin: '0px 5px'
    },
    kvItem: {
        marginBottom: 30,
        paddingLeft: '24px'
    },
    leftContent: {
        flex: '0 0 auto',
        minWidth: '400px',
        maxWidth: '520px',
        // width: '27%',
        marginRight: '35px'
    },
    rightContent: {
        // flex: 'auto',
        minWidth: '792px',
        maxWidth: '792px',
        // width: '27%',
        marginRight: '35px'
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
});

class WorkNodeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const { dispatch, data } = this.props;
        resetNodeResources(dispatch);
        if (data && data.ID) {
            const { dispatch, data } = this.props;
            const { ID, Datacenter } = data;
            getNodeResources(dispatch, ID, Datacenter)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.ID !== this.props.data.ID) {
            const { dispatch, data } = nextProps;
            const { ID, Datacenter } = data;
            getNodeResources(dispatch, ID, Datacenter)
        }
    }


    selectTask = (index) => [
        this.setState({
            selectedTaskIndex: index
        })
    ]

    render() {
        const { classes, className, data: detail, nodeResources } = this.props;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        const style = {
            keyName: {
                fontSize: '16px',
                fontWeight: '400',
                marginBottom: '3px'
            },
            value: {
                // paddingLeft: '8px',
                fontSize: '14px',
                fontWeight: '300',
                whiteSpace: 'pre-line',
                wordBreak: 'break-all'
            }
        }

        const resourcesData = {
            CPU: {
                total: detail.Resources && detail.Resources.CPU,
                reserved: detail.Reserved && detail.Reserved.CPU,
                allocated: nodeResources.allocatedCPU,
                unallocated: nodeResources.unallocatedCPU,
            },
            Disk: {
                total: detail.Resources && detail.Resources.DiskMB,
                reserved: detail.Reserved && detail.Reserved.DiskMB,
                allocated: nodeResources.allocatedDisk,
                unallocated: nodeResources.unallocatedDisk
            },
            Memory: {
                total: detail.Resources && detail.Resources.MemoryMB,
                reserved: detail.Reserved && detail.Reserved.MemoryMB,
                allocated: nodeResources.allocatedMemory,
                unallocated: nodeResources.unallocatedMemory
            }
        }

        const barWidth = {
            CPU: {
                reserved: resourcesData.CPU.reserved / resourcesData.CPU.total,
                allocated: resourcesData.CPU.allocated / resourcesData.CPU.total,
                unallocated: resourcesData.CPU.unallocated / resourcesData.CPU.total
            },
            Disk: {
                reserved: resourcesData.Disk.reserved / resourcesData.Disk.total,
                allocated: resourcesData.Disk.allocated / resourcesData.Disk.total,
                unallocated: resourcesData.Disk.unallocated / resourcesData.Disk.total
            },
            Memory: {
                reserved: resourcesData.Memory.reserved / resourcesData.Memory.total,
                allocated: resourcesData.Memory.allocated / resourcesData.Memory.total,
                unallocated: resourcesData.Memory.unallocated / resourcesData.Memory.total
            }
        }

        return (
            <div>
                {detail.Attributes &&
                    <div className={classNameWrap}>
                        <div className={classes.leftContent}>
                            <div className={classes.aboveContent}>
                                <div className={classes.subTitle}>节点信息</div>
                                <div className={classes.kvContent}>
                                    <KvItem keyName="工作节点" className={classes.kvItem} value={'工作节点'} style={style} />
                                    <KvItem keyName="数据中心" className={classes.kvItem} value={detail.Datacenter} style={style} />
                                    <KvItem keyName="主机名" className={classes.kvItem} value={detail.Attributes["unique.hostname"]} style={style} />
                                    <KvItem keyName="处理器架构" className={classes.kvItem} value={detail.Attributes["cpu.arch"]} style={style} />
                                    <KvItem keyName="处理器频率" className={classes.kvItem} value={detail.Attributes["cpu.frequency"] + 'MHz'} style={style} />
                                    <KvItem keyName="处理器型号" className={classes.kvItem} value={detail.Attributes["cpu.modelname"]} style={style} />
                                    <KvItem keyName="处理器核数" className={classes.kvItem} value={detail.Attributes["cpu.numcores"]} style={style} />
                                    <KvItem keyName="操作系统" className={classes.kvItem} value={detail.Attributes["os.name"]} style={style} />
                                    <KvItem keyName="系统版本" className={classes.kvItem} value={detail.Attributes["os.version"]} style={style} />
                                    <KvItem keyName="内核版本" className={classes.kvItem} value={detail.Attributes["kernel.version"]} style={style} />
                                </div>
                            </div>
                        </div>
                        <div className={classes.rightContent}>
                            <div className={classes.aboveContent}>
                                <div className={classes.subTitle}>运行环境</div>
                                <div className={classes.runtimeArea}>
                                    {/* <div>
                                        <img src={docker} width="81" height="67" /></div>
                                    <div>
                                        {`Docker\n${}`}
                                    </div> */}
                                    {
                                        runtimeList.map((runtime) => {
                                            const isDetected = detail.Drivers[runtime.name] && detail.Drivers[runtime.name].Detected;
                                            return (
                                                <div key={runtime.name}>
                                                    <div className={isDetected ? classes.img : (classes.img + ' ' + classes.notDetectedIconColor)}>
                                                        <img src={runtime.src} alt={runtime.display} width={runtime.width} height={runtime.height} />
                                                    </div>
                                                    <div className={isDetected ? classes.imgText : (classes.imgText + ' ' + classes.notDetectedColor)}>
                                                        {
                                                            `${runtime.display}\n${isDetected ? "可用" : "不可用"}`
                                                        }
                                                    </div>
                                                    {/* <p className={detail.Drivers[runtime.name] && detail.Drivers[runtime.name].Detected ? (classes.execnames + ' ' + classes.execnamesOn) : classes.execnames}>
                                                    {runtime.name}
                                                    <br />
                                                    {detail.Drivers[runtime] && detail.Drivers[runtime.name].Detected ? "可用" : "不可用"}
                                                </p> */}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={classes.belowContent}>
                                <div className={classes.subTitle}>资源</div>
                                <div className={classes.resourcesArea}>
                                    <div className={classes.resource}>
                                        <div>
                                            <div className={'icon-cpu ' + classes.icon}></div>
                                            <div className={classes.iconText}>
                                                {
                                                    `CPU\n${resourcesData.CPU.total}MHz`
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {/* <div>{`${resourcesData.CPU.unallocated} MHz 可用`}</div> */}
                                            <div className={classes.totalBar}>
                                                <div className={classes.reservedBar} style={{ width: `calc(${barWidth.CPU.reserved}*100%)` }}></div>
                                                <div className={classes.allocatedBar} style={{ width: `calc(${barWidth.CPU.allocated}*100%)` }}></div>
                                                <div className={classes.unallocatedBar} style={{ width: `calc(${barWidth.CPU.unallocated}*100%)` }}></div>
                                            </div>
                                            <div className={classes.legendsArea}>
                                                <div className={classes.legend}>
                                                    <div className={classes.reservedSquare}></div>
                                                    <div>{`系统保留 ${resourcesData.CPU.reserved}MHz`}</div>
                                                </div>
                                                <div className={classes.legend}>
                                                    <div className={classes.allocatedSquare}></div>
                                                    <div>{`已分配 ${resourcesData.CPU.allocated}MHz`}</div>
                                                </div>
                                                <div className={classes.legend}>
                                                    <div className={classes.unallocatedSquare}></div>
                                                    <div>{`可用 ${resourcesData.CPU.unallocated}MHz`}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.resource}>
                                        <div>
                                            <div className={'icon-microchip ' + classes.icon}></div>
                                            <div className={classes.iconText}>
                                                {
                                                    `内存\n${detail.Resources && detail.Resources.MemoryMB}MB`
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {/* <div>{`${nodeResources.unallocatedMemory} MB 可用`}</div> */}
                                            <div className={classes.totalBar}>
                                                <div className={classes.reservedBar} style={{ width: `calc(${barWidth.Memory.reserved}*100%)` }}></div>
                                                <div className={classes.allocatedBar} style={{ width: `calc(${barWidth.Memory.allocated}*100%)` }}></div>
                                                <div className={classes.unallocatedBar} style={{ width: `calc(${barWidth.Memory.unallocated}*100%)` }}></div>
                                            </div>
                                            <div className={classes.legendsArea}>
                                                <div className={classes.legend}>
                                                    <div className={classes.reservedSquare}></div>
                                                    <div>{`系统保留 ${detail.Reserved && detail.Reserved.MemoryMB}MB`}</div>
                                                </div>
                                                <div className={classes.legend}>
                                                    <div className={classes.allocatedSquare}></div>
                                                    <div>{`已分配 ${nodeResources.allocatedMemory}MB`}</div>
                                                </div>
                                                <div className={classes.legend}>
                                                    <div className={classes.unallocatedSquare}></div>
                                                    <div>{`可用 ${nodeResources.unallocatedMemory}MB`}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.resource}>
                                        <div>
                                            <div className={'icon-hard-disk ' + classes.icon}></div>
                                            <div className={classes.iconText}>
                                                {
                                                    `磁盘\n${detail.Resources && detail.Resources.DiskMB}MB`
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {/* <div>{`${nodeResources.unallocatedDisk} MB 可用`}</div> */}
                                            <div className={classes.totalBar}>
                                                <div className={classes.reservedBar} style={{ width: `calc(${barWidth.Disk.reserved}*100%)` }}></div>
                                                <div className={classes.allocatedBar} style={{ width: `calc(${barWidth.Disk.allocated}*100%)` }}></div>
                                                <div className={classes.unallocatedBar} style={{ width: `calc(${barWidth.Disk.unallocated}*100%)` }}></div>
                                            </div>
                                            <div className={classes.legendsArea}>
                                                <div className={classes.legend}>
                                                    <div className={classes.reservedSquare}></div>
                                                    <div>{`系统保留 ${detail.Reserved && detail.Reserved.DiskMB}MB`}</div>
                                                </div>
                                                <div className={classes.legend}>
                                                    <div className={classes.allocatedSquare}></div>
                                                    <div>{`已分配 ${nodeResources.allocatedDisk}MB`}</div>
                                                </div>
                                                <div className={classes.legend}>
                                                    <div className={classes.unallocatedSquare}></div>
                                                    <div>{`可用 ${nodeResources.unallocatedDisk}MB`}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* <div className={classes.subTitle}>
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
                                    <div className={classes.icons + '' + { paddingTop: '20px' }}>
                                        <img src={rkt} width="81" height="32" /></div>
                                    <div className={classes.icons}>
                                        <img src={java} width="45" height="65" /></div>
                                </div>
                                <div className={classes.execnamediv}>
                                    {
                                        runtimeList.map((runtime) => (
                                            <div>
                                                <div className={classes.icons}>
                                                    <img src={runtime.icons} width={runtime.width} height={runtime.height} />
                                                </div>
                                                <div className={detail.Drivers[runtime.name] && detail.Drivers[runtime.name].Detected ? (classes.execnames + ' ' + classes.execnamesOn) : classes.execnames}>
                                                        {
                                                            `${runtime.display}\n${detail.Drivers[runtime.name] && detail.Drivers[runtime.name].Detected ? "可用" : "不可用"}`
                                                        }
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className={classes.belowContent}>
                                <div className={classes.subTitle}>资源</div>
                            </div> */}
                    </div>
                }
            </div>


        );
    }
}
WorkNodeInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return { nodeResources: state.Prometheus.nodeResources };
}
export default connect(mapStateToProps)(withStyles(styles)(WorkNodeInfo));