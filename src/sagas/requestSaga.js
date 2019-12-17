import { put } from 'redux-saga/effects';


function* requestSaga(func, api, ...values) {
    let result = yield func(api, ...values)
    if (result.error) {
        let date = new Date();
        yield put({
            type: "NOTIFICATION_ADD_NOTIFICATIONLIST",
            data: {
                key: date.valueOf(),
                type: 'error',
                // title: 'network error',
                title: result.data.response && result.data.response.statusText,
                content: result.data.msg,
                date: date.valueOf()
            }
        })
    }
    return result;
}

export { requestSaga };