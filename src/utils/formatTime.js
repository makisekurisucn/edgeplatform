import moment from 'moment';

function formatTime(time){
    if (typeof time === "number") {
        let momentValue = parseInt(time.toString().substr(0, 13));
        return moment(momentValue).format('MMMM Do YYYY, h:mm:ss a');
    }
    return time;
}

export {formatTime};