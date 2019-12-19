import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list, create, detail, history, status, purge, edit, blockingList, blockingDetail, blockingStatus } from "../apis/job"
import { list as listNode } from "../apis/node";
import { requestSaga } from './requestSaga';

let blockingListConstructor, blockingDetailConstructor, blockingAllocListConstructor;

function* getJoblist(action) {
    yield put({
        type: "JOB_GET_JOBLIST_START"
    });
    let joblist = yield* requestSaga(call, list);
    yield put({
        type: "JOB_UPDATE_JOBLIST",
        data: {
            list: joblist.error ? [] : joblist || []
        }
    });
}

function* getBlockingJoblist(action) {
    if (action.command === 'stop' && blockingListConstructor) {
        //终止所有blocking请求
        blockingListConstructor.abort();
        // blockingListConstructor = null;
    } else if (action.command === 'start') {
        //为每个blocking quereis带上相同的signal
        blockingListConstructor = new AbortController();
        const signal = blockingListConstructor.signal;

        const initialResponse = yield* requestSaga(call, list);
        if (!initialResponse._getHeaders) {
            console.log('blocking has no nomad-index, should be stop');
            return;
        }
        let X_Nomad_Index = initialResponse._getHeaders()['X-Nomad-Index'];
        while (true) {
            let blockingJoblist = yield* requestSaga(call, blockingList, { index: X_Nomad_Index, wait: action.wait }, { signal });
            if (!blockingJoblist.error) {
                const new_X_Nomad_Index = blockingJoblist._getHeaders()['X-Nomad-Index'];
                if (X_Nomad_Index === new_X_Nomad_Index) {} else {
                    X_Nomad_Index = new_X_Nomad_Index;
                    yield put({
                        type: "JOB_UPDATE_JOBLIST",
                        data: {
                            list: blockingJoblist.error ? [] : blockingJoblist || []
                        }
                    });
                }
            } else {}
        }
    }
}

function* createJob(action) {
    yield put({
        type: "JOB_CREATE_START"
    });
    let res = yield* requestSaga(call, create, action.data);
    if (res.error) {
        yield put({
            type: "JOB_CREATE_FAIL",
            error: res.data.response.statusText
        });
    } else {
        yield put({
            type: "JOB_CREATE_SUCCESS"
        });
    }
}

function* editJob(action) {
    let res = yield* requestSaga(call, edit, action.id, action.data);
}

function* deleteJob(action) {
    let res = yield* requestSaga(call, purge, action.data);
}

function* getJobDetail(action) {
    yield put({
        type: "JOB_GETDETAIL_START"
    });
    let jobdetail = yield* requestSaga(call, detail, action.data);
    if (!jobdetail.error) {
        yield put({
            type: "JOB_UPDATE_JOBDETAIL",
            data: {
                detail: jobdetail || {}
            }
        });
        let tg = [];
        jobdetail.TaskGroups.forEach(task => {
            tg.push({
                name: task.Name,
                replica: task.Count
            });
        });
        yield all([
            put({
                type: "JOB_HISTORY_SAGA",
                data: {
                    id: jobdetail.ID
                }
            }),
            put({
                type: "JOB_STATUS_SAGA",
                data: {
                    name: jobdetail.Name,
                    id: jobdetail.ID,
                    taskGroup: tg
                }
            })
        ]);
    }

}

