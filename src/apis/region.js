// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest'

function getList() {
    return handleRequest({
        url: `/v1/regions`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

export {
    getList,
};