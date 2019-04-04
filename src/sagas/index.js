import { call, all } from 'redux-saga/effects';

import jobSaga from './JobSaga';
import nodeSaga from './NodeSaga';

export default function* rootSagas () {
  yield all([
    call(jobSaga),
    call(nodeSaga)
  ])
}