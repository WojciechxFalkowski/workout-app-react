import React, { useState } from "react";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
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
      signInSuccess: () => {
        setIsSignedIn(true);

        return false;
      },
    },
  };

  return (
    <>
      {isSignedIn ? (
        <Redirect to="/" />
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </>
  );
};

export default LoginPage;
