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


const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '27px 14%'
    },
    marginBottom: {
        marginBottom: '28px'
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
        if (nextProps.isCurrentStep == 0 && this.props.isCurrentStep !== 0) {
            this.props.updataStatus(this.state.isAllValid)
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
        if (this.props.updataStatus && this.props.dataName) {
            this.props.updateData(this.props.dataName, newDataSet, newIsAllValid);
        }
    }


    render() {
        const { classes, className } = this.props;

        return (
            <div className={classes.root}>
                <NormalSelect className={classes.marginBottom} name={TASKS_DRIVER} title={'运行时'} options={drives} defaultIndex={0} required saveData={this.saveData} />
                <NormalInput className={classes.marginBottom} name={TASKS_CONFIG_IMAGE} title={'镜像'} required saveData={this.saveData} />
                <NumberInput className={classes.marginBottom} name={TASKS_RESOURCES_CPU} title={'CPU'} unit={'MHz'} rules={{ step: 128, maxValue: 512, minValue: 0, defaultValue: 128 }} saveData={this.saveData} />
                <NumberInput className={classes.marginBottom} name={TASKS_RESOURCES_MEMORYMB} title={'内存'} unit={'MB'} rules={{ step: 128, maxValue: 1280, minValue: 0, defaultValue: 256 }} saveData={this.saveData} />
                <PortMapInput className={classes.marginBottom} name={PORTMAPPING} title={'端口映射'} saveData={this.saveData} />
                <NormalInput className={classes.marginBottom} name={TASKS_CONFIG_COMMAND} title={'启动命令'} saveData={this.saveData} />
                <MultipleInput className={classes.marginBottom} name={TASKS_CONFIG_ARGS} title={'启动参数'} hint={'请输入参数'} saveData={this.saveData} />
                <KvInput className={classes.marginBottom} name={TASKS_ENV} title={'环境变量'} saveData={this.saveData} />
            </div>
        );
    }
}
BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BasicInfo);