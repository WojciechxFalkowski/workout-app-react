import React from "react";
import "reset-css";
import "./App.scss";
import "firebase/auth";
import "firebase/database";
import {
  Login,
  Root,
  Trainings,
  Training,
  Exercise,
  Statistics,
  Measurement,
  Diet,
  DietDay,
  Settings,
  NotFound,
} from "pages";

import {
  LoadingIndicator,
  Header,
  AuthProvider,
  PrivateRoute,
} from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
const App = () => {
  return (
    <CookiesProvider>
      <React.Suspense fallback={<LoadingIndicator />}>
        <AuthProvider>
          <Router basename={process.env.PUBLIC_URL}>
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
              <PrivateRoute
                path="/statistics"
                exact={true}
                component={Statistics}
              ></PrivateRoute>
              {/* <PrivateRoute
                path="/measurement"
                exact={false}
                component={Measurement}
              ></PrivateRoute> */}
              <PrivateRoute
                path="/diet"
                exact={true}
                component={Diet}
              ></PrivateRoute>
              <PrivateRoute
                path="/diet/:id"
                exact={true}
                component={DietDay}
              ></PrivateRoute>
              <PrivateRoute
                path="/settings"
                exact={true}
                component={Settings}
              ></PrivateRoute>
              <Route path="/" exact={true}>
                <Root />
              </Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Router>
        </AuthProvider>
      </React.Suspense>
    </CookiesProvider>
  );
};

export default App;
