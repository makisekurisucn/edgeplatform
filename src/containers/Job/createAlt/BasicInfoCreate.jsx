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


class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: {
                [JOB_NAME]: {
                    isValid: false,
                    data: null
                },
            [JOB_TYPE]: {
                    isValid: false,
                    data: 'service'
                }
            }
        };
    }

    saveData = (name, result) => {
        let newDataSet = Object.assign({}, this.state.dataSet, { [name]: result });
        this.setState({
            dataSet: newDataSet
        })
        if(result.isValid == true){
            let isAllValid = true;
            for (let key in newDataSet) {
                if (newDataSet[key].isValid == false) {
                    console.log(key +' isInvalid')
                    console.log(newDataSet[key])
                    isAllValid = false;
                }
            }
            if (isAllValid == true) {
                console.log('can upload')
                if (this.props.uploadData && this.props.dataName) {
                    this.props.uploadData(this.props.dataName, newDataSet)
                }
            }
        }
        // let newDataSet = Object.assign({}, this.state.dataSet, { [name]: result });
        // this.setState({
        //     dataSet: newDataSet
        // })
        console.log(this.state)
    }


    render() {
        const { classes, className, uploadData } = this.props;

        return (
            <div className={classes.root}>
                <NormalInput className={classes.marginBottom} name={JOB_NAME} title={'应用名称'} required saveData={this.saveData} />
                <NormalSelect className={classes.marginBottom} name={JOB_TYPE} title={'应用类型'} options={jobTypes} defaultIndex={0} required saveData={this.saveData} />
                {/* <KvInput className={classes.marginBottom} title={'环境变量'} />
                <MultipleInput className={classes.marginBottom} title={'启动参数'} hint={'请输入参数'} />
                <NumberInput className={classes.marginBottom} title={'CPU'} unit={'MHz'} rules={{ step: 128, maxValue: 512, minValue: 0, defaultValue: 128 }} />
                <PortMapInput className={classes.marginBottom} title={'端口映射'} /> */}


            </div>
        );
    }
}
BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BasicInfo);