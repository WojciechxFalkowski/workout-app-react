import React from "react";
import "reset-css";
import "./App.scss";
import { Login, Root, Trainings, Training, Exercise, Statistics } from "pages";
import fire from "fire";

import {
  LoadingIndicator,
  Header,
  AuthProvider,
  PrivateRoute,
} from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <AuthProvider fire={fire}>
        <div className="app__wrapper">
          <Router>
            <Header />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute
                path="/trainings"
                component={Trainings}
                exact={true}
              ></PrivateRoute>
              <PrivateRoute
                path="/trainings/:id"
                component={Training}
                exact={true}
              ></PrivateRoute>
              <PrivateRoute
                path="/trainings/:id/:id"
                component={Exercise}
                exact={true}
              ></PrivateRoute>
              {/* <PrivateRoute path="/exercises" component={Home}></PrivateRoute> */}
              <PrivateRoute
                path="/statistics"
                exact={false}
                component={Statistics}
              ></PrivateRoute>
              <PrivateRoute
                path="/measurement"
                exact={false}
                component={Root}
              ></PrivateRoute>
              <Route path="/" exact>
                <Root />
              </Route>
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </React.Suspense>
  );
};

export default App;
