// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest';
import { request } from '../utils/request';


function list(postId) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function blockingList({ index = 0, wait = '2m' } = {}, { signal } = {}) {
    return handleRequest({
        url: `/v1/jobs?index=${index}&wait=${wait}`,
        options: {
            method: 'GET',
            signal
        },
        customizedConf: {
            expectedDataType: 'json',
            canIgnoreError: true
        }
    });
}

function create(data) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'POST',
            body: data
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function detail(data) {
    return handleRequest({
        url: `/v1/job/${data}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function blockingDetail(data, { index = 0, wait = '2m' } = {}, { signal } = {}) {
    return handleRequest({
        url: `/v1/job/${data}?index=${index}&wait=${wait}`,
        options: {
            method: 'GET',
            signal
        },
        customizedConf: {
            expectedDataType: 'json',
            canIgnoreError: true
        }
    });
}

function history(data) {
    return handleRequest({
        url: `/v1/job/${data}/versions`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function status(data) {
    return handleRequest({
        url: `/v1/job/${data}/allocations`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function edit(id, data) {
    return handleRequest({
        url: `/v1/job/${id}`,
        options: {
            method: 'POST',
            body: data
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function purge(data) {
    return handleRequest({
        url: `/v1/job/${data}?purge=true`,
        options: {
            method: 'DELETE'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

export {
    list,
    blockingList,
    create,
    detail,
    blockingDetail,
    history,
    status,
    edit,
    purge
};