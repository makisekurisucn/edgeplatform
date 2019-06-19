// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest';
import { request } from '../utils/request';


function list(postId) {
    return handleRequest({
        url: `/v1/allocations`,
        options: {
            method: 'GET',
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
    return request({
        url: `/v1/client/fs/logs/${id}?task=${finalParams.task}&follow=${finalParams.follow}&type=${finalParams.type}&offset=${finalParams.offset}&origin=${finalParams.origin}&plain=${finalParams.plain}`,
        options: {
            method: 'GET',
            expectedDataType
        }
    });
}

export { list, taskLogs };