import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import IndexRoute from '../../routes'

class Main extends Component {
  render() {
    return (
        <div className="main">
           <IndexRoute />
        </div>
    );
  }
}
export default Main;
