import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Login from './Login.js';

function App() {
  return (
    <div className="App ui segment">
      Bem vindo! você está logado.
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <div style={{height: "100%"}}>
        
        {/*
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/home/">App</Link>
            </li>
          </ul>
        </nav>
        */}
        
        <Route path="/" exact render={() => <Login auth={fakeAuth}/>}/>
        <PrivateRoute path="/home/" component={App} />
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => fakeAuth.isAuthenticated ? (
        <Component {...props} />
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
