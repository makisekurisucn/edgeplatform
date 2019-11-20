const initialState = {
    list: [],
    // 每条通知的数据格式 { key:'', type:'info|error|warning|success|default', title:'', content:'', date:'' }
};

const addNotification = (list, data) => {
    console.log(data);
    const event = new CustomEvent('addNotification', { 'detail': { ...data } });
    window.dispatchEvent(event);

    let notificationList = JSON.parse(JSON.stringify(list));
    notificationList.unshift(data);
    return notificationList;
}

const deleteNotification = (list, data) => {
    console.log('delete in reducer');
    let notificationList = JSON.parse(JSON.stringify(list));
    let deleteIndex;
    notificationList.forEach((item, index) => {
        if (item.key === data) {
            console.log('key matched');
            deleteIndex = index;
        }
    })
    if (deleteIndex === undefined) {
        console.log('there is not any key matched');
        return list;
    }
    notificationList.splice(deleteIndex, 1);
    return notificationList;
}

const NotificationRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'NOTIFICATION_ADD_NOTIFICATIONLIST':
            return Object.assign({}, state, { list: addNotification(state.list, action.data) });
        case 'NOTIFICATION_DELETE_NOTIFICATIONLIST':
            return Object.assign({}, state, { list: deleteNotification(state.list, action.data) });
        default:
            return state;
    }
}
export default NotificationRedu;