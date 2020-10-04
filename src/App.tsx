import React, { useState, useEffect } from "react";
import "reset-css";
import "./App.scss";
import { Login, Root, Home, Training } from "pages";
import fire from "fire";

import {
  LoadingIndicator,
  Header,
  AuthProvider,
  PrivateRoute,
} from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [pending, setPending] = useState(true);
  useEffect(() => {
    setPending(false);
  }, []);

  return (
    <>
      {pending ? (
        <LoadingIndicator />
      ) : (
        <AuthProvider fire={fire}>
          <Router>
            <Header />
            <React.Suspense fallback={<LoadingIndicator />}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path="/home" component={Home}></PrivateRoute>
                <PrivateRoute
                  path="/training"
                  component={Training}
                ></PrivateRoute>
                {/* <PrivateRoute path="/exercises" component={Home}></PrivateRoute> */}
                <PrivateRoute
                  path="/statistics"
                  component={Home}
                ></PrivateRoute>
                <PrivateRoute
                  path="/measurement"
                  component={Home}
                ></PrivateRoute>
                <Route path="/" exact>
                  <Root />
                </Route>
              </Switch>
            </React.Suspense>
          </Router>
        </AuthProvider>
      )}
    </>
  );
};

export default App;
