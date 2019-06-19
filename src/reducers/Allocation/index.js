const initialState = {
    list: [],
    taskLogs: {
        stdout: '',
        stderr: ''
    }
};

const taskLogsProcess = (state, data) => {
    if (data.logType === 'stdout') {
        console.log('stdout')
        return Object.assign({}, state.taskLogs, { stdout: data.logs });
    } else if (data.logType === 'stderr') {
        console.log('stderr')
        return Object.assign({}, state.taskLogs, { stderr: data.logs });
    } else {
        return state.taskLogs;
    }
}

const AllocationRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'ALLOCATION_UPDATE_ALLOCATIONLIST':
            return Object.assign({}, state, { list: action.data.list });
        case 'ALLOCATION_UPDATE_TASKLOGS':
            return Object.assign({}, state, { taskLogs: taskLogsProcess(state, action.data) });
        default:
            return state;
    }
}
export default AllocationRedu;