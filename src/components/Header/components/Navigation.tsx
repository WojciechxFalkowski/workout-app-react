import React from "react";
import { Link } from "react-router-dom";
import "./navigation.scss";
export interface Props {}

const Navigation: React.FC<Props> = () => {
  return (
    <>
      <div className="navigation">
        <ul className="navigation__ul">
          {/* <li className="navigation__li">
            <Link to="/training" className="navigation__a">
              Nowy Trening
            </Link>
          </li> */}
          <li className="navigation__li">
            <Link to="/trainings" className="navigation__a">
              Treningi
            </Link>
          </li>
          <li className="navigation__li">
            <Link to="/statistics" className="navigation__a">
              Statystyki
            </Link>
          </li>
          {/* <li className="navigation__li">
            <Link to="/measurement" className="navigation__a">
              Pomiary
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
