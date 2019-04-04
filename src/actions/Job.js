const getJobList = (dispatch) => {
    dispatch({
      type:'JOB_GETJOBLIST_SAGA'
    });
  }
const createJob = (dispatch, job) => {
    dispatch({
      type:'JOB_CREATE_SAGA',
      data: job
    });
  }
const initCreateJob = (dispatch) => {
  dispatch({
    type:'JOB_CREATE_INIT'
  });
}
const getJobDetail = (dispatch, id) =>{
  dispatch({
    type:'JOB_DETAIL_SAGA',
    data: id
  });
}
const resetStatus = (dispatch) =>{
  dispatch({
    type:'RESET_JOB_DETAIL'
  });
}
  export {
    getJobList,
    createJob,
    initCreateJob,
    getJobDetail,
    resetStatus
  };