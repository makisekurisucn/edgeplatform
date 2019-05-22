const getDCList = (dispatch) => {
    dispatch({
        type: 'DC_GETDCLIST_SAGA'
    });
}

const getNodeList = (dispatch,region,Datacenter) => {
    dispatch({
        type: 'DC_GETNODELIST_SAGA',
        region,
        Datacenter
    });
}

const getDCCount = (dispatch) => {
    dispatch({
        type: 'DC_GETDCCOUNT_SAGA'
    });
}



export { getDCList ,getNodeList,getDCCount};