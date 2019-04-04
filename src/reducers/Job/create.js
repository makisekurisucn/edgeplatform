const initialState = {
    json: {
        "Job": {
            "ID": "<>",
            "Name": "<请输入名称>",
            "Type": "service",
            "Priority": 50,
            "Datacenters": [
                "dc1"
            ],
            "TaskGroups": [{
                "Name": "<请输入组名>",
                "Count": 1,
                // "Migrate": {
                //         "HealthCheck": "checks",
                //         "HealthyDeadline": 300000000000,
                //         "MaxParallel": 1,
                //         "MinHealthyTime": 10000000000
                // },
                "Tasks": [{
                    "Name": "<请输入 task 名称>",
                    "Driver": "docker",
                    "User": "",
                    "Config": {
                        "image": "<请输入镜像>",
                        "port_map": [{
                            "<port名称>": 0
                        }]
                    },
                    "Services": [{
                        "Id": "",
                        "Name": "<service 名称>",
                        "Tags": [
                            "<设置tag>"
                        ],
                        // "PortLabel": "db",
                        "AddressMode": "",
                        // "Checks": [{
                        //     "Id": "",
                        //     "Name": "alive",
                        //     "Type": "tcp",
                        //     "Command": "",
                        //     "Args": null,
                        //     "Header": {},
                        //     "Method": "",
                        //     "Path": "",
                        //     "Protocol": "",
                        //     "PortLabel": "",
                        //     "Interval": 10000000000,
                        //     "Timeout": 2000000000,
                        //     "InitialStatus": "",
                        //     "TLSSkipVerify": false,
                        //     "CheckRestart": {
                        //         "Limit": 3,
                        //         "Grace": 30000000000,
                        //         "IgnoreWarnings": false
                        //     }
                        // }]
                    }],
                    "Resources": {
                        "CPU": 500,
                        "MemoryMB": 256,
                        "Networks": [{
                            // "Device": "",
                            // "CIDR": "",
                            // "IP": "",
                            "MBits": 10,
                            "DynamicPorts": [{
                                "Label": "db",
                                "Value": 0
                            }]
                        }]
                    },
                    // "Leader": false
                }],
                // "RestartPolicy": {
                //     "Interval": 1800000000000,
                //     "Attempts": 2,
                //     "Delay": 15000000000,
                //     "Mode": "fail"
                // },
                // "ReschedulePolicy": {
                //     "Attempts": 10,
                //     "Delay": 30000000000,
                //     "DelayFunction": "exponential",
                //     "Interval": 0,
                //     "MaxDelay": 3600000000000,
                //     "Unlimited": true
                // },
            }],
            // "Update": {
            //     "MaxParallel": 1,
            //     "MinHealthyTime": 10000000000,
            //     "HealthyDeadline": 180000000000,
            //     "AutoRevert": false,
            //     "Canary": 0
            // }
        }
    },
    loading: false,
    success: false
    };
    const JobRedu = (state = initialState, action) => {
      // alert(action.type);
      switch(action.type) {
        case 'JOB_CREATE_START':
          return Object.assign({}, state, {loading: true});
        case 'JOB_CREATE_INIT':
            return Object.assign({}, state, initialState);
        case 'JOB_CREATE_SUCCESS':
            return Object.assign({}, state, {loading: false, success: true});
        case 'JOB_CREATE_FAIL':
            return Object.assign({}, state, {loading: false, success: false, errMsg:action.error});
        default: 
          return state;
      }
    }
    export default JobRedu;