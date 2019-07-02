import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getNodeCPUUtilization as getNodeCPUData, getNodeDiskUtilization as getNodeDiskData, getNodeMemoryUtilization as getNodeMemoryData } from "../apis/prometheus";
import { getTaskCPUUtilization as getTaskCPUData, getTaskMemoryUtilization as getTaskMemoryData } from "../apis/prometheus";


function* getNodeCPUUtilization(action) {
    let CPUData = yield call(getNodeCPUData, action.nodeID, action.DC, action.duration);

    yield put({
        type: "PROMETHEUS_UPDATE_NODECPUUTILIZATION",
        data: CPUData || {}
    });
}

function* getNodeDiskUtilization(action) {
    let DiskData = yield call(getNodeDiskData, action.nodeID, action.DC, action.duration);

    yield put({
        type: "PROMETHEUS_UPDATE_NODEDISKUTILIZATION",
        data: DiskData || {}
    });
}

function* getNodeMemoryUtilization(action) {
    let MemoryData = yield call(getNodeMemoryData, action.nodeID, action.DC, action.duration);

    yield put({
        type: "PROMETHEUS_UPDATE_NODEMEMORYUTILIZATION",
        data: MemoryData || {}
    });
}

function* getTaskCPUUtilization(action) {
    let CPUData = yield call(getTaskCPUData, action.allocID, action.taskName, action.duration);

    yield put({
        type: "PROMETHEUS_UPDATE_TASKCPUUTILIZATION",
        data: CPUData || {}
    });
}

function* getTaskMemoryUtilization(action) {
    let MemoryData = yield call(getTaskMemoryData, action.allocID, action.taskName, action.duration);

    yield put({
        type: "PROMETHEUS_UPDATE_TASKMEMORYUTILIZATION",
        data: MemoryData || {}
    });
}


function* detailSaga() {
    yield takeLatest('PROMETHEUS_GETNODECPUUTILIZATION_SAGA', getNodeCPUUtilization);
    yield takeLatest('PROMETHEUS_GETNODEDISKUTILIZATION_SAGA', getNodeDiskUtilization);
    yield takeLatest('PROMETHEUS_GETNODEMEMORYUTILIZATION_SAGA', getNodeMemoryUtilization);
    yield takeLatest('PROMETHEUS_GETTASKCPUUTILIZATION_SAGA', getTaskCPUUtilization);
    yield takeLatest('PROMETHEUS_GETTASKMEMORYUTILIZATION_SAGA', getTaskMemoryUtilization);
    // yield takeLatest('PROMETHEUS_GETPROMETHEUSDATA_SAGA', getPrometheusData);

}

export default detailSaga;