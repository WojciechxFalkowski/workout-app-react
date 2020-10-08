import React from "react";
import "reset-css";
import "./App.scss";
import { Login, Root, Home, Trainings, Training } from "pages";
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
    <>
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
                  path="/home"
                  exact={false}
                  component={Home}
                ></PrivateRoute>
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
                  component={Home}
                  exact={true}
                ></PrivateRoute>
                {/* <PrivateRoute path="/exercises" component={Home}></PrivateRoute> */}
                <PrivateRoute
                  path="/statistics"
                  exact={false}
                  component={Home}
                ></PrivateRoute>
                <PrivateRoute
                  path="/measurement"
                  exact={false}
                  component={Home}
                ></PrivateRoute>
                <Route path="/" exact>
                  <Root />
                </Route>
              </Switch>
            </Router>
          </div>
        </AuthProvider>
      </React.Suspense>
    </>
  );
};

export default App;
