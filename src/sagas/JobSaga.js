import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list, create, detail, history, status, purge, edit } from "../apis/job"
import { list as listNode } from "../apis/node"

// import { fetchAvatar } from '../servers/detail';

function* getJoblist(action) {
    if (action && action.type === 'JOB_GETJOBLIST_SAGA') {
        console.log('normal get list');
    } else if (action === undefined) {
        console.log('get list from jobdelete')
    } else {
        console.log('unknown get list')
    }
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
    let res = yield call(edit, action.data);
    if (!res.error) {
        console.log('edit success');
        yield put({
            type: 'JOB_DETAIL_SAGA',
            data: action.data.ID,
            fromEdit: true
        })
    }

}

function* deleteJob(action) {
    console.log('delete saga')
    let res = yield call(purge, action.data);
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
    if (action.fromEdit) {
        console.log('from edit')
    }
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
}

export default detailSaga;