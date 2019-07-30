import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ProcessManage from '../../../components/ProcessManage';
import FixedHeight from '../../../components/FixedHeight';
import NormalInput from '../../../components/FormController/NormalInput';
import NormalSelect from '../../../components/FormController/NormalSelect';
import BasicInfo from './BasicInfoCreate';
import JobInfo from './JobInfoCreate';
import ScheduleStrategy from './ScheduleStrategyCreate';


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        borderRadius: 0
    },
    titleContent: {
        height: 50,
        boxSizing: 'border-box',
        lineHeight: '50px',
        // textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal',
        // borderBottom: '1px solid rgb(149,163,170)',
        color: 'rgb(76,92,102)',
        // position: 'relative',
        backgroundColor: 'rgb(231,231,231)',
        display: 'flex',
        justifyContent: 'space-between'
    },
    mainTitle: {
        width: '140px'
    },
    processArea: {
        width: '40%',
        minWidth: '300px',
        maxWidth: '480px',
        margin: '0px 14px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    step: {
        fontSize: '16px',
        fontWeight: '300',
        color: 'rgb(38, 46, 47)'
    },
    currentStep: {
        fontSize: '20px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)'
    },
    arrowBack: {
        color: 'rgb(151, 151, 151)',
        fontSize: 29,
        verticalAlign: 'middle',
        padding: '0px 2px 0px 19px',
        cursor: 'pointer'
        // height: 49
        // lineHeight: '60px'
    },
    arrowForward: {
        height: '50px',
        color: 'rgb(151, 151, 151)',
        fontSize: 15,
        verticalAlign: 'middle',
        // padding: '0px 2px 0px 19px',
        // cursor: 'pointer'
        // height: 49
        // lineHeight: '60px'
    },
    createButton: {
        float: 'right',
        // backgroundColor: 'rgb(75,139,175)',
        backgroundColor: 'rgb(183,183,183)',
        width: 128,
        height: 50,
        fontWeight: 300,
        textAlign: 'center',
        color: 'rgb(255, 255, 255)',
        cursor: 'pointer'
    },
    main: {
        padding: '19px 52px',
    },
    fixedHeight: {
        overflowX: 'auto'
    }
});

const titleList = [
    {
        name: '基本信息',
        type: 'step'
    },
    {
        type: 'arrow'
    },
    {
        name: '应用信息',
        type: 'step'
    },
    {
        type: 'arrow'
    },
    {
        name: '调度策略',
        type: 'step'
    }
];

const stepList = [
    {
        name: '基本信息',
        dataName: 'basicInfoData',
        component: BasicInfo
    },
    {
        name: '应用信息',
        dataName: 'jobInfoData',
        component: JobInfo
    },
    {
        name: '调度策略',
        dataName: 'scheduleStrategyData',
        component: ScheduleStrategy
    }
];

class JobCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            basicInfoData: {},
            jobInfoData: {},
            scheduleStrategyData: {}
        };
    }

    createJob = () => {
        // console.log(link);
        // this.props.history.push(link);
        // window.history.go(-1);
    }
    goBack = () => {
        window.history.go(-1);
        // this.props.history.goBack();
    }
    changeStep = (newStepName) => {
        titleList.forEach((step, index) => {
            if (step.name === newStepName) {
                this.setState({
                    currentStep: index
                })
            }
        })
    }
    handleUpload = (dataName, dataSet) => {
        console.log(dataName + ' :isCompleted')
        this.setState({
            [dataName]: dataSet
        })
    }
    render() {
        const { classes, className } = this.props;
        const { basicInfoData, jobInfoData, scheduleStrategyData } = this.state;


        return (
            <Paper className={classes.root}>
                <div className={classes.titleContent}>
                    <div className={classes.mainTitle}>
                        <ArrowBackIos className={classes.arrowBack} onClick={this.goBack} />
                        <span>新建应用</span>
                    </div>
                    <div className={classes.processArea}>
                        {
                            titleList.map((step, index) => {
                                switch (step.type) {
                                    case 'step':
                                        if (index === this.state.currentStep) {
                                            return <div className={classes.currentStep} key={step.name}>{step.name}</div>;
                                        } else {
                                            return <div className={classes.step} key={step.name}>{step.name}</div>;
                                        }
                                    case 'arrow':
                                        return <ArrowForwardIos className={classes.arrowForward} key={index} />;
                                    default:
                                        return <div className={classes.step} key={step.name}>{step.name}</div>;
                                }
                            })
                        }
                    </div>
                    <span className={classes.createButton} onClick={this.createJob}>新建</span>
                </div>
                <FixedHeight reducedHeight={110} className={classes.fixedHeight}>
                    <div className={classes.main}>
                        <ProcessManage stepList={stepList} switchStep={this.changeStep} data={{ basicInfoData, jobInfoData, scheduleStrategyData }} uploadData={this.handleUpload} />
                        {/* <ProcessManage stepList={stepList} switchStep={this.changeStep} /> */}
                    </div>
                </FixedHeight>
            </Paper>

        );
    }
}
JobCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(JobCreate);