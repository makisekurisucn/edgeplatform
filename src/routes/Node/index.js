import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import  ServerList from '../../containers/Node/list/server'
import  NodeList from '../../containers/Node/list/workNode'
import  WorkNodeDetail from '../../containers/Node/detail/workNodeDetail'


class JobRoute extends Component {
  render() {
    return (
        <Switch>
            {/* <Route exact path='/app' component={App}/> */}
            <Route path='/node/server' component={ServerList}/>
            <Route path='/node/worker/:id' component={WorkNodeDetail}/>
            <Route path='/node/worker' component={NodeList}/>
            <Redirect from="/node" exact to="/node/server" />

        </Switch>
    );
  }
}
export default JobRoute;