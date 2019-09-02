const getJobList = (dispatch) => {
    dispatch({
        type: 'JOB_GETJOBLIST_SAGA'
    });
}
const startBlockingJobList = (dispatch, wait) => {
    dispatch({
        type: 'JOB_BLOcKINGJOBLIST_SAGA',
        command: 'start',
        wait
    });
}
const stopBlockingJobList = (dispatch) => {
    dispatch({
        type: 'JOB_BLOcKINGJOBLIST_SAGA',
        command: 'stop'
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
const startBlockingJobDetail = (dispatch, id, wait) => {
    dispatch({
        type: 'JOB_BLOcKINGJOBDETAIL_SAGA',
        data: id,
        command: 'start',
        wait
    });
}
const stopBlockingJobDetail = (dispatch, id) => {
    dispatch({
        type: 'JOB_BLOcKINGJOBDETAIL_SAGA',
        data: id,
        command: 'stop'
    });
}
const resetStatus = (dispatch) => {
    dispatch({
        type: 'RESET_JOB_DETAIL'
    });
}
const stopJob = (dispatch, id, job) => {
    dispatch({
        type: 'JOB_EDIT_SAGA',
        id: id,
        data: job
    })
}
const startJob = (dispatch, id, job) => {
    dispatch({
        type: 'JOB_EDIT_SAGA',
        id: id,
        data: job
    })
}
const editJob = (dispatch, id, job) => {
    dispatch({
        type: 'JOB_EDIT_SAGA',
        id: id,
        data: job
    })
}
const deleteJob = (dispatch, id) => {
    dispatch({
        type: 'JOB_DELETE_SAGA',
        data: id
    })
}
export {
    getJobList,
    startBlockingJobList,
    stopBlockingJobList,
    createJob,
    initCreateJob,
    getJobDetail,
    startBlockingJobDetail,
    stopBlockingJobDetail,
    resetStatus,
    stopJob,
    startJob,
    editJob,
    deleteJob
};