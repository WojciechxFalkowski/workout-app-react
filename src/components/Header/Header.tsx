import React, { useRef } from "react";
import "./header.scss";
import { Link } from "react-router-dom";

import Navigation from "./components";
import { Hamburger } from "components";
interface Props {}

const Header: React.FC<Props> = () => {
  const header = useRef<HTMLElement>(null);
  const hamburgerActive = useRef<HTMLDivElement>(null);

  const onClick = () => {
    hamburgerActive.current?.classList.toggle("is-active-hamburger");
    header.current?.classList.toggle("header--active");
  };
  const handleHamburger = () => {
    hamburgerActive.current?.classList.remove("is-active-hamburger");
    header.current?.classList.remove("header--active");
  };
  return (
    <>
      <header ref={header} className="header">
        <h1 className="header__logo">
          <Link to="/" className="header__link">
            TO DO WORKOUT
          </Link>
        </h1>
        <div className="header__hamburger">
          <Hamburger onClick={onClick} hamburgerActive={hamburgerActive} />
        </div>
        <div className="header__links">
          <Navigation handleHamburger={handleHamburger} />
        </div>
      </header>
    </>
  );
};

export default Header;
