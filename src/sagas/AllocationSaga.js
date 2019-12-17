import { takeLatest, put, call } from 'redux-saga/effects';
import { list, detail, taskLogs, stopAlloc, restartAlloc, blockingDetail } from "../apis/allocation";
import { requestSaga } from './requestSaga';

let blockingDetailConstructor;

function* getAllocationlist(action) {
    let allocationlist = yield* requestSaga(call, list);

    if (!allocationlist.error) {
        yield put({
            type: "ALLOCATION_UPDATE_ALLOCATIONLIST",
            data: {
                list: allocationlist || []
            }
        });
    }
}

function* getAllocationDetail(action) {
    let allocationDetail = yield* requestSaga(call, detail, action.id);

    if (!allocationDetail.error) {
        yield put({
            type: "ALLOCATION_UPDATE_ALLOCATIONDETAIL",
            data: {
                detail: allocationDetail || {}
            }
        });
    }
}

function* getBlockingAllocDetail(action) {
    if (action.command === 'stop' && blockingDetailConstructor) {
        blockingDetailConstructor.abort();
        // blockingDetailConstructor = null;
    } else if (action.command === 'start') {
        blockingDetailConstructor = new AbortController();
        const signal = blockingDetailConstructor.signal;

        const initialResponse = yield* requestSaga(call, detail, action.id);
        let X_Nomad_Index = initialResponse._getHeaders()['X-Nomad-Index'];
        if (!initialResponse.error) {
            yield put({
                type: "ALLOCATION_UPDATE_ALLOCATIONDETAIL",
                data: {
                    detail: initialResponse || {}
                }
            });
        }
        while (true) {
            let blockingAllocDetail = yield* requestSaga(call, blockingDetail, action.id, { index: X_Nomad_Index, wait: action.wait }, { signal });
            if (!blockingAllocDetail.error) {
                const new_X_Nomad_Index = blockingAllocDetail._getHeaders()['X-Nomad-Index'];
                if (X_Nomad_Index === new_X_Nomad_Index) {

                } else {
                    X_Nomad_Index = new_X_Nomad_Index;
                    yield put({
                        type: "ALLOCATION_UPDATE_ALLOCATIONDETAIL",
                        data: {
                            detail: blockingAllocDetail || {}
                        }
                    });
                }
            }
        }
    }
}

function* stopAllocation(action) {
    let result = yield* requestSaga(call, stopAlloc, action.id);

    if (!result.error) {}
}

function* restartAllocation(action) {
    let result = yield* requestSaga(call, restartAlloc, action.id);

    if (!result.error) {}
}

function* getTaskLogs(action) {
    const logs = yield* requestSaga(call, taskLogs, action.id, action.params);
    yield put({
        type: 'ALLOCATION_UPDATE_TASKLOGS',
        data: {
            logs: logs.error ? logs.data.msg : logs.toString(),
            logType: action.params.type || 'stdout'
        }
    })
}

function* getBothTaskLogs(action) {
    let stdoutParams = Object.assign({}, action.params, { type: 'stdout' });
    const stdoutLogs = yield* requestSaga(call, taskLogs, action.id, stdoutParams);
    let stderrParams = Object.assign({}, action.params, { type: 'stderr' });
    const stderrLogs = yield* requestSaga(call, taskLogs, action.id, stderrParams);

    yield put({
        type: 'ALLOCATION_UPDATE_TASKLOGS',
        data: {
            logs: stdoutLogs.error ? stdoutLogs.data.msg : stdoutLogs.toString(),
            logType: 'stdout'
        }
    })
    yield put({
        type: 'ALLOCATION_UPDATE_TASKLOGS',
        data: {
            logs: stderrLogs.error ? stderrLogs.data.msg : stderrLogs.toString(),
            logType: 'stderr'
        }
    })
}


function* detailSaga() {
    yield takeLatest('ALLOCATION_GETALLOCATIONLIST_SAGA', getAllocationlist);
    yield takeLatest('ALLOCATION_GETALLOCATIONDETAIL_SAGA', getAllocationDetail);
    yield takeLatest('ALLOCATION_GETTASKLOGS_SAGA', getTaskLogs);
    yield takeLatest('ALLOCATION_GETBOTHTASKLOGS_SAGA', getBothTaskLogs);
    yield takeLatest('ALLOCATION_STOPALLOCATION_SAGA', stopAllocation);
    yield takeLatest('ALLOCATION_RESTARTALLOCATION_SAGA', restartAllocation);
    yield takeLatest('ALLOCATION_BLOCKINGALLOCDETAIL_SAGA', getBlockingAllocDetail);
}

export default detailSaga;