import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'
import  Dashboard from '../containers/Dashboard'
import  Jobs from './Job'
import  Home from '../containers/Home'


class IndexRoute extends Component {
  render() {
    return (
        <div  className="switch">

        <Switch>
            {/* <Route exact path='/app' component={App}/> */}
            <Route path='/jobs' component={Jobs}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route component={Dashboard}/>
        </Switch>
        </div>
    );
  }
}
export default IndexRoute;