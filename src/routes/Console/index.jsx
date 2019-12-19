import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Jobs from './Job'
import Node from './Node'

import SubmitToken from '../../components/SubmitToken'
import { _X_Nomad_Token } from '../../utils/static';


class IndexRoute extends Component {
    render() {
        const localStorageToken = localStorage.getItem(_X_Nomad_Token);
        if (localStorageToken) {
            return (

                <Switch>
                    <Route path='/console/jobs' component={Jobs} />
                    <Route path='/console/node' component={Node} />
                    <Redirect from="/console" exact to="/console/jobs" />
                </Switch>
            );
        } else {
            return (

                <Switch>
                    <Route path='/console/jobs' component={SubmitToken} />
                    <Route path='/console/node' component={SubmitToken} />
                    <Redirect from="/console" exact to="/console/jobs" />
                </Switch>
            );
        }
    }
}
export default IndexRoute;