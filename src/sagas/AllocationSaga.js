import { takeLatest, put, call } from 'redux-saga/effects';
import { list, taskLogs } from "../apis/allocation";
import { setRegion } from '../utils/handleRequest';
import { requestSaga } from './requestSaga';


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
    yield takeLatest('ALLOCATION_GETTASKLOGS_SAGA', getTaskLogs);
    yield takeLatest('ALLOCATION_GETBOTHTASKLOGS_SAGA', getBothTaskLogs);
}

export default detailSaga;