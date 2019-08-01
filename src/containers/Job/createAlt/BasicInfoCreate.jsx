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

const jobTypes = [
    {
        value: 'service',
        display: '服务'
    },
    {
        value: 'batch',
        display: '批量'
    },
    {
        value: 'system',
        display: '系统'
    }
]

const JOB_NAME = "Job-Name",
    JOB_TYPE = "Job-Type";

const kvMap = {
    service: '服务',
    batch: '批量',
    system: '系统'
}


class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllValid: false,
            [JOB_NAME]: {
                isValid: false,
                data: null
            },
            [JOB_TYPE]: {
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
                console.log('will receive props, is valid: ' + this.state.isAllValid)
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
            console.log('name: ' + name)
            console.log('save data, is valid: ' + newIsAllValid)
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
                <div className={classes.prevRoot}>
                    <KvItem keyName="应用名称" className={classes.kvItem} value={dataSet[JOB_NAME].data} style={style} />
                    <KvItem keyName="应用类型" className={classes.kvItem} value={kvMap[dataSet[JOB_TYPE].data]} style={style} />
                </div>
            )
        } else {
            return (
                <div className={classes.root}>
                    <NormalInput className={classes.marginBottom} name={JOB_NAME} title={'应用名称'} required saveData={this.saveData} defaultValue={dataSet[JOB_NAME].data} />
                    <NormalSelect className={classes.marginBottom} name={JOB_TYPE} title={'应用类型'} options={jobTypes} defaultValue={dataSet[JOB_TYPE].data} required saveData={this.saveData} />
                    {/* <KvInput className={classes.marginBottom} title={'环境变量'} />
                    <MultipleInput className={classes.marginBottom} title={'启动参数'} hint={'请输入参数'} />
                    <NumberInput className={classes.marginBottom} title={'CPU'} unit={'MHz'} rules={{ step: 128, maxValue: 512, minValue: 0, defaultValue: 128 }} />
                    <PortMapInput className={classes.marginBottom} title={'端口映射'} /> */}


                </div>
            );
        }
    }
}
BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BasicInfo);