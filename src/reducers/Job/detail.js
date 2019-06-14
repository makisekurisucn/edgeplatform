const jobDetailProcess = (detail) => {
    let res = {
        Datacenters: detail.Datacenters,
        Name: detail.Name,
        Constraints: detail.Constraints,
        Priority: detail.Priority,
        Region: detail.Region,
        Status: detail.Status,
        SubmitTime: detail.SubmitTime,
        Type: detail.Type,
        Version: detail.Version,
        TaskGroups: []
    };
    detail.TaskGroups.forEach(function(tgroup) {
        let tg = {
            Count: tgroup.Count,
            EphemeralDisk: tgroup.EphemeralDisk,
            Name: tgroup.Name,
            Tasks: []
        };
        tgroup.Tasks.forEach(function(task) {
            let t = {
                Artifacts: task.Artifacts,
                Constraints: task.Constraints,
                Driver: task.Driver,
                Env: task.Env,
                Name: task.Name,
                ports: null,
                CPU: task.Resources && task.Resources.CPU,
                DiskMB: task.Resources && task.Resources.DiskMB,
                MemoryMB: task.Resources && task.Resources.MemoryMB,
                LogMaxFileSizeMB: task.LogConfig && task.LogConfig.MaxFileSizeMB,
                LogMaxFiles: task.LogConfig && task.LogConfig.MaxFiles
            };
            let port = {};
            // 提取各驱动下的各种config
            t.Config = task.Config;
            //  提取port 信息
            if (task.Config && task.Config.port_map) {
                // 提取驱动配置的所有端口
                task.Config.port_map.forEach(portItem => {
                    for (let key in portItem) {
                        port[key] = {
                            originPort: portItem[key]
                        };
                    }
                });
                // 映射宿主机暴露的端口
                if (task.Resources && task.Resources.Networks) {
                    task.Resources.Networks.forEach(nw => {
                        if (nw.DynamicPorts) {
                            nw.DynamicPorts.forEach(nwdp => {
                                if (port[nwdp.Label]) {
                                    port[nwdp.Label].DynamicPort = true;
                                }
                            });
                        }
                        if (nw.ReservedPorts) {
                            nw.ReservedPorts.forEach(nwrp => {
                                if (port[nwrp.Label]) {
                                    port[nwrp.Label].ReservedPort = nwrp.Value;
                                }
                            });
                        }
                    });
                }
                // 映射注册到服务发现的端口
                if (task.Services) {
                    task.Services.forEach(service => {
                        if (port[service.PortLabel]) {
                            port[service.PortLabel].service = {
                                Name: service.Name,
                                Tags: service.Tags,
                                AddressMode: service.AddressMode
                            };
                        }
                    });
                }

            }
            let pArray = [];
            for (let name in port) {
                port[name].name = name;
                pArray.push(port[name]);
            }
            t.ports = pArray;
            tg.Tasks.push(t);
        });
        res.TaskGroups.push(tg);
    });
    return res;
}

const jobStatusProcess = (allocInfo) => {
    console.log(allocInfo);
    let nodeInfo = {};
    let taskGroup = {};
    allocInfo.nodeList.forEach(node => {
        nodeInfo[node.ID] = {
            name: node.Name,
            address: node.Address,
            dc: node.Datacenter
        };
    });
    allocInfo.jobInfo.taskGroup.forEach(taskG => {
        taskGroup[taskG.name] = new Array(taskG.replica);
    });
    // 剔除过往事件
    allocInfo.status.forEach(status => {
        let tgName = status.TaskGroup;
        let index = parseInt(status.Name.split("[")[1].split("]")[0])
        if (taskGroup[tgName] && taskGroup[tgName][index]) {
            if (status.CreateTime > taskGroup[tgName][index].CreateTime) {
                taskGroup[tgName][index] = status;
            }
        } else if (taskGroup[tgName] && !taskGroup[tgName][index]) {
            taskGroup[tgName][index] = status;
        }
    });

    let statusIndex = {};
    console.log(taskGroup);

    // 重塑alloc 结构
    for (let tgname in taskGroup) {
        let newTG = {};
        statusIndex[tgname] = {};
        taskGroup[tgname].forEach((instance, index) => {
            let tasks = instance.TaskStates;
            for (let taskName in tasks) {
                if (index === 0) {
                    newTG[taskName] = [];
                    statusIndex[tgname][taskName] = 0;
                }
                let newTaskItem = {};
                newTaskItem = Object.assign(newTaskItem, tasks[taskName], instance);
                delete newTaskItem.TaskStates;
                // 整理日志
                let log = [];
                newTaskItem.Events.forEach(logItem => {
                    log.push({
                        time: logItem.Time,
                        message: logItem.DisplayMessage,
                        type: logItem.Type
                    });
                });
                // 倒叙日志
                log = log.reverse();
                newTaskItem.Events = log;
                newTG[taskName].push(newTaskItem);
            }
        });
        taskGroup[tgname] = newTG;
    }
    console.log({
        status: { taskGroup, nodeInfo },
        statusIndex: statusIndex
    });
    if (allocInfo.status.length === 0) {
        return {
            status: { nodeInfo },
            statusIndex: statusIndex
        }
    } else {
        return {
            status: { taskGroup, nodeInfo },
            statusIndex: statusIndex
        }
    }
}
const jobAllocationListProcess = (list) => {
    let listFilter = {};
    let allocationList = [];
    list.forEach(alloc => {
        if (listFilter[alloc.Name]) {
            if (alloc.CreateTime > listFilter[alloc.Name].CreateTime) {
                listFilter[alloc.Name] = alloc;
            }
        } else {
            listFilter[alloc.Name] = alloc;
        }
    })
    for (let name in listFilter) {
        allocationList.push(listFilter[name]);
    }
    return allocationList;
}
const initialState = {
    index: 0,
    detail: {},
    history: [],
    status: {},
    allocationList: []
};
const JobRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'JOB_UPDATE_JOBDETAIL':
            return Object.assign({}, state, { detail: jobDetailProcess(action.data.detail) });
        case 'JOB_UPDATE_JOBHISTORY':
            return Object.assign({}, state, { history: action.data.history });
        case 'JOB_UPDATE_JOBSTATUS':
            return Object.assign({}, state, jobStatusProcess(action.data));
        case 'RESET_JOB_DETAIL':
            return Object.assign({}, state, initialState);
        case 'JOB_UPDATE_ALLOCATIONLIST':
            return Object.assign({}, state, { allocationList: jobAllocationListProcess(action.data.allocationList) });
        default:
            return state;
    }
}
export default JobRedu;