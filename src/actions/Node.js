


const getServerList = (dispatch) => {
  dispatch({
    type:'NODE_GETSERVERLIST_SAGA'
  });
}
const getWorkerList = (dispatch) => {
  dispatch({
    type:'NODE_GETWORKERLIST_SAGA'
  });
}
const getWorkerDetail = (dispatch, ID) => {
  dispatch({
    type:'NODE_GETWORKERDETAIL_SAGA',
    data: ID
  });
}
const resetStatus = (dispatch, ID) => {
  dispatch({
    type:'NODE_RESETWORKERDETAIL'
  });
}
export {
  getServerList,
  getWorkerList,
  getWorkerDetail,
  resetStatus
};