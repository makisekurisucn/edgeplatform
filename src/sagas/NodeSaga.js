import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { list as getWorkerList, serverList as getServerList, getWorkerDetail } from "../apis/node";
import { requestSaga } from './requestSaga';

// import { fetchAvatar } from '../servers/detail';

function* getNodeServerlist(action) {

    let list = yield* requestSaga(call, getServerList);
    yield put({
        type: "NODE_UPDATE_SERVERLIST",
        data: {
            list: list.error ? [] : list || []
        }
    });
}

function* getNodeWorkerlist(action) {

    let workerList = yield* requestSaga(call, getWorkerList);
    yield put({
        type: "NODE_UPDATE_WORKERLIST",
        data: {
            list: workerList.error ? [] : workerList || []
        }
    });
    for (let node of workerList) {
        yield fork(getNodeWorkerAdditional, node.ID, workerList);
    }
}

function* getNodeWorkerAdditional(nodeID, workerList) {
    let workerDetail = yield* requestSaga(call, getWorkerDetail, nodeID);
    if (!workerDetail.error) {
        let res = [];
        for (let i = 0; i < workerList.length; i++) {
            if (workerList[i].ID === nodeID) {
                workerList[i].location = workerDetail.Meta.address || '未知';
            }
            res.push(workerList[i]);
        }
        yield put({
            type: "NODE_UPDATE_WORKERLIST",
            data: {
                list: res || []
            }
        });
    }
}

function* getNodeWorkerDetail(action) {

    let workerDetail = yield* requestSaga(call, getWorkerDetail, action.data);
    if (!workerDetail.error) {
        yield put({
            type: "NODE_UPDATE_WORKERDETAIL",
            data: {
                detail: workerDetail || {}
            }
        });
    }
}

function* detailSaga() {
    yield takeLatest('NODE_GETSERVERLIST_SAGA', getNodeServerlist);
    yield takeLatest('NODE_GETWORKERLIST_SAGA', getNodeWorkerlist);
    yield takeLatest('NODE_GETWORKERDETAIL_SAGA', getNodeWorkerDetail);

}

export default detailSaga;