import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Login } from './Login';
import { OAuth } from './OAuth';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/oauth/:provider" component={OAuth} />
      </Switch>
    </Router>
  );
};
