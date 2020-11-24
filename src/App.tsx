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
} from "pages";

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
      <AuthProvider>
        <div className="app__wrapper">
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
              {/* <PrivateRoute path="/exercises" component={Home}></PrivateRoute> */}
              <PrivateRoute
                path="/statistics"
                exact={false}
                component={Statistics}
              ></PrivateRoute>
              <PrivateRoute
                path="/measurement"
                exact={false}
                component={Measurement}
              ></PrivateRoute>
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
