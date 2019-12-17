import { handleRequest } from '../utils/handleRequest';


function list(allocId) {
    return handleRequest({
        url: `/v1/allocations`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function detail(allocId) {
    return handleRequest({
        url: `/v1/allocation/${allocId}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function blockingDetail(allocId, { index = 0, wait = '2m' } = {}, { signal } = {}) {
    return handleRequest({
        url: `/v1/allocation/${allocId}?index=${index}&wait=${wait}`,
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

function stopAlloc(allocId) {
    return handleRequest({
        url: `/v1/allocation/${allocId}/stop`,
        options: {
            method: 'POST'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function restartAlloc(allocId) {
    return handleRequest({
        url: `/v1/client/allocation/${allocId}/restart`,
        options: {
            method: 'POST'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function taskLogs(id, params) {
    let initialParams = {
        task: '',
        follow: false,
        type: 'stdout',
        offset: 0,
        origin: 'end',
        plain: true
    };
    const finalParams = Object.assign({}, initialParams, params);
    const expectedDataType = finalParams.plain ? 'plain' : 'json';
    return handleRequest({
        url: `/v1/client/fs/logs/${id}?task=${finalParams.task}&follow=${finalParams.follow}&type=${finalParams.type}&offset=${finalParams.offset}&origin=${finalParams.origin}&plain=${finalParams.plain}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType
        }
    });
}

export { list, detail, taskLogs, stopAlloc, restartAlloc, blockingDetail };