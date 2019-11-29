import moment from 'moment';

function formatTime(time = 0) {
    let momentValue = parseInt(time.toString().substr(0, 13));
    return getPreciseTime(momentValue);
}

function getPreciseTime(time) {
    return moment(time).format('YYYY/MM/DD HH:mm:ss');
}

function getAutoFormattedTime(time) {
    let date = new Date(time);
    let now = new Date();
    if (now.getFullYear() !== date.getFullYear()) {
        return moment(date).format('YYYY/MM/DD HH:mm:ss');
    } else if (now.getMonth() !== date.getMonth() || now.getDate() !== date.getDate()) {
        return moment(date).format('MM/DD HH:mm:ss');
    } else {
        return moment(date).format('HH:mm:ss');
    }
}

function transformTimeFromStrToNum(timeStr) {
    if (typeof timeStr === 'string') {
        let duration = 0;
        //字符串转换为以秒为单位的数字
        if (timeStr.indexOf('day') > -1) {
            duration = (parseFloat(timeStr) * 24 * 3600).toFixed(0);
        } else if (timeStr.indexOf('hour') > -1) {
            duration = (parseFloat(timeStr) * 3600).toFixed(0);
        } else if (timeStr.indexOf('minute') > -1) {
            duration = (parseFloat(timeStr) * 60).toFixed(0);
        } else if (timeStr.indexOf('second') > -1) {
            duration = parseInt(timeStr);
        } else {
            duration = 1800; //默认半小时
        }

        let step = (duration / 360).toFixed(0); //取约360个点
        const endTimestamp = Math.floor(new Date().valueOf() / (step * 1000)) * (step * 1000);
        const startTimestamp = new Date(endTimestamp - duration * 1000).valueOf();
        return {
            step, //秒为单位
            end: endTimestamp, //毫秒为单位
            start: startTimestamp //毫秒为单位
        };
    } else {
        const endTimestamp = Math.floor(new Date().valueOf() / 5000) * 5000;
        return {
            step: 5, //秒为单位
            end: endTimestamp, //毫秒为单位
            start: new Date(endTimestamp - 1800000).valueOf() //毫秒为单位
        };
    }
}

export { formatTime, getPreciseTime, transformTimeFromStrToNum, getAutoFormattedTime };