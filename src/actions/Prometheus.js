const getNodeCPUUtilization = (dispatch, nodeID, DC, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETNODECPUUTILIZATION_SAGA',
        nodeID,
        DC,
        duration
    });
}

const getNodeDiskUtilization = (dispatch, nodeID, DC, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETNODEDISKUTILIZATION_SAGA',
        nodeID,
        DC,
        duration
    });
}

const getNodeMemoryUtilization = (dispatch, nodeID, DC, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETNODEMEMORYUTILIZATION_SAGA',
        nodeID,
        DC,
        duration
    });
}

const getTaskCPUUtilization = (dispatch, allocID, taskName, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETTASKCPUUTILIZATION_SAGA',
        allocID,
        taskName,
        duration
    });
}

const getTaskMemoryUtilization = (dispatch, allocID, taskName, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETTASKMEMORYUTILIZATION_SAGA',
        allocID,
        taskName,
        duration
    });
}

const getNodePrometheus = (dispatch, nodeID, DC, duration) => {
    getNodeCPUUtilization(dispatch, nodeID, DC, duration);
    getNodeDiskUtilization(dispatch, nodeID, DC, duration);
    getNodeMemoryUtilization(dispatch, nodeID, DC, duration);
}

const getTaskPrometheus = (dispatch, allocID, taskName, duration) => {
    getTaskCPUUtilization(dispatch, allocID, taskName, duration);
    getTaskMemoryUtilization(dispatch, allocID, taskName, duration);
}

const getNodeResources = (dispatch, nodeID, DC, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETNODERESOURCES_SAGA',
        nodeID,
        DC,
        duration
    });
}

const resetNodeResources = (dispatch) => {
    dispatch({
        type: 'PROMETHEUS_RESET_NODERESOURCES'
    });
}



export {
    getNodeCPUUtilization,
    getNodeDiskUtilization,
    getNodeMemoryUtilization,
    getNodePrometheus,
    getTaskCPUUtilization,
    getTaskMemoryUtilization,
    getTaskPrometheus,
    getNodeResources,
    resetNodeResources
};