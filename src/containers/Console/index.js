import React, { Component } from 'react';
import AppDrawer from '../../components/AppDrawer';
import Console from '../../routes/Console';
import { withStyles } from '@material-ui/core/styles';

// import { SnackbarProvider, withSnackbar } from 'notistack';

// import Drawer from '@material-ui/core/Drawer';
// import Grid from '@material-ui/core/Grid';
// import logo from './logo.svg';
// import './App.css';


const styles = theme => ({

});

class App extends Component {
  render() {
    // const { classes } = this.props;
    return (
        <div className="App-wrap">
            <div className="App-menu">
                <AppDrawer />
            </div>
            <div className="App-main">
                <Console />
            </div>
        </div>
    );
  }
}

export default withStyles(styles)(App);
