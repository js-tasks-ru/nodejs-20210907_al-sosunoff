import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import { OAuth } from './OAuth';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/oauth/:provider" component={OAuth} />
      </Switch>
    </Router>
  );
};
