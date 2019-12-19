import { combineReducers } from 'redux'
import joblist from './Job/list'
import jobcreate from './Job/create'
import jobdetail from './Job/detail'
import nodeServerList from './Node/serverList'
import nodeWorkerList from './Node/workerList'
import nodeWorkerDetail from './Node/workerDetail'
import region from './Region'
import DClist from './DC/list'
import Allocationlist from './Allocation'
import Prometheus from './Prometheus/metricData'
import Notification from './Notification'
import Token from './Token'

// import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
    joblist,
    jobcreate,
    jobdetail,
    nodeServerList,
    nodeWorkerList,
    nodeWorkerDetail,
    region,
    DClist,
    Allocationlist,
    Prometheus,
    Notification,
    Token
    //   visibilityFilter
})

export default rootReducer