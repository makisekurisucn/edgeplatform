import { handleRequest } from '../utils/handleRequest'

function verifyToken(data) {
    return handleRequest({
        url: `/v1/acl/token/self`,
        options: {
            method: 'GET',
            headers: {
                'X-Nomad-Token': data
            }
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}


export {
    verifyToken
};