import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';




// import { isAbsolute } from 'path';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        const { dispatch } = this.props;

    }
    handleNext(props) {
        const { next } = props;
        next();
    }
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    required
                    id="standard-required"
                    label="名称"
                    className={classes.textField}
                    margin="normal"
                />
                <div>
                    <Button
                        onClick={this.handleBack}
                        className={classes.button}
                    >
                        Back
                </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext(this.props)}
                        className={classes.button}
                    >
                        next
                </Button>
                </div>
            </form>
        );
    }
}
step1.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {

    return state;
}

export default connect(mapStateToProps)(withStyles(styles)(step1));
