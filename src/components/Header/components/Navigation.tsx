import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
                <Link
                  onClick={handleHamburger}
                  to="/trainings"
                  className="navigation__a"
                >
                  Treningi
                </Link>
              </li>
              <li className="navigation__li">
                <Link
                  onClick={handleHamburger}
                  to="/statistics"
                  className="navigation__a"
                >
                  Statystyki
                </Link>
              </li>
              <li className="navigation__li">
                <Link
                  onClick={handleHamburger}
                  to="/measurement"
                  className="navigation__a"
                >
                  Pomiary
                </Link>
              </li>
              <li className="navigation__li">
                <Link
                  onClick={handleHamburger}
                  to="/diet"
                  className="navigation__a"
                >
                  Dieta
                </Link>
              </li>
              <li className="navigation__li">
                <Link
                  onClick={handleHamburger}
                  to="/settings"
                  className="navigation__a"
                >
                  Ustawienia
                </Link>
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
              <Link
                onClick={handleHamburger}
                className="navigation__a"
                to="/login"
              >
                Zaloguj się
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
