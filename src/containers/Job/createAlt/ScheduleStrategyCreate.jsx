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


class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { classes, className } = this.props;



        return (
            <div className={classes.root}>
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalSelect className={classes.marginBottom} title={'应用类型'} options={jobTypes} defaultValue={'service'} required />
                <KvInput className={classes.marginBottom} title={'环境变量'} />
                <MultipleInput className={classes.marginBottom} title={'启动参数'} hint={'请输入参数'} />
                <NumberInput className={classes.marginBottom} title={'CPU'} unit={'MHz'} rules={{ step: 128, maxValue: 512, minValue: 0, defaultValue: 128 }} />
                <PortMapInput className={classes.marginBottom} title={'端口映射'} />
                {/* <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required />
                <NormalInput className={classes.marginBottom} title={'应用名称'} required /> */}

            </div>
        );
    }
}
BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BasicInfo);