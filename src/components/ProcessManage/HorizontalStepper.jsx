import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = theme => ({
    root: {
        // width: '51%'
        width: '100%',
        height: '100%'
    },
    stepper: {
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: 'initial',
        padding: '10px'
    },
    activeColor: {
        color: 'rgb(97, 139, 162) !important'
    },
    defaultColor: {
        // color: 'red'
    },
    completedColor: {
        color: 'rgb(97, 139, 162) !important'
    }
});



function HorizontalStepper(props) {
    const { classes, className, steps, stepIndex } = props;

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepper} activeStep={stepIndex} >
                {steps.map(step => (
                    <Step key={step.name}>
                        <StepLabel
                            classes={{
                                label: classes.defaultColor,
                                active: classes.activeColor,
                                completed: classes.completedColor,
                            }}
                            StepIconProps={{
                                classes: {
                                    root: classes.defaultColor,
                                    active: classes.activeColor,
                                    completed: classes.completedColor
                                }
                            }}
                        >
                            {step.name}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

HorizontalStepper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HorizontalStepper);