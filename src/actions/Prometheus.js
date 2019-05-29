const getCPUUtilization = (dispatch, nodeID, DC) => {
    dispatch({
        type: 'PROMETHEUS_GETCPUUTILIZATION_SAGA',
        nodeID,
        DC
    });
}

const getDiskUtilization = (dispatch, nodeID, DC) => {
    dispatch({
        type: 'PROMETHEUS_GETDISKUTILIZATION_SAGA',
        nodeID,
        DC
    });
}

const getMemoryUtilization = (dispatch, nodeID, DC) => {
    dispatch({
        type: 'PROMETHEUS_GETMEMORYUTILIZATION_SAGA',
        nodeID,
        DC
    });
}

const getPrometheus = (dispatch, nodeID, DC) => {
    getCPUUtilization(dispatch, nodeID, DC);
    getDiskUtilization(dispatch, nodeID, DC);
    getMemoryUtilization(dispatch, nodeID, DC);
}



export { getCPUUtilization, getDiskUtilization, getMemoryUtilization, getPrometheus };