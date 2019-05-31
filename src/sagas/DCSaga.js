import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list as getWorkerList, getWorkerDetail } from "../apis/node";
import { getList as getRegionList } from "../apis/region";
import { setRegion } from '../utils/handleRequest';


function* getDClist(action) {
    let regionList = yield call(getRegionList);
    let DClist = [];
    let allRegionNodelist = [];

    for (let i = 0; i < regionList.length; i++) {
        let DClistInRegion = [];
        let DCInfoMap = new Map();

        setRegion(regionList[i]);
        let workerList = yield call(getWorkerList);
        for (let j = 0; j < workerList.length; j++) {
            if (DClistInRegion.indexOf(workerList[j].Datacenter) > -1) {                
            } else {
                DClistInRegion.push(workerList[j].Datacenter);
                let workerDetail = yield call(getWorkerDetail, workerList[j].ID);
                DCInfoMap.set(workerList[j].Datacenter, workerDetail.Meta);
            }
            allRegionNodelist.push(
                {   name: workerList[j].Name,
                    ID: workerList[j].ID, 
                    region: regionList[i], 
                    Datacenter: workerList[j].Datacenter 
                });
        }
        DClist.push({ region: regionList[i], list: DClistInRegion, DCInfo: DCInfoMap });
    }

    yield put({
        type: "DC_UPDATE_DCLIST",
        data: {
            list: DClist || [],
            allRegionNodelist: allRegionNodelist || []
        }
    });
}

function* getNodelist(action) {
    let nodelist = [];

    setRegion(action.region);
    let workerList = yield call(getWorkerList);
    for (let i = 0; i < workerList.length; i++) {
        if (workerList[i].Datacenter === action.Datacenter) {
            nodelist.push({ name: workerList[i].Name, ID: workerList[i].ID });
        }
    }

    yield put({
        type: "DC_UPDATE_NODELIST",
        data: {
            list: nodelist || []
        }
    });
}

function* getDCCount(action) {
    let regionList = yield call(getRegionList);
    let DCArray = [];

    for (let i = 0; i < regionList.length; i++) {
        setRegion(regionList[i]);
        let workerList = yield call(getWorkerList);
        for (let j = 0; j < workerList.length; j++) {
            if (DCArray.indexOf(workerList[j].Datacenter) > -1) {} else {
                DCArray.push(workerList[j].Datacenter);
            }
        }
    }

    let count = DCArray.length;
    yield put({
        type: "DC_UPDATE_DCCOUNT",
        data: {
            DCCount: count || 0
        }
    });
}

function* detailSaga() {
    yield takeLatest('DC_GETDCLIST_SAGA', getDClist);
    yield takeLatest('DC_GETNODELIST_SAGA', getNodelist);
    yield takeLatest('DC_GETDCCOUNT_SAGA', getDCCount);

}

export default detailSaga;