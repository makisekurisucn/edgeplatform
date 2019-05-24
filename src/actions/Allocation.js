const getAllocationList = (dispatch, region) => {
    dispatch({
        type: 'ALLOCATION_GETALLOCATIONLIST_SAGA'
    });
}


export { getAllocationList };