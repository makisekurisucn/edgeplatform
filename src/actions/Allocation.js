const getAllocationList = (dispatch) => {
    dispatch({
        type: 'ALLOCATION_GETALLOCATIONLIST_SAGA'
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


export { getAllocationList, getTaskLogs, getBothTaskLogs };