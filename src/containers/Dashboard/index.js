import React, { Component } from 'react';
import Dashboard from '../../routes/Dashboard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class App extends Component {
  render() {
    // const { classes } = this.props;
    return (
        <Dashboard />
    );
  }
}
export default withStyles(styles)(App);