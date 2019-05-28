// import { request } from '../utils/request';
import { request } from '../utils/request'


function getCPUUtilization(nodeID,DC,cpu,step=10) {
    const endTimestamp=new Date().valueOf();
    const startTimestamp=new Date(endTimestamp-3600000).valueOf();

    let label=`{}`
    return request({
        // url: `/api/v1/query_range?query=nomad_client_host_cpu_total{nodeID='${nodeID}',DC='${DC}'}&start=${startTimestamp/1000}&end=${endTimestamp/1000}&step=10`,
        url: `/api/v1/query_range?query=nomad_client_host_cpu_total&start=${startTimestamp/1000}&end=${endTimestamp/1000}&step=10`,
        options: {
            method: 'GET'
        }
    });
}


function getDiskUtilization(nodeID,DC,disk) {
    let label=`{}`
    return request({
        url: `/api/v1/query_range?query=nomad_client_host_disk_used`,
        options: {
            method: 'GET'
        }
    });
}

function getMemoryUtilization(nodeID,DC) {
    let label=`{}`
    return request({
        url: `/api/v1/query_range?query=nomad_client_host_memory_used`,
        options: {
            method: 'GET'
        }
    });
}

function getNetworkUtilization(nodeID,DC) {
    let label=`{}`
    return request({
        // url: `/api/v1/query_range?query=nomad_client_host_memory_used`,    待定，没有找到合适的字段
        options: {
            method: 'GET'
        }
    });
}

export {
    getCPUUtilization,
    getDiskUtilization,
    getMemoryUtilization,
    getNetworkUtilization
};