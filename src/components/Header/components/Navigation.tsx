import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase/app";
import "./navigation.scss";
import { AuthContext } from "components/AuthProvider/AuthProvider";
export interface Props {
  handleHamburger: () => void;
}

const Navigation: React.FC<Props> = ({ handleHamburger }) => {
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
    <>
      <div className="navigation">
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
              <li className="navigation__li">
                <NavLink
                  activeClassName="navigation--active"
                  onClick={handleHamburger}
                  to="/measurement"
                  className="navigation__a"
                >
                  Pomiary
                </NavLink>
              </li>
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
                Zaloguj się
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
