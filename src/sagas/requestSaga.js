import { takeLatest, put, call, all } from 'redux-saga/effects';
// import { list, create, detail, history, status, purge, edit, blockingList, blockingDetail } from "../apis/job"
// import { list as listNode } from "../apis/node"


function* requestSaga(api, ...values) {
    // yield put({
    //     type: "JOB_GET_JOBLIST_START"
    // });
    // let joblist = yield call(list);
    // yield put({
    //     type: "JOB_UPDATE_JOBLIST",
    //     data: {
    //         list: joblist.error ? [] : joblist || []
    //     }
    // });
    let result = yield call(api, ...values)
    if (result.error) {
        yield put({
            type: "",
            data: ""
        })
    }
    return result;
}

export default requestSaga;