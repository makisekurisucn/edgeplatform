const initialState = {
    list: [],
    detail: {},
    taskLogs: {
        stdout: '',
        stderr: ''
    }
};

const taskLogsProcess = (state, data) => {
    if (data.logType === 'stdout') {
        return Object.assign({}, state.taskLogs, { stdout: data.logs });
    } else if (data.logType === 'stderr') {
        return Object.assign({}, state.taskLogs, { stderr: data.logs });
    } else {
        return state.taskLogs;
    }
}

const AllocationRedu = (state = initialState, action) => {
    switch (action.type) {
        case 'ALLOCATION_UPDATE_ALLOCATIONLIST':
            return Object.assign({}, state, { list: action.data.list });
        case 'ALLOCATION_UPDATE_ALLOCATIONDETAIL':
            return Object.assign({}, state, { detail: action.data.detail });
        case 'ALLOCATION_UPDATE_TASKLOGS':
            return Object.assign({}, state, { taskLogs: taskLogsProcess(state, action.data) });
        default:
            return state;
    }
}
export default AllocationRedu;