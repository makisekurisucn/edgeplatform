import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import  MapView from '../../containers/Dashboard/MapView'


class IndexRoute extends Component {
  render() {
    return (

        <Switch>
            <Route path='/dashboard/index' component={MapView}/>
            <Redirect from="/dashboard" exact to="/dashboard/index" />

        </Switch>
    );
  }
}
export default IndexRoute;