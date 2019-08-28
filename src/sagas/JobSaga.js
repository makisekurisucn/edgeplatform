import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list, create, detail, history, status, purge, edit, blockingList, blockingDetail } from "../apis/job"
import { list as listNode } from "../apis/node"

// import { fetchAvatar } from '../servers/detail';

function* getJoblist(action) {
    yield put({
        type: "JOB_GET_JOBLIST_START"
    });
    let joblist = yield call(list);
    yield put({
        type: "JOB_UPDATE_JOBLIST",
        data: {
            list: joblist.error ? [] : joblist || []
        }
    });
}

function* getBlockingJoblist(action) {
    if (action.command === 'stop') {

    } else if (action.command === 'start') {
        const initialResponse = yield call(list);
        let X_Nomad_Index = initialResponse._getHeaders()['X-Nomad-Index'];
        while (true) {
            let blockingJoblist = yield call(blockingList, { index: X_Nomad_Index, wait: action.wait });
            console.log('already get blocking response')
            if (!blockingJoblist.error) {
                console.log('success reponse')
                const new_X_Nomad_Index = blockingJoblist._getHeaders()['X-Nomad-Index'];
                if (X_Nomad_Index === new_X_Nomad_Index) {
                    console.log('no new response, request again')
                } else {
                    X_Nomad_Index = new_X_Nomad_Index;
                    yield put({
                        type: "JOB_UPDATE_JOBLIST",
                        data: {
                            list: blockingJoblist.error ? [] : blockingJoblist || []
                        }
                    });
                    console.log('new response, request again')
                }
            } else {
                console.log('blocking request got error')
            }
        }
    }
}

function* createJob(action) {
    yield put({
        type: "JOB_CREATE_START"
    });
    let res = yield call(create, action.data);
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
    console.log('edit saga')
    console.log(action.data)
    let res = yield call(edit, action.id, action.data);
    //can delete
    if (!res.error) {
        console.log('edit success');
        yield put({
            type: 'JOB_DETAIL_SAGA',
            data: action.id
        })
    }

}

function* deleteJob(action) {
    console.log('delete saga')
    let res = yield call(purge, action.data);
    //can delete
    if (!res.error) {
        console.log('delete success')
        yield* getJoblist();
    }
    // yield put({
    //     type: "JOB_CREATE_START"
    // });
    // let res = yield call(create, action.data);
    // if (res.error) {
    //     yield put({
    //         type: "JOB_CREATE_FAIL",
    //         error: res.data.response.statusText
    //     });
    // } else {
    //     yield put({
    //         type: "JOB_CREATE_SUCCESS"
    //     });
    // }
}

function* getJobDetail(action) {
    yield put({
        type: "JOB_GETDETAIL_START"
    });
    let jobdetail = yield call(detail, action.data);
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
    if (action.command === 'stop') {

    } else if (action.command === 'start') {
        const initialResponse = yield call(detail, action.data);
        let X_Nomad_Index = initialResponse._getHeaders()['X-Nomad-Index'];
        while (true) {
            let blockingJobDetail = yield call(blockingDetail, action.data, { index: X_Nomad_Index, wait: action.wait });
            if (!blockingJobDetail.error) {
                const new_X_Nomad_Index = blockingJobDetail._getHeaders()['X-Nomad-Index'];
                if (X_Nomad_Index === new_X_Nomad_Index) {

                } else {
                    X_Nomad_Index = new_X_Nomad_Index;
                    // yield put({
                    //     type: "JOB_UPDATE_JOBLIST",
                    //     data: {
                    //         list: blockingJobDetail.error ? [] : blockingJobDetail || []
                    //     }
                    // });
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
            } else {}
        }
    }
}

function* getJobHistory(action) {
    let jobHistory = yield call(history, action.data.id);
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
    let [jobStatus, nodeList] = yield all([
        call(status, action.data.id),
        call(listNode)
    ]);

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

function* detailSaga() {
    yield takeLatest('JOB_GETJOBLIST_SAGA', getJoblist);
    yield takeLatest('JOB_CREATE_SAGA', createJob);
    yield takeLatest('JOB_DETAIL_SAGA', getJobDetail);
    yield takeLatest('JOB_HISTORY_SAGA', getJobHistory);
    yield takeLatest('JOB_STATUS_SAGA', getJobStatus);
    yield takeLatest('JOB_EDIT_SAGA', editJob);
    yield takeLatest('JOB_DELETE_SAGA', deleteJob);
    yield takeLatest('JOB_BLOcKINGJOBLIST_SAGA', getBlockingJoblist);
    yield takeLatest('JOB_BLOcKINGJOBDETAIL_SAGA', getBlockingJobDetail);
}

export default detailSaga;