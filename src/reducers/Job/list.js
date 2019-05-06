const initialState = {
    list: [],
    loading: false
};
const JobRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'JOB_GET_JOBLIST_START':
            return Object.assign({}, state, { loading: true });
        case 'JOB_UPDATE_JOBLIST':
            return Object.assign({}, state, { loading: false, list: action.data.list });
        default:
            return state;
    }
}
export default JobRedu;