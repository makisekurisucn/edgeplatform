import { takeLatest, put, call, all } from 'redux-saga/effects';


function* requestSaga(func, api, ...values) {
    let result = yield func(api, ...values)
    if (result.error) {
        console.log(result);
        let date = new Date();
        yield put({
            type: "NOTIFICATION_ADD_NOTIFICATIONLIST",
            data: {
                key: date.valueOf(),
                type: 'error',
                title: '',
                content: '',
                date: date.valueOf()
            }
        })
    }
    return result;
}

export { requestSaga };