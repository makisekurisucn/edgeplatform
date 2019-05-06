const initialState = {
    detail: {},
    loading: false
};

const ServerListRedu = (state = initialState, action) => {
    switch (action.type) {
        case 'NODE_UPDATE_WORKERDETAIL':
            return Object.assign({}, state, { loading: false, detail: action.data.detail });
        case 'NODE_RESETWORKERDETAIL':
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
export default ServerListRedu;