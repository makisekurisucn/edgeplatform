import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list, taskLogs } from "../apis/allocation";
import { setRegion } from '../utils/handleRequest';


function* getAllocationlist(action) {
    let allocationlist = yield call(list);

    yield put({
        type: "ALLOCATION_UPDATE_ALLOCATIONLIST",
        data: {
            list: allocationlist || []
        }
    });

}

function* getTaskLogs(action) {
    const logs = yield call(taskLogs, action.id, action.params);
    yield put({
        type: 'ALLOCATION_UPDATE_TASKLOGS',
        data: {
            logs: logs.error === true ? logs.data : logs,
            logType: action.params.type || 'stdout'
        }
    })
}

function* getBothTaskLogs(action) {
    let stdoutParams = Object.assign({}, action.params, { type: 'stdout' });
    const stdoutLogs = yield call(taskLogs, action.id, stdoutParams);
    let stderrParams = Object.assign({}, action.params, { type: 'stderr' });
    const stderrLogs = yield call(taskLogs, action.id, stderrParams);

    yield put({
        type: 'ALLOCATION_UPDATE_TASKLOGS',
        data: {
            logs: stdoutLogs.error === true ? stdoutLogs.data : stdoutLogs,
            logType: 'stdout'
        }
    })
    yield put({
        type: 'ALLOCATION_UPDATE_TASKLOGS',
        data: {
            logs: stderrLogs.error === true ? stderrLogs.data : stderrLogs,
            logType: 'stderr'
        }
    })
}


function* detailSaga() {
    yield takeLatest('ALLOCATION_GETALLOCATIONLIST_SAGA', getAllocationlist);
    yield takeLatest('ALLOCATION_GETTASKLOGS_SAGA', getTaskLogs);
    yield takeLatest('ALLOCATION_GETBOTHTASKLOGS_SAGA', getBothTaskLogs);
}

export default detailSaga;