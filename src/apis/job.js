import { request } from '../utils/request';


function list(postId) {
    return request({
        url: `/v1/jobs`,
        options: {
            method: 'GET'
        }
    });
}

function create(data) {
    return request({
        url: `/v1/jobs`,
        options: {
            method: 'POST',
            body: data
        }
    });
}

function detail(data) {
    return request({
        url: `/v1/job/${data}`,
        options: {
            method: 'GET'
        }
    });
}

function history(data) {
    return request({
        url: `/v1/job/${data}/versions`,
        options: {
            method: 'GET'
        }
    });
}

function status(data) {
    return request({
        url: `/v1/job/${data}/allocations`,
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