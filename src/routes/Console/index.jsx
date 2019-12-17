import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Jobs from './Job'
import Node from './Node'


class IndexRoute extends Component {
    render() {
        return (

            <Switch>
                <Route path='/console/jobs' component={Jobs} />
                <Route path='/console/node' component={Node} />
                <Redirect from="/console" exact to="/console/jobs" />
            </Switch>
        );
    }
}
export default IndexRoute;