import React, { useState } from "react";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import "./login.scss";
export interface Props {}
export interface Test {
  signInFlow: string;
  signInOptions: Array<string> | any;
  callbacks: any;
}
const LoginPage: React.FC<Props> = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const uiConfig: Test = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
      {isSignedIn ? (
        <Redirect to="/" />
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </main>
  );
};

export default LoginPage;
