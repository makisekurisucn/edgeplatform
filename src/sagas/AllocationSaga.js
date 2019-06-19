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
            logs: logs,
            logType: action.params.type || 'stdout'
        }
    })
}


function* detailSaga() {
    yield takeLatest('ALLOCATION_GETALLOCATIONLIST_SAGA', getAllocationlist);
    yield takeLatest('ALLOCATION_GETTASKLOGS_SAGA', getTaskLogs);
}

export default detailSaga;