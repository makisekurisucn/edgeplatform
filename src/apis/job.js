// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest';
import { request } from '../utils/request';


function list(postId) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function create(data) {
    return handleRequest({
        url: `/v1/jobs`,
        options: {
            method: 'POST',
            body: data,
            expectedDataType: 'json'
        }
    });
}

function detail(data) {
    return handleRequest({
        url: `/v1/job/${data}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function history(data) {
    return handleRequest({
        url: `/v1/job/${data}/versions`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function status(data) {
    return handleRequest({
        url: `/v1/job/${data}/allocations`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function edit(data) {
    //自己写规则
    // return handleRequest({
    //     url: `/v1/job/${data}`,
    //     options: {
    //         method: 'DELETE',
    //         expectedDataType: 'json'
    //     }
    // });
    return request({
        url: `/v1/job/${data.ID}`,
        options: {
            method: 'POST',
            body: {
                // "Job": "AAAA",
                // "Job": {"Stop":false,"Region":"global","Namespace":"default","ID":"aa2","ParentID":"","Name":"aa2","Type":"service","Priority":50,"AllAtOnce":false,"Datacenters":["xidoumen"],"Constraints":[{"LTarget":"","RTarget":"false","Operand":"distinct_hosts"}],"Affinities":null,"Spreads":null,"TaskGroups":[{"Name":"aa2-group","Count":3,"Update":null,"Migrate":{"MaxParallel":1,"HealthCheck":"checks","MinHealthyTime":10000000000,"HealthyDeadline":300000000000},"Constraints":null,"RestartPolicy":{"Attempts":2,"Interval":1800000000000,"Delay":15000000000,"Mode":"fail"},"Tasks":[{"Name":"aa2-task","Driver":"docker","User":"","Config":{"image":"nginx"},"Env":null,"Services":null,"Vault":null,"Templates":null,"Constraints":null,"Affinities":null,"Resources":{"CPU":100,"MemoryMB":300,"DiskMB":0,"IOPS":0,"Networks":null,"Devices":null},"DispatchPayload":null,"Meta":null,"KillTimeout":5000000000,"LogConfig":{"MaxFiles":10,"MaxFileSizeMB":10},"Artifacts":null,"Leader":false,"ShutdownDelay":0,"KillSignal":""}],"EphemeralDisk":{"Sticky":false,"SizeMB":300,"Migrate":false},"Meta":null,"ReschedulePolicy":{"Attempts":0,"Interval":0,"Delay":30000000000,"DelayFunction":"exponential","MaxDelay":3600000000000,"Unlimited":true},"Affinities":null,"Spreads":null}],"Update":{"Stagger":0,"MaxParallel":0,"HealthCheck":"","MinHealthyTime":0,"HealthyDeadline":0,"ProgressDeadline":0,"AutoRevert":false,"AutoPromote":false,"Canary":0},"Periodic":null,"ParameterizedJob":null,"Dispatched":false,"Payload":null,"Meta":{"FOO":"BAR"},"VaultToken":"","Status":"running","StatusDescription":"","Stable":false,"Version":9,"SubmitTime":1563177260022723107,"CreateIndex":470205,"ModifyIndex":527672,"JobModifyIndex":470337}
                "Job": data
            },
            expectedDataType: 'json'
        }
    });
}

function purge(data) {
    return request({
        url: `/v1/job/${data}?purge=true`,
        options: {
            method: 'DELETE',
            expectedDataType: 'json'
        }
    });
}

export {
    list,
    create,
    detail,
    history,
    status,
    edit,
    purge
};