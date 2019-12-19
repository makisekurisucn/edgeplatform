import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { requestSaga } from './requestSaga';
import { verifyToken as verify } from '../apis/token';



function* verifyToken(action) {

    let res = yield* requestSaga(call, verify, action.data);
    if (res.error) {
        yield put({
            type: "TOKEN_UPDATE_VALIDATION",
            data: {
                hasToken: true,
                isTokenValid: false
            }
        });
    } else {
        yield put({
            type: "TOKEN_UPDATE_VALIDATION",
            data: {
                token: action.data,
                hasToken: true,
                isTokenValid: true
            }
        });
    }
}


function* detailSaga() {
    yield takeLatest('TOKEN_POSTTOKEN_SAGA', verifyToken);
}

export default detailSaga;