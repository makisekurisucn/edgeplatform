import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NormalInput from '../../../components/FormController/NormalInput';
import NormalSelect from '../../../components/FormController/NormalSelect';
import KvInput from '../../../components/FormController/MultipleKvInput';
import MultipleInput from '../../../components/FormController/MultipleInput';
import NumberInput from '../../../components/FormController/NumberInput';
import PortMapInput from '../../../components/FormController/PortMapInput';
import KvItem from '../../../components/KvItem';


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
        color: 'rgb(68, 105, 128)'
        // paddingLeft: '24px'
    }
});

const drives = [
    {
        value: 'docker',
        display: 'Docker'
    },
    {
        value: 'exec',
        display: 'Isolated Fork/Exec'
    },
    {
        value: 'java',
        display: 'Java'
    },
    {
        value: 'qemu',
        display: 'Qemu'
    },
    {
        value: 'raw_exec',
        display: 'Raw Fork/Exec'
    },
    {
        value: 'rkt',
        display: 'Rkt'
    },
    {
        value: 'lxc',
        display: 'Lxc'
    },
    {
        value: 'Singularity',
        display: 'Singularity'
    },
    {
        value: 'jail-task-driver',
        display: 'Jailtask driver'
    }
]

const TASKS_DRIVER = "Tasks-Driver",
    TASKS_CONFIG_IMAGE = "Tasks-Config-image",
    TASKS_RESOURCES_CPU = "Tasks-Resouces-CPU",
    TASKS_RESOURCES_MEMORYMB = "Tasks-Resources-MemoryMB",
    PORTMAPPING = "PortMapping",
    TASKS_CONFIG_COMMAND = "Tasks-Config-command",
    TASKS_CONFIG_ARGS = "Tasks-Config-args",
    TASKS_ENV = "Tasks-Env";

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

const multipleKVProcess = (kvData) => {
    let resArr = [];
    kvData.forEach((item) => {
        resArr.push(`${item.key}=${item.value}`);
    })
    return resArr.join('\n');
}

const multipleValueProcess = (data) => {
    let resArr = [];
    data.forEach((item) => {
        resArr.push(`${item.value}`);
    })
    return resArr.join('\n');
}

const portMappingProcess = (data) => {
    let resArr = [];
    data.forEach((item) => {
        resArr.push(`${item.LValue} ->${item.mapping.display} ${item.RValue}`);
    })
    return resArr.join('\n');
}

const numberProcess = (data, unit) => {
    return `${data}${unit}`;
}


class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllValid: false,
            [TASKS_DRIVER]: {
                isValid: false,
                data: null
            },
            [TASKS_CONFIG_IMAGE]: {
                isValid: false,
                data: null
            },
            [TASKS_RESOURCES_CPU]: {
                isValid: false,
                data: null
            },
            [TASKS_RESOURCES_MEMORYMB]: {
                isValid: false,
                data: null
            },
            [PORTMAPPING]: {
                isValid: false,
                data: null
            },
            [TASKS_CONFIG_COMMAND]: {
                isValid: false,
                data: null
            },
            [TASKS_CONFIG_ARGS]: {
                isValid: false,
                data: null
            },
            [TASKS_ENV]: {
                isValid: false,
                data: null
            }
        };
    }

    componentWillReceiveProps(nextProps) {
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
        let newDataSet = Object.assign({}, this.state, { [name]: result });
        delete newDataSet.isAllValid;

        let newIsAllValid = true;
        for (let key in newDataSet) {
            if (newDataSet[key].isValid == false) {
                newIsAllValid = false;
            }
        }
        this.setState({
            isAllValid: newIsAllValid,
            [name]: result
        })
        if (this.props.updateData && this.props.dataName) {
            this.props.updateData(this.props.dataName, newDataSet, newIsAllValid);
        }
    }


    render() {
        const { classes, className, stepPosition } = this.props;

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

        if (stepPosition < 0) {
            return (
                <div className={classes.root}>
                    <KvItem keyName="运行时" className={classes.kvItem} value={kvMap[dataSet[TASKS_DRIVER].data]} style={style} />
                    <KvItem keyName="镜像" className={classes.kvItem} value={dataSet[TASKS_CONFIG_IMAGE].data} style={style} />
                    <KvItem keyName="CPU" className={classes.kvItem} value={numberProcess(dataSet[TASKS_RESOURCES_CPU].data, 'MHz')} style={style} />
                    <KvItem keyName="内存" className={classes.kvItem} value={numberProcess(dataSet[TASKS_RESOURCES_MEMORYMB].data, 'MB')} style={style} />
                    <KvItem keyName="端口映射" className={classes.kvItem} value={portMappingProcess(dataSet[PORTMAPPING].data)} style={style} />
                    <KvItem keyName="启动命令" className={classes.kvItem} value={dataSet[TASKS_CONFIG_COMMAND].data} style={style} />
                    <KvItem keyName="启动参数" className={classes.kvItem} value={multipleValueProcess(dataSet[TASKS_CONFIG_ARGS].data)} style={style} />
                    <KvItem keyName="环境变量" className={classes.kvItem} value={multipleKVProcess(dataSet[TASKS_ENV].data)} style={style} />
                </div>
            )
        } else {
            return (
                <div className={classes.root}>
                    <NormalSelect className={classes.marginBottom} name={TASKS_DRIVER} title={'运行时'} options={drives} defaultValue={dataSet[TASKS_DRIVER].data} required saveData={this.saveData} />
                    <NormalInput className={classes.marginBottom} name={TASKS_CONFIG_IMAGE} title={'镜像'} required saveData={this.saveData} defaultValue={dataSet[TASKS_CONFIG_IMAGE].data} />
                    <NumberInput className={classes.marginBottom} name={TASKS_RESOURCES_CPU} title={'CPU'} unit={'MHz'} defaultValue={dataSet[TASKS_RESOURCES_CPU].data} rules={{ step: 128, maxValue: 512, minValue: 0 }} saveData={this.saveData} />
                    <NumberInput className={classes.marginBottom} name={TASKS_RESOURCES_MEMORYMB} title={'内存'} unit={'MB'} defaultValue={dataSet[TASKS_RESOURCES_MEMORYMB].data} rules={{ step: 128, maxValue: 1280, minValue: 0 }} saveData={this.saveData} />
                    <PortMapInput className={classes.marginBottom} name={PORTMAPPING} title={'端口映射'} defaultValue={dataSet[PORTMAPPING].data} saveData={this.saveData} />
                    <NormalInput className={classes.marginBottom} name={TASKS_CONFIG_COMMAND} title={'启动命令'} defaultValue={dataSet[TASKS_CONFIG_COMMAND].data} saveData={this.saveData} />
                    <MultipleInput className={classes.marginBottom} name={TASKS_CONFIG_ARGS} title={'启动参数'} defaultValue={dataSet[TASKS_CONFIG_ARGS].data} hint={'请输入参数'} saveData={this.saveData} />
                    <KvInput className={classes.marginBottom} name={TASKS_ENV} title={'环境变量'} defaultValue={dataSet[TASKS_ENV].data} saveData={this.saveData} />
                </div>
            );
        }
    }
}
BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BasicInfo);