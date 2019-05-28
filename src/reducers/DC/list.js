const initialState = {
    DCCount:0,
    list: [],
    nodelist:[]
};

const DCListProcess = (list) => {
    let DClist = [];
    list.forEach((item) => {
        item.list.forEach((Datacenter) => {
            DClist.push({
                region: item.region,
                Datacenter: Datacenter,
                DCInfo: item.DCInfo.get(Datacenter)
            })
        });
    });
    return DClist;

};


const DCRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'DC_UPDATE_DCLIST':
            return Object.assign({}, state, { list: DCListProcess(action.data.list) });
        case 'DC_UPDATE_NODELIST':
            return Object.assign({}, state, { nodelist: action.data.list });
        case 'DC_UPDATE_DCCOUNT':
            return Object.assign({}, state, { DCCount: action.data.DCCount });
        default:
            return state;
    }
}
export default DCRedu;