function* getBlockingJobDetail(action) {
    if (action.command === 'stop' && blockingDetailConstructor) {
        blockingDetailConstructor.abort();
        // blockingDetailConstructor = null;
    } else if (action.command === 'start') {
        blockingDetailConstructor = new AbortController();
        const signal = blockingDetailConstructor.signal;

        const initialResponse = yield* requestSaga(call, detail, action.data);
        if (!initialResponse._getHeaders) {
            console.log('blocking has no nomad-index, should be stop');
            return;
        }
        let X_Nomad_Index = initialResponse._getHeaders()['X-Nomad-Index'];
        while (true) {
            let blockingJobDetail = yield* requestSaga(call, blockingDetail, action.data, { index: X_Nomad_Index, wait: action.wait }, { signal });
            if (!blockingJobDetail.error) {
                const new_X_Nomad_Index = blockingJobDetail._getHeaders()['X-Nomad-Index'];
                if (X_Nomad_Index === new_X_Nomad_Index) {

                } else {
                    X_Nomad_Index = new_X_Nomad_Index;
                    yield put({
                        type: "JOB_UPDATE_JOBDETAIL",
                        data: {
                            detail: blockingJobDetail || {}
                        }
                    });
                    let tg = [];
                    blockingJobDetail.TaskGroups.forEach(task => {
                        tg.push({
                            name: task.Name,
                            replica: task.Count
                        });
                    });
                    yield all([
                        put({
                            type: "JOB_HISTORY_SAGA",
                            data: {
                                id: blockingJobDetail.ID
                            }
                        }),
                        put({
                            type: "JOB_STATUS_SAGA",
                            data: {
                                name: blockingJobDetail.Name,
                                id: blockingJobDetail.ID,
                                taskGroup: tg
                            }
                        })
                    ]);
                }
            }
        }
    }
}

function* getJobHistory(action) {
    let jobHistory = yield* requestSaga(call, history, action.data.id);
    if (!jobHistory.error) {
        yield put({
            type: "JOB_UPDATE_JOBHISTORY",
            data: {
                history: jobHistory || {}
            }
        });
    }
}

function* getJobStatus(action) {
    let jobStatus = yield* requestSaga(call, status, action.data.id);
    let nodeList = yield* requestSaga(call, listNode);

    if (!(jobStatus.error || nodeList.error)) {
        yield put({
            type: "JOB_UPDATE_JOBSTATUS",
            data: {
                status: jobStatus || {},
                nodeList: nodeList || [],
                jobInfo: action.data
            }
        });
        yield put({
            type: 'JOB_UPDATE_ALLOCATIONLIST',
            data: {
                allocationList: jobStatus
            }
        });
    }
}


function* getBlockingAllocList(action) {
    if (action.command === 'stop' && blockingAllocListConstructor) {
        blockingAllocListConstructor.abort();
        // blockingAllocListConstructor = null;
    } else if (action.command === 'start') {
        blockingAllocListConstructor = new AbortController();
        const signal = blockingAllocListConstructor.signal;

        const initialResponse = yield* requestSaga(call, status, action.data);
        if (!initialResponse._getHeaders) {
            console.log('blocking has no nomad-index, should be stop');
            return;
        }
        let X_Nomad_Index = initialResponse._getHeaders()['X-Nomad-Index'];
        while (true) {
            let blockingAlloclist = yield* requestSaga(call, blockingStatus, action.data, { index: X_Nomad_Index, wait: action.wait }, { signal });
            if (!blockingAlloclist.error) {
                const new_X_Nomad_Index = blockingAlloclist._getHeaders()['X-Nomad-Index'];
                if (X_Nomad_Index === new_X_Nomad_Index) {} else {
                    X_Nomad_Index = new_X_Nomad_Index;
                    yield put({
                        type: 'JOB_UPDATE_ALLOCATIONLIST',
                        data: {
                            allocationList: blockingAlloclist.error ? [] : blockingAlloclist || []
                        }
                    });
                }
            } else {}
        }
    }
}

function* detailSaga() {
    yield takeLatest('JOB_GETJOBLIST_SAGA', getJoblist);
    yield takeLatest('JOB_CREATE_SAGA', createJob);
    yield takeLatest('JOB_DETAIL_SAGA', getJobDetail);
    yield takeLatest('JOB_HISTORY_SAGA', getJobHistory);
    yield takeLatest('JOB_STATUS_SAGA', getJobStatus);
    yield takeLatest('JOB_EDIT_SAGA', editJob);
    yield takeLatest('JOB_DELETE_SAGA', deleteJob);
    yield takeLatest('JOB_BLOCKINGJOBLIST_SAGA', getBlockingJoblist);
    yield takeLatest('JOB_BLOCKINGJOBDETAIL_SAGA', getBlockingJobDetail);
    yield takeLatest('JOB_BLOCKINGJOBSTATUS_SAGA', getBlockingAllocList);
}

export default detailSaga;