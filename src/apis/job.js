// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest'


function list(postId) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function create(data) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'POST',
            body: data,
            expectedDataType: 'json'
        }
    });
}

function detail(data) {
    return handleRequest({
        url: `/v1/job/${data}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function history(data) {
    return handleRequest({
        url: `/v1/job/${data}/versions`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function status(data) {
    return handleRequest({
        url: `/v1/job/${data}/allocations`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
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