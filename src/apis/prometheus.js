// import { request } from '../utils/request';
import { request } from '../utils/request';
import { transformTimeFromStrToNum as transformTime } from '../utils/formatTime';


function getNodeCPUUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_host_cpu_total{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}


function getNodeDiskUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_host_disk_used{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function getNodeMemoryUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_host_memory_used{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function getTaskCPUUtilization(allocID, taskName, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_allocs_cpu_total_percent{alloc_id='${allocID}',task='${taskName}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function getTaskMemoryUtilization(allocID, taskName, duration) {
    const result = transformTime(duration);

    return request({
        url: `/api/v1/query_range?query=nomad_client_allocs_memory_kernel_usage{alloc_id='${allocID}',task='${taskName}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}



export {
    getNodeCPUUtilization,
    getNodeDiskUtilization,
    getNodeMemoryUtilization,
    getTaskCPUUtilization,
    getTaskMemoryUtilization
    // getNetworkUtilization
};