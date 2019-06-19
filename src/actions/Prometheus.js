const getCPUUtilization = (dispatch, nodeID, DC, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETCPUUTILIZATION_SAGA',
        nodeID,
        DC,
        duration
    });
}

const getDiskUtilization = (dispatch, nodeID, DC, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETDISKUTILIZATION_SAGA',
        nodeID,
        DC,
        duration
    });
}

const getMemoryUtilization = (dispatch, nodeID, DC, duration) => {
    dispatch({
        type: 'PROMETHEUS_GETMEMORYUTILIZATION_SAGA',
        nodeID,
        DC,
        duration
    });
}

const getPrometheus = (dispatch, nodeID, DC, duration) => {
    getCPUUtilization(dispatch, nodeID, DC, duration);
    getDiskUtilization(dispatch, nodeID, DC, duration);
    getMemoryUtilization(dispatch, nodeID, DC, duration);
}



export { getCPUUtilization, getDiskUtilization, getMemoryUtilization, getPrometheus };