import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase/app";
import "./navigation.scss";
import { AuthContext } from "components/AuthProvider/AuthProvider";
export type props = {
  handleHamburger: () => void;
};

const Navigation = ({ handleHamburger }: props) => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    handleHamburger();
    firebase
      .auth()
      .signOut()
      .then(
        function () {},
        function (error) {}
      );
  };
  return (
    <nav className="navigation">
      <ul className="navigation__ul">
        {currentUser ? (
          <>
            <li className="navigation__li">
              <NavLink
                activeClassName="navigation--active"
                onClick={handleHamburger}
                to="/trainings"
                className="navigation__a"
              >
                Treningi
              </NavLink>
            </li>
            <li className="navigation__li">
              <NavLink
                activeClassName="navigation--active"
                onClick={handleHamburger}
                to="/statistics"
                className="navigation__a"
              >
                Statystyki
              </NavLink>
            </li>
            {/* <li className="navigation__li">
                <NavLink
                  activeClassName="navigation--active"
                  onClick={handleHamburger}
                  to="/measurement"
                  className="navigation__a"
                >
                  Pomiary
                </NavLink>
              </li> */}
            <li className="navigation__li">
              <NavLink
                activeClassName="navigation--active"
                onClick={handleHamburger}
                to="/diet"
                className="navigation__a"
              >
                Dieta
              </NavLink>
            </li>
            <li className="navigation__li">
              <NavLink
                activeClassName="navigation--active"
                onClick={handleHamburger}
                to="/settings"
                className="navigation__a"
              >
                Ustawienia
              </NavLink>
            </li>
            <li className="navigation__li navigation__logout">
              <a
                onClick={handleSignOut}
                href="/workout-app-react"
                className="navigation__a"
              >
                Wyloguj
              </a>
            </li>
          </>
        ) : (
          <li className="navigation__li navigation__login">
            <NavLink
              activeClassName="navigation--active"
              onClick={handleHamburger}
              className="navigation__a"
              to="/login"
            >
              Logowanie / Rejestracja
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
