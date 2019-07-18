import { takeLatest, put, call, all } from 'redux-saga/effects';
import { list as getWorkerList, getWorkerDetail } from "../apis/node";
import { getList as getRegionList } from "../apis/region";
import { setRegion } from '../utils/handleRequest';


function* getDClist(action) {
    let regionList = yield call(getRegionList);
    let DClist = [];
    let allRegionNodelist = [];
    let DCInfoMap = {};

    const initialMeta = {
        DC: "未知",
        address: "未知",
        arch: "未知",
        latitude: "未知",
        longitude: "未知",
        range: "未知",
        region: "未知"
    }

    for (let i = 0; i < regionList.length; i++) {
        let DClistInRegion = [];
        DCInfoMap[regionList[i]] = {};

        setRegion(regionList[i]);
        let workerList = yield call(getWorkerList);
        for (let j = 0; j < workerList.length; j++) {
            if (DClistInRegion.indexOf(workerList[j].Datacenter) > -1) {
                let workerDetail = yield call(getWorkerDetail, workerList[j].ID);
                DCInfoMap[regionList[i]][workerList[j].Datacenter] = Object.assign({}, DCInfoMap[regionList[i]][workerList[j].Datacenter], workerDetail.Meta);
            } else {
                DClistInRegion.push(workerList[j].Datacenter);
                let workerDetail = yield call(getWorkerDetail, workerList[j].ID);
                DCInfoMap[regionList[i]][workerList[j].Datacenter] = Object.assign({}, initialMeta, workerDetail.Meta);
            }
            allRegionNodelist.push({
                name: workerList[j].Name,
                ID: workerList[j].ID,
                region: regionList[i],
                Datacenter: workerList[j].Datacenter
            });
        }
        DClist.push({ region: regionList[i], list: DClistInRegion });
    }

    yield put({
        type: "DC_UPDATE_DCLIST",
        data: {
            list: DClist || [],
            allRegionNodelist: allRegionNodelist || [],
            DCInfoMap
        }
    });
}

function* getNodelist(action) {
    let nodelist = [];

    setRegion(action.region);
    let workerList = yield call(getWorkerList);
    if (!workerList.error) {
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
}


function* detailSaga() {
    yield takeLatest('DC_GETDCLIST_SAGA', getDClist);
    yield takeLatest('DC_GETNODELIST_SAGA', getNodelist);

}

export default detailSaga;