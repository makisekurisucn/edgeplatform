import { request } from '../utils/request';

function getList() {
    return request({
        url: `/v1/regions`,
        options: {
            method: 'GET'
        }
    });
}

export {
    getList,
};