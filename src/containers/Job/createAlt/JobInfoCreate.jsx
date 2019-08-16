import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NormalInput from '../../../components/FormController/NormalInput';
import NormalSelect from '../../../components/FormController/NormalSelect';
import KvInput from '../../../components/FormController/MultipleKvInput';
import MultipleInput from '../../../components/FormController/MultipleInput';
import NumberInput from '../../../components/FormController/NumberInput';
import PortMapInput from '../../../components/FormController/PortMapInput';
import KvItem from '../../../components/KvItem';
import CoveredKvItem from '../../../components/KvItem/CoveredKvItem';
import FadeWrap from '../../../components/FadeWrap';


const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
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
        // paddingLeft: '24px'
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
            const portLabel = `port${index}`;
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
            step: 128,
            maxValue: 512,
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
            maxValue: 1280,
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
                data: undefined
            },
            [TASKS_CONFIG_IMAGE]: {
                isValid: false,
                data: undefined
            },
            [TASKS_RESOURCES_CPU]: {
                isValid: false,
                data: undefined
            },
            [TASKS_RESOURCES_MEMORYMB]: {
                isValid: false,
                data: undefined
            },
            [PORTMAPPING]: {
                isValid: false,
                data: undefined
            },
            [TASKS_CONFIG_COMMAND]: {
                isValid: false,
                data: undefined
            },
            [TASKS_CONFIG_ARGS]: {
                isValid: false,
                data: undefined
            },
            [TASKS_ENV]: {
                isValid: false,
                data: undefined
            }
        };
        this.dataSet = {
            TaskGroups: [{
                Name: '',
                Count: 1,
                Tasks: [{
                    Name: '',
                    Driver: '',
                    Config: {
                        args: ['', ''],
                        command: '',
                        image: '',
                        port_map: [{
                            'db': '6379'
                        }]
                    },
                    Env: {
                        '': '',
                        '': ''
                    },
                    Services: [{
                        Name: '',
                        PortLabel: ''
                    }],
                    Resources: {
                        CPU: '',
                        MemoryMB: '',
                        Networks: [{
                            DynamicPorts: [{
                                Label: 'db',
                                Value: 0
                            }]
                        }]
                    }
                }]
            }]
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stepPosition == 0 && this.props.stepPosition !== 0) {
            let newDataSet = Object.assign({}, this.state);
            delete newDataSet.isAllValid;

            if (this.props.updateData && this.props.dataName) {
                this.props.updateData(this.props.dataName, newDataSet, this.state.isAllValid);
            }
            // this.props.updataStatus(this.state.isAllValid)
        }
    }

    saveData = (name, result) => {
        let newOriginalData = Object.assign({}, this.state, { [name]: result });
        delete newOriginalData.isAllValid;

        let newIsAllValid = true;
        for (let key in newOriginalData) {
            if (newOriginalData[key].isValid == false) {
                newIsAllValid = false;
            }
        }
        this.setState({
            isAllValid: newIsAllValid,
            [name]: result
        })
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

        if (newIsAllValid == true) {
            console.log(this.dataSet)
        }

        if (this.props.updateData && this.props.dataName) {
            this.props.updateData(this.props.dataName, Object.assign({}, this.dataSet), newIsAllValid);
        }
    }

    render() {
        const { classes, className, stepPosition } = this.props;

        let rootWrap = classes.root;
        // if (stepPosition > 0) {
        if (stepPosition == 1) {
            rootWrap += ' ' + classes.hidden;
        }

        const style = {
            keyName: {
                fontSize: '14px',
                fontWeight: '300',
                marginBottom: '3px'
            },
            value: {
                paddingLeft: '9px',
                fontSize: '16px',
                fontWeight: '400',
                whiteSpace: 'pre-line',
                wordBreak: 'break-all'
            }
        }

        let dataSet = Object.assign({}, this.state);
        delete dataSet.isAllValid;

        return (
            <div className={rootWrap}>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition != -1} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                let value = item.dataProcess(dataSet[item.name].data, DISPLAY);
                                if (value == '' || value == undefined) {
                                } else {
                                    return (
                                        <KvItem key={item.name} keyName={item.title} className={classes.kvItem} value={value} style={style} />
                                    )
                                }
                            })
                        }
                        {/* <KvItem keyName="运行时" className={classes.kvItem} value={kvMap[dataSet[TASKS_DRIVER].data]} style={style} />
                        <KvItem keyName="镜像" className={classes.kvItem} value={dataSet[TASKS_CONFIG_IMAGE].data} style={style} />
                        <KvItem keyName="CPU" className={classes.kvItem} value={numberProcess(dataSet[TASKS_RESOURCES_CPU].data, 'MHz')} style={style} />
                        <KvItem keyName="内存" className={classes.kvItem} value={numberProcess(dataSet[TASKS_RESOURCES_MEMORYMB].data, 'MB')} style={style} />
                        <KvItem keyName="端口映射" className={classes.kvItem} value={portMappingProcess(dataSet[PORTMAPPING].data)} style={style} />
                        <KvItem keyName="启动命令" className={classes.kvItem} value={dataSet[TASKS_CONFIG_COMMAND].data} style={style} />
                        <KvItem keyName="启动参数" className={classes.kvItem} value={multipleValueProcess(dataSet[TASKS_CONFIG_ARGS].data)} style={style} />
                        <KvItem keyName="环境变量" className={classes.kvItem} value={multipleKVProcess(dataSet[TASKS_ENV].data)} style={style} /> */}

                    </FadeWrap>
                </div>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition != 0} from={'right'} to={'left'}>
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
                        {/* <NormalSelect className={classes.marginBottom} name={TASKS_DRIVER} title={'运行时'} options={drives} defaultValue={dataSet[TASKS_DRIVER].data} required saveData={this.saveData} />
                        <NormalInput className={classes.marginBottom} name={TASKS_CONFIG_IMAGE} title={'镜像'} required saveData={this.saveData} defaultValue={dataSet[TASKS_CONFIG_IMAGE].data} />
                        <NumberInput className={classes.marginBottom} name={TASKS_RESOURCES_CPU} title={'CPU'} unit={'MHz'} defaultValue={dataSet[TASKS_RESOURCES_CPU].data} rules={{ step: 128, maxValue: 512, minValue: 0 }} saveData={this.saveData} />
                        <NumberInput className={classes.marginBottom} name={TASKS_RESOURCES_MEMORYMB} title={'内存'} unit={'MB'} defaultValue={dataSet[TASKS_RESOURCES_MEMORYMB].data} rules={{ step: 128, maxValue: 1280, minValue: 0 }} saveData={this.saveData} />
                        <PortMapInput className={classes.marginBottom} name={PORTMAPPING} title={'端口映射'} defaultValue={dataSet[PORTMAPPING].data} saveData={this.saveData} />
                        <NormalInput className={classes.marginBottom} name={TASKS_CONFIG_COMMAND} title={'启动命令'} defaultValue={dataSet[TASKS_CONFIG_COMMAND].data} saveData={this.saveData} />
                        <MultipleInput className={classes.marginBottom} name={TASKS_CONFIG_ARGS} title={'启动参数'} defaultValue={dataSet[TASKS_CONFIG_ARGS].data} hint={'请输入参数'} saveData={this.saveData} />
                        <KvInput className={classes.marginBottom} name={TASKS_ENV} title={'环境变量'} defaultValue={dataSet[TASKS_ENV].data} saveData={this.saveData} /> */}
                    </FadeWrap>
                </div>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition != 1} from={'right'} to={'left'}>
                        {/* <KvItem keyName="运行时" className={classes.kvItem} value={kvMap[dataSet[TASKS_DRIVER].data]} style={style} />
                        <KvItem keyName="镜像" className={classes.kvItem} value={dataSet[TASKS_CONFIG_IMAGE].data} style={style} /> */}
                        {
                            stanzaList.map((item, index) => {
                                return (
                                    <CoveredKvItem key={index} className={classes.kvItem} />
                                )
                            })
                        }
                        {/* <CoveredKvItem className={classes.kvItem} />
                        <CoveredKvItem className={classes.kvItem} />
                        <CoveredKvItem className={classes.kvItem} />
                        <CoveredKvItem className={classes.kvItem} />
                        <CoveredKvItem className={classes.kvItem} />
                        <CoveredKvItem className={classes.kvItem} />
                        <CoveredKvItem className={classes.kvItem} />
                        <CoveredKvItem className={classes.kvItem} /> */}
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