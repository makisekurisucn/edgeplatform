import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import AppDrawer from '../../components/AppDrawer';
import Main from '../../components/Main';
// import { SnackbarProvider, withSnackbar } from 'notistack';

// import Drawer from '@material-ui/core/Drawer';
// import Grid from '@material-ui/core/Grid';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar barName="边缘平台" />
        <div className="App-wrap">
          <div className="App-menu">
            <AppDrawer />
          </div>
          <div className="App-main">
            <Main />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
