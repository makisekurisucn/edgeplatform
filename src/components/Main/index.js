import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'
import IndexRoute from '../../routes'

const styles = theme => ({

});

function Main(props) {
    // const { classes } = props;
    return (
        <IndexRoute />
    );
}
export default withStyles(styles)(Main);