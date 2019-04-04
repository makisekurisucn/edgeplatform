import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'
import IndexRoute from '../../routes'

const styles = theme => ({
  root: {
    // paddingLeft: theme.spacing.unit * 3,
    // paddingRight: theme.spacing.unit * 3,
    // paddingTop: theme.spacing.unit * 3
  },
});

function Main(props){
  const { classes } = props;
  return (
    <div className={classes.root}>
       <IndexRoute />
    </div>
  );
}
export default withStyles(styles)(Main);