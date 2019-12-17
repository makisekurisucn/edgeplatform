import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
// import  Dashboard from '../../containers/Dashboard'
import Console from '../containers/Console'
// import Dashboard from '../containers/Dashboard'


class IndexRoute extends Component {
    render() {
        return (

            <Switch>
                {/* <Route exact path='/app' component={App}/> */}
                <Route path='/console' component={Console} />
                {/* <Route path='/dashboard' component={Dashboard} /> */}
                {/* <Redirect from="/" exact to="/dashboard" /> */}
                <Redirect from="/" exact to="/console" />

            </Switch>
        );
    }
}
export default IndexRoute;