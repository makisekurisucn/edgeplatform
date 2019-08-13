import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FadeWrap from '../../components/FadeWrap';
import FixedHeight from '../../components/FixedHeight';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        display: 'flex'
    },
    currentStepItem: {
        flex: '2 1 auto',
        marginRight: '20px',
        maxWidth: '900px',
        minWidth: '700px',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    otherStepItem: {
        // flex: '1 2 auto',
        width: '320px',
        marginRight: '20px',
        // maxWidth: '500px',
        // minWidth: '400px',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    stepTitleContent: {
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 15px 0px 24px',
        backgroundColor: 'rgba(97, 139, 162, 0.10)',
        fontSize: '24px',
        fontWeight: 300,
        color: 'rgb(97, 139, 162)',
        whiteSpace: 'nowrap'
    },
    stepMainContent: {
        backgroundColor: 'rgba(68, 105, 128, 0.02)',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    arrowBack: {
        cursor: 'pointer',
        fontSize: '24px',
        verticalAlign: 'middle',
        marginLeft: '-16px'
    },
    invalidNextButton: {
        fontSize: '10px',
        fontWeight: 400,
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(183, 183, 183)',
        cursor: 'pointer',
        width: '61px',
        height: '19px',
        lineHeight: '19px',
        textAlign: 'center'
    },
    validNextButton: {
        fontSize: '10px',
        fontWeight: 400,
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(75, 175, 126)',
        cursor: 'pointer',
        width: '61px',
        height: '19px',
        lineHeight: '19px',
        textAlign: 'center'
    },
    fixedHeight: {
        overflow: 'hidden'
    }
});
class ProcessManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            prevStep: 0,
            isCurrentStepValid: false
        };
    }

    changeStep = (num) => (event) => {
        const newStep = this.state.currentStep + num;
        this.setState({
            currentStep: newStep,
            isCurrentStepValid: false
        })
        if (this.props.switchStep) {
            this.props.switchStep(newStep);
        }
    }

    updataData = (dataName, newDataSet, isStepValid) => {
        console.log('update data')
        console.log(isStepValid)
        this.setState({
            isCurrentStepValid: isStepValid
        })
        let isAllCompleted = false;
        if (this.state.currentStep == (this.props.stepList.length - 1) && isStepValid == true) {
            isAllCompleted = true;
        }
        this.props.uploadData && this.props.uploadData(dataName, newDataSet, isAllCompleted)
    }

    render() {
        const { classes, className, stepList = [], currentStep, reducedHeight, tabWrapColor, data, uploadData } = this.props;

        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                {
                    stepList.map((step, index) => {
                        if (this.state.currentStep === index) {
                            return (
                                <div className={classes.currentStepItem} key={step.name}>
                                    <div className={classes.stepTitleContent}>
                                        <div>
                                            {index !== 0 ? <ArrowBackIos className={classes.arrowBack} onClick={this.changeStep(-1)} /> : null}
                                            <span>{step.name}</span>
                                        </div>
                                        {
                                            index === (stepList.length - 1) ? null : (
                                                this.state.isCurrentStepValid === true ?
                                                    <div className={classes.validNextButton} onClick={this.changeStep(1)}>下一步</div> :
                                                    <div className={classes.invalidNextButton}>下一步</div>
                                            )
                                        }
                                    </div>
                                    <FixedHeight className={classes.fixedHeight} reducedHeight={200}>
                                        <div className={classes.stepMainContent}>
                                            {/* {
                                                `s\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\n
                                                
                                                s
                                                
                                                ss
                                                `
                                            } */}
                                            <step.component data={data[step.dataName]} dataName={step.dataName} updateData={this.updataData} stepPosition={0} />
                                        </div>
                                    </FixedHeight>
                                </div>
                            );
                        } else {
                            return (
                                <div className={classes.otherStepItem} key={step.name}>
                                    <div className={classes.stepTitleContent}>
                                        <span>{step.name}</span>
                                    </div>
                                    <FixedHeight className={classes.fixedHeight} reducedHeight={270}>
                                        <div className={classes.stepMainContent}>
                                            <step.component data={data[step.dataName]} dataName={step.dataName} updateData={this.updataData} stepPosition={index > this.state.currentStep ? 1 : -1} />
                                        </div>
                                    </FixedHeight>
                                </div>
                            );
                        }
                    })
                }
            </div>
        );
    }
}

ProcessManage.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProcessManage);