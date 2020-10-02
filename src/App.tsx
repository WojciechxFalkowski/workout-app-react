import React, { useState, useEffect, useContext, useRef } from "react";
import "reset-css";
import "./App.scss";
import { Login, Root, Home } from "pages";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import {
  LoadingIndicator,
  Header,
  Hamburger,
  AuthProvider,
  PrivateRoute,
} from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [pending, setPending] = useState(true);
  // const [isActiveHamburger, setIsActiveHamburger] = useState(false);
  // const hamburgerActive = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPending(false);
  }, []);
  // const handleHamburgerClick = () => {
  //   if (hamburgerActive.current) {
  //     hamburgerActive.current.classList.toggle("is-active-hamburger");
  //   }
  //   console.log("Hamburger");

  //   setIsActiveHamburger(!isActiveHamburger);
  // };
  return (
    <>
      {pending ? (
        <LoadingIndicator />
      ) : (
        <AuthProvider>
          <Router>
            <Header />
            {/* <div className="mobile-menu">
              <Hamburger
                onClick={handleHamburgerClick}
                isActiveHamburger={isActiveHamburger}
                hamburgerActive={hamburgerActive}
              />
            </div> */}
            <React.Suspense fallback={<LoadingIndicator />}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path="/home" component={Home}></PrivateRoute>
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
