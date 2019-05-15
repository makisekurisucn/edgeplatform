import { request } from '../utils/request';
import { getRegion } from '../utils/crossRegion';


function list(postId) {
    return request({
        url: `/v1/jobs` + getRegion(),
        options: {
            method: 'GET'
        }
    });
}

function create(data) {
    return request({
        url: `/v1/jobs` + getRegion(),
        options: {
            method: 'POST',
            body: data
        }
    });
}

function detail(data) {
    return request({
        url: `/v1/job/${data}` + getRegion(),
        options: {
            method: 'GET'
        }
    });
}

function history(data) {
    return request({
        url: `/v1/job/${data}/versions` + getRegion(),
        options: {
            method: 'GET'
        }
    });
}

function status(data) {
    return request({
        url: `/v1/job/${data}/allocations` + getRegion(),
        options: {
            method: 'GET'
        }
    });
}

export {
    list,
    create,
    detail,
    history,
    status
};