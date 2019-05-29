const initialState = {
    CPUData:[],
    diskData:[],
    memoryData:[]
};

// const DCListProcess = (list) => {
//     let DClist = [];
//     list.forEach((item) => {
//         item.list.forEach((Datacenter) => {
//             DClist.push({
//                 region: item.region,
//                 Datacenter: Datacenter,
//                 DCInfo: item.DCInfo.get(Datacenter)
//             })
//         });
//     });
//     return DClist;

// };


const PrometheusRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'PROMETHEUS_UPDATE_CPUUTILIZATION':
            return Object.assign({}, state, { CPUData: action.data.data.result });
        case 'PROMETHEUS_UPDATE_DISKUTILIZATION':
            return Object.assign({}, state, { diskData: action.data.data.result });
        case 'PROMETHEUS_UPDATE_MEMORYUTILIZATION':
            return Object.assign({}, state, { memoryData: action.data.data.result });
        default:
            return state;
    }
}
export default PrometheusRedu;