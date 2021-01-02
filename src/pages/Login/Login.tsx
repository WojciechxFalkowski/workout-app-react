import React, { useState } from "react";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import "./login.scss";
type options = {
  provider: any;
  fullLabel: string;
};
export type Test = {
  signInFlow: string;
  signInOptions: Array<options>;
  callbacks: any;
};
const LoginPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const uiConfig: Test = {
    signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: "Logowanie za pomocą google",
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: "Logowanie za pomocą email",
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        setIsSignedIn(true);
        return false;
      },
    },
  };
  return (
    <main className="login">
      <div className="login__div">
        {isSignedIn ? (
          <Redirect to="/" />
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    </main>
  );
};

export default LoginPage;
