import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import AppDrawer from '../../components/AppDrawer';
import Main from '../../components/Main';
import { withStyles } from '@material-ui/core/styles';

// import { SnackbarProvider, withSnackbar } from 'notistack';

// import Drawer from '@material-ui/core/Drawer';
// import Grid from '@material-ui/core/Grid';
// import logo from './logo.svg';
import './App.css';


const styles = theme => ({
    topBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100000
    },
    app: {
        height: '100%'
    }
});

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.app}>
                <TopBar barName="边缘多集群管理平台" className={classes.topBar} />
                <Main />
            </div>
        );
    }
}

export default withStyles(styles)(App);
