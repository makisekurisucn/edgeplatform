import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getCPUUtilization as getCPUData, getDiskUtilization as getDiskData, getMemoryUtilization as getMemoryData } from "../apis/prometheus";


function* getCPUUtilization(action) {
    let CPUData = yield call(getCPUData,action.nodeID,action.DC);

    yield put({
        type: "PROMETHEUS_UPDATE_CPUUTILIZATION",
        data: CPUData || {}
    });
}

function* getDiskUtilization(action) {
    let DiskData = yield call(getDiskData,action.nodeID,action.DC);

    yield put({
        type: "PROMETHEUS_UPDATE_DISKUTILIZATION",
        data: DiskData || {}
    });
}

function* getMemoryUtilization(action) {
    let MemoryData = yield call(getMemoryData,action.nodeID,action.DC);

    yield put({
        type: "PROMETHEUS_UPDATE_MEMORYUTILIZATION",
        data: MemoryData || {}
    });
}

// function* getPrometheusData(action) {
//     yield getCPUUtilization();
//     yield getDiskUtilization();
//     yield getMemoryUtilization();
// }

function* detailSaga() {
    yield takeLatest('PROMETHEUS_GETCPUUTILIZATION_SAGA', getCPUUtilization);
    yield takeLatest('PROMETHEUS_GETDISKUTILIZATION_SAGA', getDiskUtilization);
    yield takeLatest('PROMETHEUS_GETMEMORYUTILIZATION_SAGA', getMemoryUtilization);
    // yield takeLatest('PROMETHEUS_GETPROMETHEUSDATA_SAGA', getPrometheusData);

}

export default detailSaga;