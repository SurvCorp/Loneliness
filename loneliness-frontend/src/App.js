import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Login from './Login.js';
import Dashboard from './Dashboard.js';

function AppRouter() {
  return (
    <Router>
      <div style={{height: "100%"}}>
        <Route path="/" exact render={() => <Login auth={fakeAuth}/>}/>
        <PrivateRoute path="/home/" component={Dashboard} />
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  token: null,
  authenticate(token) {
    this.isAuthenticated = true;
    this.token = token;
  },
  logout() {
    this.isAuthenticated = false;
    this.token = null;
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => fakeAuth.isAuthenticated ? (
        <Component token={fakeAuth.token} auth={fakeAuth} {...props} />
      ) : (
        <Redirect
          to={{pathname: "/", state: {from: props.location}}}
        />
      )
      }
    />
  );
}

export default AppRouter;
