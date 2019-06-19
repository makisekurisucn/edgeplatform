// import { request } from '../utils/request';
import { request } from '../utils/request';
import { transformTimeFromStrToNum as transformTime } from '../utils/formatTime';


function getCPUUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_host_cpu_total{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}


function getDiskUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_host_disk_used{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function getMemoryUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_host_memory_used{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}



export {
    getCPUUtilization,
    getDiskUtilization,
    getMemoryUtilization,
    // getNetworkUtilization
};