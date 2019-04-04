import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import  Joblist from '../../containers/Job/list'
// import  JobCreate from '../../containers/Job/create'
import  JobCreate from '../../containers/Job/createAlt'
import  JobDetail from '../../containers/Job/detail'

class JobRoute extends Component {
  render() {
    return (
        <Switch>
            {/* <Route exact path='/app' component={App}/> */}
            <Route path='/jobs/list' component={Joblist}/>
            <Route path='/jobs/create' component={JobCreate}/>
            <Route path='/jobs/detail/:id' component={JobDetail}/>
            <Redirect from="/jobs" exact to="/jobs/list" />

        </Switch>
    );
  }
}
export default JobRoute;