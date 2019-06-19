import moment from 'moment';

function formatTime(time) {
    if (typeof time === "number") {
        let momentValue = parseInt(time.toString().substr(0, 13));
        return getPreciseTime(momentValue);
    }
    return time;
}

function getPreciseTime(time) {
    if (typeof time === "number") {
        return moment(time).format('YYYY/MM/DD HH:mm:ss');
    }
    return time;
}

export { formatTime, getPreciseTime };