import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../../components/Table';
import { formatTime } from '../../../utils/formatTime';
import Loading from '../../../components/Loading';
import SearchBox from '../../../components/SearchBox';
import { setRegion } from '../../../utils/handleRequest';
import Command from '../../../components/Select/CommandSet';
import Confirm from '../../../components/Dialog/Confirm';
import { stopAllocation, restartAllocation } from '../../../actions/Allocation';
import { startBlockingJobStatus, stopBlockingJobStatus, } from '../../../actions/Job';


const styles = theme => ({
    root: {
        // width: '100%',
        overflowX: 'auto',
        // padding: '20px 10px'
        padding: '30px',
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
    currentLabel: {
        color: '#609',
        cursor: 'default'
    },
    tableWrap: {
        padding: '12px 0px'
    },
    aboveTable: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 4px'
    },
    statusOverview: {
        display: 'flex',
        alignItems: 'flex-end',
        height: '30px',
        // lineHeight: '30px'
    },
    statusSign: {
        marginRight: '40px',
        '&:after': {
            content: '""',
            width: '10px',
            height: '10px',
            position: 'relative',
            top: '7px',
            float: 'left',
            display: 'inline-block',
            marginRight: '10px',
            borderRadius: '50%'
        }
    },
    statusRunning: {
        '&:after': {
            backgroundColor: '#4BAF7E',
        }
    },
    statusPending: {
        '&:after': {
            backgroundColor: '#AF954B',
        }
    },
    statusComplete: {
        '&:after': {
            backgroundColor: '#9a9999',
        }
    },
    searchWrap: {
        height: '36px',
        width: '256px',
        lineHeight: '36px',
        fontSize: '15px',
        fontWeight: '300',
        color: 'rgb(116, 116, 116)'
    },
    tableBody: {
        cursor: 'default'
    },
    headerName: {
        cursor: 'pointer'
    },
    headerNodeName: {
        cursor: 'pointer'
    },
    headerCommand: {
        width: '80px'
    },
    command: {
        position: 'relative',
        height: '34px',
        lineHeight: '34px',
        color: '#EEF9FF'
    },
    textOverflow: {
        overflow: 'hidden',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
});

const kvMap = {
    'running': '运行中',
    'complete': '已完成',
    'stop': '已停止',
    'pending': '启动中'
}

const getAllocationName = (prevName) => {
    if (typeof prevName === 'string') {
        const index = prevName.indexOf('.');
        return prevName.substr(index + 1);
    }
    return prevName;
}

class SimpleTable extends Component {
    constructor(props) {
        super(props);
        const { classes } = this.props;
        this.header = [
            {
                name: "名称",
                key: "Name",
                classes: classes.headerName
            }, {
                name: "状态",
                key: "ClientStatus"
            }, {
                name: "数据中心",
                key: "Datacenter"
            }, {
                name: "工作节点",
                key: "NodeName",
                classes: classes.headerNodeName
            }, {
                name: "创建时间",
                key: "CreateTime",
                type: "time"
            }, {
                name: "操作",
                key: "Operation",
                classes: classes.headerCommand
            }
        ];
        this.state = {
            inputValue: '',
            isSearched: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        let id = this.props.data.ID;
        startBlockingJobStatus(dispatch, id, '2m')
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        let id = this.props.data.ID;
        stopBlockingJobStatus(dispatch, id)
    }

    commandGen = (allocID) => {
        const { dispatch } = this.props;
        return {
            defaultCommand: {
                name: '停止',
                handleClick: () => {
                    stopAllocation(dispatch, allocID)
                }
            },
            commandList: [
                {
                    name: '重启',
                    handleClick: () => {
                        restartAllocation(dispatch, allocID);
                    }
                }
            ]
        };
    }

    handleSearch = (inputValue) => {
        if (inputValue === '') {
            this.setState({
                inputValue: '',
                isSearched: false,
            })
        } else {
            this.setState({
                inputValue: inputValue,
                isSearched: true,
            })
        }
    }
    itemClick = data => {
        if (data.key === 'Name') {
            if (this.props.switchComponent) {
                this.props.switchComponent({
                    isAllocListHidden: true,
                    extraData: data.item
                })
            }
        } else if (data.key === 'NodeName') {
            const region = data.item.region;
            const nodeID = data.item.nodeID;
            if (nodeID) {
                setRegion(region);
                window.location.href = `/#/console/node/worker/${nodeID}`;
            }
        }
    }

    render() {
        const { classes, data, loading, DCInfoMap, nodelist, allocationList } = this.props;
        // const { detail: jobDetail, allocationList } = data;
        const { detail: jobDetail } = data;
        // const allocationList = JSON.parse(JSON.stringify(data.allocationList));


        let runningAllocNumber = 0, completeAllocNumber = 0, pendingAllocNumber = 0

        let searchList = [];

        allocationList.forEach(alloc => {
            let DCInfo = {
                DC: "未知",
                address: "未知",
                arch: "未知",
                latitude: "未知",
                longitude: "未知",
                range: "未知",
                region: "未知"
            };

            let runningTasksNumber = 0;
            let pendingTaskNumber = 0;
            let deadTaskNumber = 0;
            let Datacenter = '';
            let NodeName = '';
            nodelist.forEach(node => {
                if (node.ID === alloc.NodeID) {
                    if (DCInfoMap[jobDetail.Region]) {
                        DCInfo = DCInfoMap[jobDetail.Region][node.Datacenter];
                    }
                    Datacenter = node.Datacenter;
                    NodeName = alloc.NodeName || node.Name;
                }
            })


            for (let task in alloc.TaskStates) {
                switch (alloc.TaskStates[task].State) {
                    case 'running':
                        runningTasksNumber++; break;
                    case 'pending':
                        pendingTaskNumber++; break;
                    case 'dead':
                        deadTaskNumber++; break;
                    default:
                        console.log('非预期的状态');
                        console.log(alloc.TaskStates[task].State);
                }
            }
            const CreateTime = alloc.CreateTime;
            // const Name = getAllocationName(alloc.Name);
            const Name = getAllocationName(alloc.Name);
            const location = `${DCInfo.DC} - ${DCInfo.region}`;
            const ClientStatus = alloc.ClientStatus;
            switch (ClientStatus) {
                case 'running':
                    runningAllocNumber++;
                    break;
                case 'complete':
                    completeAllocNumber++;
                    break;
                case 'pending':
                    pendingAllocNumber++;
                    break;
                default:
                    break;
            }
            const { defaultCommand, commandList } = this.commandGen(alloc.ID);
            const itemData = {
                Name,
                ID: alloc.ID,
                DCInfo,
                CreateTime,
                ClientStatus,
                NodeName,
                Operation: <Command className={classes.command} defaultCommand={defaultCommand} commandList={commandList} />,
                runningTasksNumber,
                pendingTaskNumber,
                deadTaskNumber,
                location,
                nodeID: alloc.NodeID,
                Datacenter,
                region: jobDetail.Region
            }

            if (this.state.isSearched === true) {
                let searchInfo = {
                    Name,
                    date: formatTime(CreateTime),
                    status: kvMap[ClientStatus] || ClientStatus,
                    NodeName,
                    Datacenter
                }
                let isMatched = false;
                for (let key in searchInfo) {
                    if (searchInfo[key].indexOf(this.state.inputValue) > -1) {
                        isMatched = true;
                    }
                }
                if (isMatched === true) {
                    searchList.push(itemData);
                }
            } else {
                searchList.push(itemData);
            }
        })

        return (
            <div className={classes.root}>
                {/* 面包屑 */}
                <div className={classes.breadcrumb}>
                    <div className={classes.currentLabel}>实例列表</div>
                </div>
                {/* 面包屑 */}
                <div className={classes.aboveTable}>
                    <div className={classes.statusOverview}>
                        <div className={classes.statusSign + ' ' + classes.statusRunning}>运行中 {runningAllocNumber}</div>
                        <div className={classes.statusSign + ' ' + classes.statusPending}>启动中 {pendingAllocNumber}</div>
                        <div className={classes.statusSign + ' ' + classes.statusComplete}>已完成 {completeAllocNumber}</div>
                    </div>
                    <SearchBox className={classes.searchWrap} onSearch={this.handleSearch} />
                </div>

                {/* <Loading loading={loading}> */}
                <div className={classes.tableWrap}>
                    <Table header={this.header} list={searchList} onItemClick={this.itemClick} className={classes.tableBody} />
                </div>
                {/* </Loading> */}
            </div>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        allocationList: state.jobdetail.allocationList
    };
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));