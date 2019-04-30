import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import  Joblist from '../../../containers/Job/list'
// import  JobCreate from '../../containers/Job/create'
import  JobCreate from '../../../containers/Job/createAlt'
import  JobDetail from '../../../containers/Job/detail'

class JobRoute extends Component {
  render() {
    return (
        <Switch>
            {/* <Route exact path='/app' component={App}/> */}
            <Route path='/console/jobs/list' component={Joblist}/>
            <Route path='/console/jobs/create' component={JobCreate}/>
            <Route path='/console/jobs/detail/:id' component={JobDetail}/>
            <Redirect from="/console/jobs" exact to="/console/jobs/list" />

        </Switch>
    );
  }
}
export default JobRoute;