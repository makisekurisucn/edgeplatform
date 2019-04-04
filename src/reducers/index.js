import { combineReducers } from 'redux'
import joblist from './Job/list'
import jobcreate from './Job/create'
import jobdetail from './Job/detail'
import nodeServerList from './Node/serverList'
import nodeWorkerList from './Node/workerList'
import nodeWorkerDetail from './Node/workerDetail'

// import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  joblist,
  jobcreate,
  jobdetail,
  nodeServerList,
  nodeWorkerList,
  nodeWorkerDetail
//   visibilityFilter
})

export default rootReducer