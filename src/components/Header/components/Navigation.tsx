import React, { useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import "./navigation.scss";
import { AuthContext } from "components/AuthProvider/AuthProvider";
export interface Props {
  handleHamburger: () => void;
}

const Navigation: React.FC<Props> = ({ handleHamburger }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    console.log("halko");
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
              {/* <li className="navigation__li">
            <Link to="/training" className="navigation__a">
              Nowy Trening
            </Link>
          </li> */}
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
              {/* <li
                className="navigation__li navigation__logout"
                onClick={handleSignOut}
              >
                Wyloguj
              </li> */}
              <li className="navigation__li navigation__logout">
                <a onClick={handleSignOut} href="/" className="navigation__a">
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
