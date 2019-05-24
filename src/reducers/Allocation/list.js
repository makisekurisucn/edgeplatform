const initialState = {
    list: []
};



const AllocationRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'ALLOCATION_UPDATE_ALLOCATIONLIST':
            return Object.assign({}, state, { list: action.data.list });
        default:
            return state;
    }
}
export default AllocationRedu;