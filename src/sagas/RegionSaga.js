import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getList } from "../apis/region"


function* getRegionList(action) {

    let list = yield call(getList);
    console.log(list);
    yield put({
      type: "REGION_UPDATE",
      data: {
        list: list || []
      }
    });  
}

function* detailSaga() {
  yield takeLatest('REGION_GETLIST_SAGA', getRegionList);
}

export default detailSaga;

