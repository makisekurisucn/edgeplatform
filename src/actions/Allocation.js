const getAllocationList = (dispatch) => {
    dispatch({
        type: 'ALLOCATION_GETALLOCATIONLIST_SAGA'
    });
}

const getAllocationDetail = (dispatch, id) => {
    dispatch({
        type: 'ALLOCATION_GETALLOCATIONDETAIL_SAGA',
        id: id
    });
}

const getTaskLogs = (dispatch, id, params) => {
    dispatch({
        type: 'ALLOCATION_GETTASKLOGS_SAGA',
        id: id,
        params: params
    })
}

const getBothTaskLogs = (dispatch, id, params) => {
    dispatch({
        type: 'ALLOCATION_GETBOTHTASKLOGS_SAGA',
        id: id,
        params: params
    })
}

const stopAllocation = (dispatch, id) => {
    dispatch({
        type: 'ALLOCATION_STOPALLOCATION_SAGA',
        id: id
    })
}

const restartAllocation = (dispatch, id) => {
    dispatch({
        type: 'ALLOCATION_RESTARTALLOCATION_SAGA',
        id: id
    })
}


export { getAllocationList, getAllocationDetail, getTaskLogs, getBothTaskLogs, stopAllocation, restartAllocation };