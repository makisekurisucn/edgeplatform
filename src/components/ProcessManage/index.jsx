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
        marginRight: '20px'
    },
    otherStepItem: {
        flex: '1 2 auto',
        marginRight: '20px'
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
        padding: '36px 120px'
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
            isCurrentStepValid: true
        };
    }

    componentWillMount() {
        let currentIndex = this.props.index === undefined ? 0 : this.props.index;
        this.setState({
            index: currentIndex
        });

    }
    componentWillReceiveProps(nextProp) {
        let currentIndex = nextProp.index === undefined ? 0 : nextProp.index;
        this.setState({
            index: currentIndex
        });
    }
    switchTab = (index) => (event) => {
        if (index !== this.state.index) {
            this.setState({
                index: index,
                prevIndex: this.state.index
            });
        }
    }
    componentDidUpdate() {

    }
    prevStep = () => {
        this.setState({
            currentStep: this.state.currentStep - 1
        })
    }
    nextStep = () => {
        this.setState({
            currentStep: this.state.currentStep + 1
        })
    }
    changeStep = (num) => (event) => {
        const newStep = this.state.currentStep + num;
        const newStepName = this.props.stepList[newStep].name;
        this.setState({
            currentStep: newStep
        })
        if (this.props.switchStep) {
            this.props.switchStep(newStepName);
        }
    }

    render() {
        const { classes, className, stepList = [], currentStep, viewProps, reducedHeight, tabWrapColor } = this.props;

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
                                            {
                                                `s\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\ns\n
                                                
                                                s
                                                
                                                ss
                                                `
                                            }
                                            {/* {step.component} */}
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
                                            {step.component}
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