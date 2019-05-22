import { call, all } from 'redux-saga/effects';

import jobSaga from './JobSaga';
import nodeSaga from './NodeSaga';
import regionSaga from './RegionSaga';
import DCSaga from './DCSaga';
export default function* rootSagas() {
    yield all([
        call(jobSaga),
        call(nodeSaga),
        call(regionSaga),
        call(DCSaga)
    ])
}