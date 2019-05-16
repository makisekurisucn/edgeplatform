// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest'


function list(postId) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'GET'
        }
    });
}

function create(data) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'POST',
            body: data
        }
    });
}

function detail(data) {
    return handleRequest({
        url: `/v1/job/${data}`,
        options: {
            method: 'GET'
        }
    });
}

function history(data) {
    return handleRequest({
        url: `/v1/job/${data}/versions`,
        options: {
            method: 'GET'
        }
    });
}

function status(data) {
    return handleRequest({
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