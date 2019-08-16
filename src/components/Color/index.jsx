import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    green:{
        color: "#4BAF7E"
    }
});

function Color(props) {
    const { classes, children, color } = props;
    return (
        <span className={classes[color]}>
            {children}
        </span>
    )
}

Color.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

export default withStyles(styles)(Color);