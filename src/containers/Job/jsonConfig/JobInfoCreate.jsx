import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NormalInput from '../../../components/FormController/NormalInput';
import NormalSelect from '../../../components/FormController/NormalSelect';
import KvInput from '../../../components/FormController/MultipleKvInput';
import MultipleInput from '../../../components/FormController/MultipleInput';
import NumberInput from '../../../components/FormController/NumberInput';
import PortMapInput from '../../../components/FormController/PortMapInput';
import RestartPolicy from '../../../components/FormController/RestartPolicy';
import KvItem from '../../../components/KvItem';
import CoveredKvItem from '../../../components/KvItem/CoveredKvItem';
import FadeWrap from '../../../components/FadeWrap';


const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        padding: '27px 14%'
    },
    prevRoot: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '27px 35px'
    },
    marginBottom: {
        marginBottom: '28px'
    },
    kvItem: {
        marginBottom: 25,
        color: 'rgb(116, 116, 116)'
    },
    hidden: {
        overflow: 'hidden',
        boxSizing: 'border-box',
        height: '100%'
    }
});

const drives = [
    {
        value: 'docker',
        display: 'Docker'
    },
    // {
    //     value: 'exec',
    //     display: 'Isolated Fork/Exec'
    // },
    // {
    //     value: 'java',
    //     display: 'Java'
    // },
    {
        value: 'qemu',
        display: 'Qemu'
    },
    // {
    //     value: 'raw_exec',
    //     display: 'Raw Fork/Exec'
    // },
    // {
    //     value: 'rkt',
    //     display: 'Rkt'
    // },
    // {
    //     value: 'lxc',
    //     display: 'Lxc'
    // },
    // {
    //     value: 'Singularity',
    //     display: 'Singularity'
    // },
    // {
    //     value: 'jail-task-driver',
    //     display: 'Jailtask driver'
    // }
]

const TASKS_DRIVER = "Tasks-Driver",
    TASKS_CONFIG_IMAGE = "Tasks-Config-image",
    TASKS_RESOURCES_CPU = "Tasks-Resouces-CPU",
    TASKS_RESOURCES_MEMORYMB = "Tasks-Resources-MemoryMB",
    PORTMAPPING = "PortMapping",
    TASKS_CONFIG_COMMAND = "Tasks-Config-command",
    TASKS_CONFIG_ARGS = "Tasks-Config-args",
    TASKS_ENV = "Tasks-Env";

const DISPLAY = 'display', UPLOAD = 'upload', DynamicPorts = 'DynamicPorts', ReservedPorts = 'ReservedPorts';

const kvMap = {
    docker: 'Docker',
    exec: 'Isolated Fork/Exec',
    java: 'Java',
    qemu: 'Qemu',
    raw_exec: 'Raw Fork/Exec',
    rkt: 'Rkt',
    lxc: 'Lxc',
    Singularity: 'Singularity',
    "jail-task-driver": 'Jailtask driver'
}

function processWrap(func, ...values) {
    return function (data, usingType) {
        return func(data, usingType, values);
    }
}

function multipleKVProcess(kvData = [], usingType) {
    if (usingType === DISPLAY) {
        let resArr = [];
        kvData.forEach((item) => {
            resArr.push(`${item.key}=${item.value}`);
        })
        return resArr.join('\n');
    } else if (usingType === UPLOAD) {
        let resObj = {};
        kvData.forEach((item) => {
            resObj[item.key] = item.value;
        })
        return resObj;
    }
}

function reverseMultipleKVProcess(data = {}) {
    let resArr = [];
    if (data === null) {
        return [];
    }
    for (let key in data) {
        resArr.push({ key: key, value: data[key] });
    }
    return resArr;
}

function multipleValueProcess(data = [], usingType) {
    let resArr = [];
    data.forEach((item) => {
        resArr.push(`${item.value}`);
    })
    if (usingType === DISPLAY) {
        return resArr.join('\n');
    } else if (usingType === UPLOAD) {
        return resArr;
    }
}

function reverseMultipleValueProcess(data = []) {
    let resArr = [];
    data && data.forEach((item) => {
        resArr.push({ value: item });
    })
    return resArr;
}

