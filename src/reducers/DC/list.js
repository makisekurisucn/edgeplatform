const initialState = {
    list: [],
    nodelist: [],
    allRegionNodelist: [],
    DCInfoMap:{}
};

const DCListProcess = (list) => {
    let DClist = [];
    list.forEach((item) => {
        item.list.forEach((Datacenter) => {
            DClist.push({
                region: item.region,
                Datacenter: Datacenter,
            })
        });
    });
    return DClist;

};


const DCRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'DC_UPDATE_DCLIST':
            return Object.assign({}, state, { list: DCListProcess(action.data.list), allRegionNodelist: action.data.allRegionNodelist,DCInfoMap: action.data.DCInfoMap });
        case 'DC_UPDATE_NODELIST':
            return Object.assign({}, state, { nodelist: action.data.list });
        case 'DC_UPDATE_DCINFO':
            return Object.assign({}, state, { DCInfoMap: action.data.DCInfoMap });
        default:
            return state;
    }
}
export default DCRedu;