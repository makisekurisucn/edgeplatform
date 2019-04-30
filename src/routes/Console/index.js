import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import  Dashboard from '../../containers/Dashboard'
import  Jobs from './Job'
import  Node from './Node'
import  Home from '../../containers/Home'


class IndexRoute extends Component {
  render() {
    return (

        <Switch>
            {/* <Route exact path='/app' component={App}/> */}
            <Route path='/console/jobs' component={Jobs}/>
            <Route path='/console/node' component={Node}/>
            <Redirect from="/console" exact to="/console/jobs" />

            {/* <Route path='/dashboard' component={Dashboard}/> */}
            {/* <Route component={Dashboard}/> */}
        </Switch>
    );
  }
}
export default IndexRoute;