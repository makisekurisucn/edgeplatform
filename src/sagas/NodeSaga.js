import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list as getWorkerList, serverList as getServerList, getWorkerDetail } from "../apis/node"

// import { fetchAvatar } from '../servers/detail';

function* getNodeServerlist(action) {

    let list = yield call(getServerList);
    yield put({
        type: "NODE_UPDATE_SERVERLIST",
        data: {
            list: list || []
        }
    });
}

function* getNodeWorkerlist(action) {

    let workerList = yield call(getWorkerList);
    console.log(workerList)
    yield put({
        type: "NODE_UPDATE_WORKERLIST",
        data: {
            list: workerList || []
        }
    });
}

function* getNodeWorkerDetail(action) {

    let workerDetail = yield call(getWorkerDetail, action.data);
    yield put({
        type: "NODE_UPDATE_WORKERDETAIL",
        data: {
            detail: workerDetail || {}
        }
    });
}

function* detailSaga() {
    yield takeLatest('NODE_GETSERVERLIST_SAGA', getNodeServerlist);
    yield takeLatest('NODE_GETWORKERLIST_SAGA', getNodeWorkerlist);
    yield takeLatest('NODE_GETWORKERDETAIL_SAGA', getNodeWorkerDetail);

}

export default detailSaga;