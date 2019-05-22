const initialState = {
    DCCount:0,
    list: [],
    nodelist:{
        region:'',
        Datacenter:'',
        list:[],
        info:{}
    }
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

const nodeListProcess = (data,state) => {
    let nodelist={
        region:data.region,
        Datacenter:data.Datacenter,
        list:data.list,
        info:{}
    };
    state.list.forEach((item)=>{
        if(item.region===data.region&&item.Datacenter===data.Datacenter){
            nodelist.info=item.DCInfo;
           
        }
    });
    data.list.forEach((item)=>{
        if(item.Datacenter===data.Datacenter){
            nodelist.list.push()
        }
    });
    return nodelist;

};


const DCRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'DC_UPDATE_DCLIST':
            return Object.assign({}, state, { list: DCListProcess(action.data.list) });
        case 'DC_UPDATE_NODELIST':
            return Object.assign({}, state, { nodelist: nodeListProcess(action.data,state) });
        case 'DC_UPDATE_DCCOUNT':
            return Object.assign({}, state, { DCCount: action.data.DCCount });
        default:
            return state;
    }
}
export default DCRedu;