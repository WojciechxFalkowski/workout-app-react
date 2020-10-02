import React, { useContext, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { AuthContext } from "components/AuthProvider/AuthProvider";
export interface Props {}

const Header: React.FC<Props> = () => {
  const { currentUser }: any | undefined = useContext(AuthContext);
  // console.log("currentUser w HEADER:", currentUser);
  useEffect(() => {}, []);
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          // console.log("Signed Out");
        },
        function (error) {
          // console.error("Sign Out Error", error);
        }
      );
  };
  return (
    <header className="header">
      <h1 className="header__logo">TO DO WORKOUT</h1>
      {currentUser ? (
        <button className="header__link" onClick={handleSignOut}>
          Wyloguj się
        </button>
      ) : (
        <Link className="header__link" to="/login">
          Zaloguj się
        </Link>
      )}
    </header>
  );
};

export default Header;
