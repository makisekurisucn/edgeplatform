import { takeLatest, put, call } from 'redux-saga/effects';
import { getList } from "../apis/region";
import { requestSaga } from './requestSaga';


function* getRegionList(action) {

    let list = yield* requestSaga(call, getList);
    if (!list.error) {
        yield put({
            type: "REGION_UPDATE",
            data: {
                list: list || []
            }
        });
    }
}

function* detailSaga() {
    yield takeLatest('REGION_GETLIST_SAGA', getRegionList);
}

export default detailSaga;