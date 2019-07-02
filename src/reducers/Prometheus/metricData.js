const initialState = {
    nodeMetric: {
        CPUData: [],
        diskData: [],
        memoryData: []
    },
    taskMetric: {
        CPUData: [],
        memoryData: []
    }
};

const nodeMetricProcess = (state, data, type) => {
    switch (type) {
        case 'cpu':
            return Object.assign({}, state.nodeMetric, { CPUData: data });
        case 'memory':
            return Object.assign({}, state.nodeMetric, { memoryData: data });
        case 'disk':
            return Object.assign({}, state.nodeMetric, { diskData: data });
        default:
            return state.nodeMetric;
    }
}

const taskMetricProcess = (state, data, type) => {
    switch (type) {
        case 'cpu':
            return Object.assign({}, state.taskMetric, { CPUData: data });
        case 'memory':
            return Object.assign({}, state.taskMetric, { memoryData: data });
        default:
            return state.taskMetric;
    }
}


const PrometheusRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'PROMETHEUS_UPDATE_NODECPUUTILIZATION':
            return Object.assign({}, state, { nodeMetric: nodeMetricProcess(state, action.data.data.result, 'cpu') });
        case 'PROMETHEUS_UPDATE_NODEDISKUTILIZATION':
            return Object.assign({}, state, { nodeMetric: nodeMetricProcess(state, action.data.data.result, 'disk') });
        case 'PROMETHEUS_UPDATE_NODEMEMORYUTILIZATION':
            return Object.assign({}, state, { nodeMetric: nodeMetricProcess(state, action.data.data.result, 'memory') });
        case 'PROMETHEUS_UPDATE_TASKCPUUTILIZATION':
            return Object.assign({}, state, { taskMetric: taskMetricProcess(state, action.data.data.result, 'cpu') });
        case 'PROMETHEUS_UPDATE_TASKMEMORYUTILIZATION':
            return Object.assign({}, state, { taskMetric: taskMetricProcess(state, action.data.data.result, 'memory') });
        default:
            return state;
    }
}
export default PrometheusRedu;