function portMappingProcess(data = [], usingType) {
    if (usingType === DISPLAY) {
        let resArr = [];
        data.forEach((item) => {
            resArr.push(`${item.LValue} ->${item.mapping.display} ${item.RValue}`);
        })
        return resArr.join('\n');
    } else if (usingType === UPLOAD) {
        let resObj = {
            port_map: [],
            Services: [],
            Networks: [{
                DynamicPorts: [],
                ReservedPorts: []
            }]
        };
        data.forEach((item, index) => {
            const portLabel = item.Label || `port${index}`;
            if (item.mapping.value === DynamicPorts) {
                resObj.port_map.push({ [portLabel]: item.LValue });
                resObj.Services.push({ Name: portLabel, PortLabel: portLabel });
                resObj.Networks[0].DynamicPorts.push({ Label: portLabel, Value: 0 });
            } else if (item.mapping.value === ReservedPorts) {
                resObj.port_map.push({ [portLabel]: item.LValue });
                resObj.Services.push({ Name: portLabel, PortLabel: portLabel });
                resObj.Networks[0].ReservedPorts.push({ Label: portLabel, Value: item.RValue });
            }
        })
        return resObj;
    }

}

function reversePortMappingProcess({ services = [], portMap = [], networks = [] } = {}) {
    let labelMap = {};
    let resArr = [];
    portMap && portMap.forEach((item) => {
        for (let key in item) {
            labelMap[key] = item[key];
        }
    })
    networks && networks.forEach((network) => {
        network.DynamicPorts && network.DynamicPorts.forEach((dynamicPort) => {
            resArr.push({ LValue: labelMap[dynamicPort.Label], RValue: '', mapping: { value: 'DynamicPorts', display: '随机映射' }, Label: dynamicPort.Label })
        })
        network.ReservedPorts && network.ReservedPorts.forEach((reservedPort) => {
            resArr.push({ LValue: labelMap[reservedPort.Label], RValue: reservedPort.Value, mapping: { value: 'ReservedPorts', display: '静态映射' }, Label: reservedPort.Label })
        })
    })
    return resArr;
}


function numberProcess(data, usingType, unit) {
    if (usingType === DISPLAY) {
        return `${data}${unit}`;
    } else if (usingType === UPLOAD) {
        return data;
    }
}

function normalProcess(data, usingType) {
    if (usingType === DISPLAY) {
        return kvMap[data] || data;
    } else if (usingType === UPLOAD) {
        return data;
    }
}

const stanzaList = [
    {
        name: TASKS_DRIVER,
        title: '运行时',
        options: drives,
        dataProcess: processWrap(normalProcess),
        component: NormalSelect,
        rules: {
            required: true
        }
    },
    {
        name: TASKS_CONFIG_IMAGE,
        title: '镜像',
        dataProcess: processWrap(normalProcess),
        component: NormalInput,
        rules: {
            required: true
        }
    },
    {
        name: TASKS_RESOURCES_CPU,
        title: 'CPU',
        dataProcess: processWrap(numberProcess, 'MHz'),
        component: NumberInput,
        rules: {
            step: 100,
            maxValue: '',
            minValue: 0,
            unit: 'MHz'
        }
    },
    {
        name: TASKS_RESOURCES_MEMORYMB,
        title: '内存',
        dataProcess: processWrap(numberProcess, 'MB'),
        component: NumberInput,
        rules: {
            step: 128,
            maxValue: '',
            minValue: 0,
            unit: 'MB'
        }
    },
    {
        name: PORTMAPPING,
        title: '端口映射',
        dataProcess: processWrap(portMappingProcess),
        component: PortMapInput,
        rules: {}
    },
    {
        name: TASKS_CONFIG_COMMAND,
        title: '启动命令',
        dataProcess: processWrap(normalProcess),
        component: NormalInput,
        rules: {}
    },
    {
        name: TASKS_CONFIG_ARGS,
        title: '启动参数',
        hint: '请输入参数',
        dataProcess: processWrap(multipleValueProcess),
        component: MultipleInput,
        rules: {}
    },
    {
        name: TASKS_ENV,
        title: '环境变量',
        dataProcess: processWrap(multipleKVProcess),
        component: KvInput,
        rules: {}
    }
]

class JobInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllValid: false,
            [TASKS_DRIVER]: {
                isValid: false,
                data: props.data.json.TaskGroups[0].Tasks[0].Driver
            },
            [TASKS_CONFIG_IMAGE]: {
                isValid: false,
                data: props.data.json.TaskGroups[0].Tasks[0].Config.image
            },
            [TASKS_RESOURCES_CPU]: {
                isValid: false,
                data: props.data.json.TaskGroups[0].Tasks[0].Resources.CPU
            },
            [TASKS_RESOURCES_MEMORYMB]: {
                isValid: false,
                data: props.data.json.TaskGroups[0].Tasks[0].Resources.MemoryMB
            },
            [PORTMAPPING]: {
                isValid: false,
                data: reversePortMappingProcess({
                    services: props.data.json.TaskGroups[0].Tasks[0].Config.image,
                    portMap: props.data.json.TaskGroups[0].Tasks[0].Config.port_map,
                    networks: props.data.json.TaskGroups[0].Tasks[0].Resources.Networks
                })
            },
            [TASKS_CONFIG_COMMAND]: {
                isValid: false,
                data: props.data.json.TaskGroups[0].Tasks[0].Config.command
            },
            [TASKS_CONFIG_ARGS]: {
                isValid: false,
                data: reverseMultipleValueProcess(props.data.json.TaskGroups[0].Tasks[0].Config.args)
            },
            [TASKS_ENV]: {
                isValid: false,
                data: reverseMultipleKVProcess(props.data.json.TaskGroups[0].Tasks[0].Env)
            }
        };
        this.dataSet = props.data.json
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stepPosition === 0 && this.props.stepPosition !== 0) {
            if (this.props.updateData && this.props.dataName) {
                this.props.updateData(this.props.dataName, undefined, this.state.isAllValid);
            }
        }
    }

    saveData = (name, result) => {
        if (this.dataSet) {
            switch (name) {
                case TASKS_DRIVER:
                    this.dataSet.TaskGroups[0].Tasks[0].Driver = normalProcess(result.data, UPLOAD);
                    break;
                case TASKS_CONFIG_IMAGE:
                    this.dataSet.TaskGroups[0].Tasks[0].Config.image = normalProcess(result.data, UPLOAD);
                    break;
                case TASKS_RESOURCES_CPU:
                    this.dataSet.TaskGroups[0].Tasks[0].Resources.CPU = numberProcess(result.data, UPLOAD);
                    break;
                case TASKS_RESOURCES_MEMORYMB:
                    this.dataSet.TaskGroups[0].Tasks[0].Resources.MemoryMB = numberProcess(result.data, UPLOAD);
                    break;
                case PORTMAPPING:
                    const portMapData = portMappingProcess(result.data, UPLOAD);
                    this.dataSet.TaskGroups[0].Tasks[0].Config.port_map = portMapData.port_map;
                    this.dataSet.TaskGroups[0].Tasks[0].Resources.Networks = portMapData.Networks;
                    this.dataSet.TaskGroups[0].Tasks[0].Services = portMapData.Services;
                    break;
                case TASKS_CONFIG_COMMAND:
                    this.dataSet.TaskGroups[0].Tasks[0].Config.command = normalProcess(result.data, UPLOAD);
                    break;
                case TASKS_CONFIG_ARGS:
                    this.dataSet.TaskGroups[0].Tasks[0].Config.args = multipleValueProcess(result.data, UPLOAD);
                    break;
                case TASKS_ENV:
                    this.dataSet.TaskGroups[0].Tasks[0].Env = multipleKVProcess(result.data, UPLOAD);
                    break;
                default: ;
            }
        }

        this.setState((state, props) => {
            let newOriginalData = Object.assign({}, state, { [name]: result });
            delete newOriginalData.isAllValid;

            let newIsAllValid = true;
            for (let key in newOriginalData) {
                if (newOriginalData[key].isValid === false) {
                    newIsAllValid = false;
                }
            }
            if (props.updateData && props.dataName) {
                props.updateData(props.dataName, undefined, newIsAllValid);
            }
            return {
                isAllValid: newIsAllValid,
                [name]: result
            }
        })
    }

    render() {
        const { classes, stepPosition } = this.props;

        let rootWrap = classes.root;
        if (stepPosition === 1) {
            rootWrap += ' ' + classes.hidden;
        }

        const style = {
            keyName: {
                fontSize: '16px',
                fontWeight: '400',
                marginBottom: '3px'
            },
            value: {
                fontSize: '14px',
                fontWeight: '300',
                whiteSpace: 'pre-line',
                wordBreak: 'break-all'
            }
        }

        let dataSet = Object.assign({}, this.state);
        delete dataSet.isAllValid;

        return (
            <div className={rootWrap}>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition !== -1} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                let value = item.dataProcess(dataSet[item.name].data, DISPLAY);
                                if (value === '' || value === undefined) {
                                    return null
                                } else {
                                    return (
                                        <KvItem key={item.name} keyName={item.title} className={classes.kvItem} value={value} style={style} />
                                    )
                                }
                            })
                        }

                    </FadeWrap>
                </div>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition !== 0} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                return (
                                    <item.component
                                        key={item.name}
                                        className={classes.marginBottom}
                                        name={item.name}
                                        title={item.title}
                                        hint={item.hint}
                                        rules={item.rules}
                                        options={item.options}
                                        defaultValue={dataSet[item.name].data}
                                        saveData={this.saveData}
                                    />
                                )
                            })
                        }
                        <RestartPolicy title={'重启策略'} />
                    </FadeWrap>
                </div>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition !== 1} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                return (
                                    <CoveredKvItem key={index} className={classes.kvItem} />
                                )
                            })
                        }
                    </FadeWrap>
                </div>
            </div>
        )
    }
}
JobInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(JobInfo);