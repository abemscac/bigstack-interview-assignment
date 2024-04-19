import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { InstancesPage } from '@pages/Instances';
import { NotFoundPage } from '@pages/NotFound';

export const RouterView = () => {
  return (
    <div className="router-view">
      <Switch>
        <Route exact path="/">
          <Redirect to="/instances" />
        </Route>
        <Route exact path="/instances" component={InstancesPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};
