import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ProcessManage from '../../../components/ProcessManage';
import HorizontalStepper from '../../../components/ProcessManage/HorizontalStepper';
import FixedHeight from '../../../components/FixedHeight';
import { getJobDetail, editJob } from '../../../actions/Job';
import BasicInfo from '../jsonConfig/BasicInfoCreate';
import JobInfo from '../jsonConfig/JobInfoCreate';
import ScheduleStrategy from '../jsonConfig/ScheduleStrategyCreate';
import Loading from '../../../components/Loading';


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
        width: '140px',
        whiteSpace: 'nowrap'
    },
    processArea: {
        width: '40%',
        minWidth: '320px',
        // maxWidth: '480px',
        margin: '0px 14px',
        // display: 'flex',
        // justifyContent: 'space-between'
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

const matchRouter = (current) => {
    let currentArray = current.split('/');
    let jobID, index;
    index = currentArray.indexOf('jobs') + 1;
    if (currentArray[index + 1] === 'edit') {
        jobID = currentArray[index];
    } else {
        jobID = '';
    }
    return jobID;
}

class JobEdit extends Component {
    constructor(props) {
        console.log('create constructor');
        super(props);
        this.state = {
            // titleIndex: 0,
            stepIndex: 0,
            // basicInfoData: {},
            // jobInfoData: {},
            // scheduleStrategyData: {},
            isAllCompleted: false,
            data: {
                ID: '',
                Name: '',
                Type: '',
                TaskGroups: [{
                    Name: '',
                    Count: '',
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
                            CPU: '',
                            MemoryMB: '',
                            Networks: [{
                                DynamicPorts: [],
                                ReservedPorts: []
                            }]
                        }
                    }]
                }]
            }
        };
        this.jobID = matchRouter(this.props.location.pathname);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        getJobDetail(dispatch, this.jobID);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.nativeDetail.ID && nextProps.nativeDetail !== this.props.nativeDetail) {
            const detailCopy = JSON.parse(JSON.stringify(nextProps.nativeDetail));
            this.setState({
                data: detailCopy
            })
        }
    }

    createJob = () => {
        let data = this.state.data;
        const jobName = data.Name;
        data.TaskGroups.forEach((taskGroup, gIndex) => {
            taskGroup.Name = taskGroup.Name || `${jobName}-group${gIndex}`;
            taskGroup.Tasks.forEach((task, tIndex) => {
                task.Name = task.Name || `${taskGroup.Name}-task${tIndex}`;
            })
        })
        console.log(data)
        console.log(this.jobID);
        const { dispatch } = this.props;
        editJob(dispatch, this.jobID, { Job: data });

        this.props.history.push(`/console/jobs/detail/${this.jobID}`);
    }
    goBack = () => {
        window.history.go(-1);
        // this.props.history.goBack();
    }
    changeStep = (newIndex) => {
        this.setState({
            stepIndex: newIndex
        })
    }
    handleUpload = (dataName, dataSet, isAllCompleted) => {
        // console.log(Object.assign({}, this.state, { [dataName]: dataSet, isAllCompleted }))
        // console.log(dataName + ' :isCompleted')
        console.log('isAllCompleted: ' + isAllCompleted)
        this.setState({
            // [dataName]: dataSet,
            isAllCompleted
        })
    }
    render() {
        console.log('create render');
        console.log(this.state.data);
        const { classes, className, nativeDetail, loading } = this.props;
        // const { basicInfoData, jobInfoData, scheduleStrategyData } = this.state;



        return (
            <Paper className={classes.root}>
                <div className={classes.titleContent}>
                    <div className={classes.mainTitle}>
                        <ArrowBackIos className={classes.arrowBack} onClick={this.goBack} />
                        <span>编辑应用</span>
                    </div>
                    <div className={classes.processArea}>
                        <HorizontalStepper steps={stepList} stepIndex={this.state.stepIndex}></HorizontalStepper>
                    </div>
                    {
                        this.state.isAllCompleted == true ?
                            <span className={classes.createButton + ' ' + classes.validBkg} onClick={this.createJob}>更新</span> :
                            <span className={classes.createButton}>更新</span>
                    }
                    {/* <span className={classes.createButton} onClick={this.createJob}>新建</span> */}
                </div>
                <FixedHeight reducedHeight={110} className={classes.fixedHeight}>
                    <div className={classes.main}>
                        <Loading loading={loading}>
                            <ProcessManage stepList={stepList} switchStep={this.changeStep} data={this.state.data} uploadData={this.handleUpload} />
                        </Loading>
                        {/* <ProcessManage stepList={stepList} switchStep={this.changeStep} data={detailCopy} uploadData={this.handleUpload} /> */}
                        {/* <ProcessManage stepList={stepList} switchStep={this.changeStep} /> */}
                    </div>
                </FixedHeight>
            </Paper>

        );
    }
}
JobEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    console.log('vreate map state to props');
    console.log(state)
    return {
        loading: state.jobdetail.loading,
        nativeDetail: state.jobdetail.nativeDetail
    }
}

export default connect(mapStateToProps)(withStyles(styles)(JobEdit));