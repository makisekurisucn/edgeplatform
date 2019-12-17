import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ProcessManage from '../../../components/ProcessManage';
import HorizontalStepper from '../../../components/ProcessManage/HorizontalStepper';
import FixedHeight from '../../../components/FixedHeight';
import { createJob } from '../../../actions/Job';
import { getRegion } from '../../../utils/handleRequest'
import BasicInfo from '../jsonConfig/BasicInfoCreate';
import JobInfo from '../jsonConfig/JobInfoCreate';
import ScheduleStrategy from '../jsonConfig/ScheduleStrategyCreate';


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
        fontSize: 20,
        fontWeight: 'normal',
        color: 'rgb(76,92,102)',
        backgroundColor: 'rgb(231,231,231)',
        display: 'flex',
        justifyContent: 'space-between'
    },
    mainTitle: {
        width: '140px',
        whiteSpace: 'nowrap'
    },
    processArea: {
        width: '40%',
        minWidth: '320px',
        margin: '0px 14px'
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
    },
    arrowForward: {
        height: '50px',
        color: 'rgb(151, 151, 151)',
        fontSize: 15,
        verticalAlign: 'middle'
    },
    createButton: {
        float: 'right',
        backgroundColor: 'rgb(183,183,183)',
        width: '128px',
        minWidth: '128px',
        height: 50,
        fontWeight: 300,
        textAlign: 'center',
        color: 'rgb(255, 255, 255)',
        cursor: 'pointer'
    },
    validBkg: {
        backgroundColor: 'rgb(75, 175, 126)'
    },
    main: {
        padding: '19px 52px',
    },
    fixedHeight: {
        overflowX: 'auto'
    }
});

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
            stepIndex: 0,
            basicInfoData: {},
            jobInfoData: {},
            scheduleStrategyData: {},
            isAllCompleted: false,
            data: {
                ID: '',
                Name: '',
                Type: 'service',
                TaskGroups: [{
                    Name: '',
                    Count: 1,
                    Tasks: [{
                        Name: '',
                        Driver: '',
                        Config: {
                            args: [],
                            command: '',
                            image: '',
                            port_map: []
                        },
                        Env: {},
                        Services: [],
                        Resources: {
                            CPU: 500,
                            MemoryMB: 256,
                            Networks: [{
                                DynamicPorts: [],
                                ReservedPorts: []
                            }]
                        }
                    }]
                }]
            }
        };
    }

    createJob = () => {
        const region = getRegion();
        let data = this.state.data;
        const jobName = data.Name;
        data.Region = region;
        data.TaskGroups.forEach((taskGroup, gIndex) => {
            taskGroup.Name = taskGroup.Name || `${jobName}-group${gIndex}`;
            taskGroup.Tasks.forEach((task, tIndex) => {
                task.Name = task.Name || `${taskGroup.Name}-task${tIndex}`;
            })
        })
        const { dispatch } = this.props;
        createJob(dispatch, { Job: data })
        this.props.history.push(`/console/jobs/list`);
    }
    goBack = () => {
        window.history.go(-1);
    }
    changeStep = (newIndex) => {
        this.setState({
            stepIndex: newIndex
        })
    }
    handleUpload = (dataName, dataSet, isAllCompleted) => {
        this.setState({
            [dataName]: dataSet,
            isAllCompleted
        })
    }
    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <div className={classes.titleContent}>
                    <div className={classes.mainTitle}>
                        <ArrowBackIos className={classes.arrowBack} onClick={this.goBack} />
                        <span>新建应用</span>
                    </div>
                    <div className={classes.processArea}>
                        <HorizontalStepper steps={stepList} stepIndex={this.state.stepIndex}></HorizontalStepper>
                    </div>
                    {
                        this.state.isAllCompleted === true ?
                            <span className={classes.createButton + ' ' + classes.validBkg} onClick={this.createJob}>新建</span> :
                            <span className={classes.createButton}>新建</span>
                    }
                </div>
                <FixedHeight reducedHeight={110} className={classes.fixedHeight}>
                    <div className={classes.main}>
                        <ProcessManage stepList={stepList} switchStep={this.changeStep} data={{ json: this.state.data, type: 'create' }} uploadData={this.handleUpload} />
                    </div>
                </FixedHeight>
            </Paper>

        );
    }
}
JobCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.jobcreate;
}

export default connect(mapStateToProps)(withStyles(styles)(JobCreate));