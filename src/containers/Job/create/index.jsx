import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import code from '../../../assets/img/code.jpg'
const styles = {
    card: {
        maxWidth: 1000,
        margin: 'auto'
    },
    media: {
        //  object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    actionArea: {
        float: 'right',
        marginTop: 20
    },
};
const header = [{ name: "名称", key: "Name" }, { name: "类型", key: "Type" }, { name: "状态", key: "Status" }, { name: "创建时间", key: "SubmitTime", type: "time" }];
const list = [{ name: "hello", test: "没过", id: 1 }];


function getSteps() {
    return ['基本信息', '工作负载', '高级配置'];
}


class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            name: 'test'

        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        // getJobList(dispatch);
        // this.state.list = list;
        // console.log("test1");
        //  react setState 测试用例

    }

    getStepContent = function (step, classes, state) {
        switch (step) {
            case 0:
                return (
                    <form className={classes.container} noValidate autoComplete="off">

                        <TextField
                            required
                            id="standard-required"
                            label="名称"
                            className={classes.textField}
                            margin="normal"
                            value={state.name}
                        />
                    </form>
                );
            case 1:
                return 'An ad group contains one or more ads which target a shared set of keywords.';
            case 2:
                return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
            default:
                return 'Unknown step';
        }
    }
    state = {
        activeStep: 0,
    }
    // handleChange = name => event => {
    //   this.setState({ [name]: event.target.value });
    // };
    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const stat = this.state;
        const { activeStep } = this.state;

        return (
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image={code}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        新建应用
          </Typography>
                </CardContent>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{this.getStepContent(index, classes, this.state)}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div className={classes.actionArea}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.button}
                                        >
                                            Back
                    </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
            </Button>
                    </Paper>
                )}
            </Card>
        );
    }
}
SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {

    return state;
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));