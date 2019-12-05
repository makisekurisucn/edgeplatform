// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest';
import { transformTimeFromStrToNum as transformTime } from '../utils/formatTime';


function getNodeCPUUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_host_cpu_total{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}


function getNodeDiskUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_host_disk_used{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getNodeMemoryUtilization(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_host_memory_used{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getNodeAllocatedCPU(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_allocated_cpu{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getNodeUnallocatedCPU(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_unallocated_cpu{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getNodeAllocatedDisk(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_allocated_disk{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getNodeUnallocatedDisk(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_unallocated_disk{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getNodeAllocatedMemory(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_allocated_memory{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getNodeUnallocatedMemory(nodeID, DC, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_unallocated_memory{node_id='${nodeID}',datacenter='${DC}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getTaskCPUUtilization(allocID, taskName, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_allocs_cpu_total_percent{alloc_id='${allocID}',task='${taskName}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}

function getTaskMemoryUtilization(allocID, taskName, duration) {
    const result = transformTime(duration);

    return handleRequest({
        url: `/api/v1/query_range?query=nomad_client_allocs_memory_rss{alloc_id='${allocID}',task='${taskName}'}&start=${result.start/1000}&end=${result.end/1000}&step=${result.step}`,
        options: {
            method: 'GET'
        },
        customizedConf: {
            expectedDataType: 'json'
        }
    });
}



export {
    getNodeCPUUtilization,
    getNodeDiskUtilization,
    getNodeMemoryUtilization,
    getNodeAllocatedCPU,
    getNodeUnallocatedCPU,
    getNodeAllocatedDisk,
    getNodeUnallocatedDisk,
    getNodeAllocatedMemory,
    getNodeUnallocatedMemory,
    getTaskCPUUtilization,
    getTaskMemoryUtilization
    // getNetworkUtilization
};