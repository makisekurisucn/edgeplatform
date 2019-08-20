const getJobList = (dispatch) => {
    dispatch({
        type: 'JOB_GETJOBLIST_SAGA'
    });
}
const createJob = (dispatch, job) => {
    dispatch({
        type: 'JOB_CREATE_SAGA',
        data: job
    });
}
const initCreateJob = (dispatch) => {
    dispatch({
        type: 'JOB_CREATE_INIT'
    });
}
const getJobDetail = (dispatch, id) => {
    dispatch({
        type: 'JOB_DETAIL_SAGA',
        data: id
    });
}
const resetStatus = (dispatch) => {
    dispatch({
        type: 'RESET_JOB_DETAIL'
    });
}
const stopJob = (dispatch, job) => {
    dispatch({
        type: 'JOB_EDIT_SAGA',
        data: job
    })
}
const startJob = (dispatch, job) => {
    dispatch({
        type: 'JOB_EDIT_SAGA',
        data: job
    })
}
const deleteJob = (dispatch, id) => {
    console.log('action delete')
    dispatch({
        type: 'JOB_DELETE_SAGA',
        data: id
    })
}
export {
    getJobList,
    createJob,
    initCreateJob,
    getJobDetail,
    resetStatus,
    stopJob,
    startJob,
    deleteJob
};