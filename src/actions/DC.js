const getDCList = (dispatch) => {
    dispatch({
        type: 'DC_GETDCLIST_SAGA'
    });
}

const getNodeList = (dispatch, region, Datacenter) => {
    dispatch({
        type: 'DC_GETNODELIST_SAGA',
        region,
        Datacenter
    });
}


export { getDCList, getNodeList };