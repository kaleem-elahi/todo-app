import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import App from './App';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
