// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest'


function list(postId) {
    return handleRequest({
        url: `/v1/allocations`,
        options: {
            method: 'GET'
        }
    });
}

export { list };