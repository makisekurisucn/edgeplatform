// import { request } from '../utils/request';
import { request } from '../utils/request'


function getCPUUtilization(nodeID, DC) {
    const endTimestamp = Math.floor(new Date().valueOf() / 10000) * 10000;
    const startTimestamp = new Date(endTimestamp - 3600000).valueOf();

    // let label=`{}`
    return request({
        // url: `/api/v1/query_range?query=nomad_client_host_cpu_total{nodeID='${nodeID}',DC='${DC}'}&start=${startTimestamp/1000}&end=${endTimestamp/1000}&step=10`,
        url: `/api/v1/query_range?query=nomad_client_host_cpu_total{node_id='${nodeID}',datacenter='${DC}'}&start=${startTimestamp/1000}&end=${endTimestamp/1000}&step=10`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}


function getDiskUtilization(nodeID, DC) {
    const endTimestamp = Math.floor(new Date().valueOf() / 10000) * 10000;
    const startTimestamp = new Date(endTimestamp - 3600000).valueOf();
    // let label=`{}`
    return request({
        url: `/api/v1/query_range?query=nomad_client_host_disk_used{node_id='${nodeID}',datacenter='${DC}'}&start=${startTimestamp/1000}&end=${endTimestamp/1000}&step=10`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function getMemoryUtilization(nodeID, DC) {
    const endTimestamp = Math.floor(new Date().valueOf() / 10000) * 10000;
    const startTimestamp = new Date(endTimestamp - 3600000).valueOf();
    // let label=`{}`
    return request({
        url: `/api/v1/query_range?query=nomad_client_host_memory_used{node_id='${nodeID}',datacenter='${DC}'}&start=${startTimestamp/1000}&end=${endTimestamp/1000}&step=10`,
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