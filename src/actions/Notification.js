const addNotification = (dispatch, data) => {
    dispatch({
        type: 'NOTIFICATION_ADD_NOTIFICATIONLIST',
        data
    });
}

const deleteNotification = (dispatch, key) => {
    dispatch({
        type: 'NOTIFICATION_DELETE_NOTIFICATIONLIST',
        data: key
    });
}


export { addNotification, deleteNotification };