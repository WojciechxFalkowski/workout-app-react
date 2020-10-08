import React, { useContext, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import Navigation from "./components";
interface Props {}

const Header: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {}, []);
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {},
        function (error) {}
      );
  };

  return (
    <header className="header">
      <h1 className="header__logo">
        <Link to="/" className="header__link">
          TO DO WORKOUT
        </Link>
      </h1>

      {currentUser ? (
        <>
          <Navigation />

          <button className="header__link" onClick={handleSignOut}>
            Wyloguj się
          </button>
        </>
      ) : (
        <Link className="header__link" to="/login">
          Zaloguj się
        </Link>
      )}
    </header>
  );
};

export default Header;
