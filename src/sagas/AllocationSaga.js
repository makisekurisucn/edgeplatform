import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list } from "../apis/allocation";
import { setRegion } from '../utils/handleRequest';


function* getAllocationlist(action){

    let allocationlist = yield call(list);
    
    yield put({
        type: "ALLOCATION_UPDATE_ALLOCATIONLIST",
        data: {
            list: allocationlist || []
        }
    });
    
}



function* detailSaga() {
    yield takeLatest('ALLOCATION_GETALLOCATIONLIST_SAGA', getAllocationlist);
}

export default detailSaga;