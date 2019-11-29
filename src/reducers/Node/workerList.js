const initialState = {
    list: [],
    loading: false
};

const workerListProcess = (nodeList) => {
    return nodeList;

};
const WorkerListRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'JOB_GET_JOBLIST_START':
            return Object.assign({}, state, { loading: true });
        case 'NODE_UPDATE_WORKERLIST':
            return Object.assign({}, state, { loading: false, list: workerListProcess(action.data.list) });
        default:
            return state;
    }
}
export default WorkerListRedu;