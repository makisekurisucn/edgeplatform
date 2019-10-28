import { takeLatest, put, call } from 'redux-saga/effects';
import { getNodeCPUUtilization as getNodeCPUData, getNodeDiskUtilization as getNodeDiskData, getNodeMemoryUtilization as getNodeMemoryData } from "../apis/prometheus";
import { getTaskCPUUtilization as getTaskCPUData, getTaskMemoryUtilization as getTaskMemoryData } from "../apis/prometheus";
import {
    getNodeAllocatedCPU,
    getNodeUnallocatedCPU,
    getNodeAllocatedDisk,
    getNodeUnallocatedDisk,
    getNodeAllocatedMemory,
    getNodeUnallocatedMemory,
} from "../apis/prometheus";


function* getNodeCPUUtilization(action) {
    let CPUData = yield call(getNodeCPUData, action.nodeID, action.DC, action.duration);

    if (!CPUData.error) {
        yield put({
            type: "PROMETHEUS_UPDATE_NODECPUUTILIZATION",
            data: CPUData || {}
        });
    }
}

function* getNodeDiskUtilization(action) {
    let DiskData = yield call(getNodeDiskData, action.nodeID, action.DC, action.duration);

    if (!DiskData.error) {
        yield put({
            type: "PROMETHEUS_UPDATE_NODEDISKUTILIZATION",
            data: DiskData || {}
        });
    }
}

function* getNodeMemoryUtilization(action) {
    let MemoryData = yield call(getNodeMemoryData, action.nodeID, action.DC, action.duration);

    if (!MemoryData.error) {
        yield put({
            type: "PROMETHEUS_UPDATE_NODEMEMORYUTILIZATION",
            data: MemoryData || {}
        });
    }
}

function* getTaskResources(action) {
    const list = [
        { name: 'allocatedCPU', func: getNodeAllocatedCPU },
        { name: 'unallocatedCPU', func: getNodeUnallocatedCPU },
        { name: 'allocatedDisk', func: getNodeAllocatedDisk },
        { name: 'unallocatedDisk', func: getNodeUnallocatedDisk },
        { name: 'allocatedMemory', func: getNodeAllocatedMemory },
        { name: 'unallocatedMemory', func: getNodeUnallocatedMemory },
    ]
    let resources = {};
    for (let i = 0; i < list.length; i++) {
        let data = yield call(list[i].func, action.nodeID, action.DC, action.duration);
        if (!data.error) {
            const valuesArr = data.data.result[0] && data.data.result[0].values;
            resources[list[i].name] = valuesArr !== undefined ? valuesArr[valuesArr.length - 1][1] : 0;
        }
    }
    console.log(resources)
    yield put({
        type: "PROMETHEUS_UPDATE_NODERESOURCES",
        data: resources || {}
    });


}

function* getTaskCPUUtilization(action) {
    let CPUData = yield call(getTaskCPUData, action.allocID, action.taskName, action.duration);

    if (!CPUData.error) {
        yield put({
            type: "PROMETHEUS_UPDATE_TASKCPUUTILIZATION",
            data: CPUData || {}
        });
    }
}

function* getTaskMemoryUtilization(action) {
    let MemoryData = yield call(getTaskMemoryData, action.allocID, action.taskName, action.duration);

    if (!MemoryData.error) {
        yield put({
            type: "PROMETHEUS_UPDATE_TASKMEMORYUTILIZATION",
            data: MemoryData || {}
        });
    }
}


function* detailSaga() {
    yield takeLatest('PROMETHEUS_GETNODECPUUTILIZATION_SAGA', getNodeCPUUtilization);
    yield takeLatest('PROMETHEUS_GETNODEDISKUTILIZATION_SAGA', getNodeDiskUtilization);
    yield takeLatest('PROMETHEUS_GETNODEMEMORYUTILIZATION_SAGA', getNodeMemoryUtilization);
    yield takeLatest('PROMETHEUS_GETNODERESOURCES_SAGA', getTaskResources);
    yield takeLatest('PROMETHEUS_GETTASKCPUUTILIZATION_SAGA', getTaskCPUUtilization);
    yield takeLatest('PROMETHEUS_GETTASKMEMORYUTILIZATION_SAGA', getTaskMemoryUtilization);
    // yield takeLatest('PROMETHEUS_GETPROMETHEUSDATA_SAGA', getPrometheusData);

}

export default detailSaga;