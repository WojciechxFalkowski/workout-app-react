import React from "react";
import "./Hamburger.scss";

export interface Props<T> {
  onClick: any;
  isActiveHamburger: boolean;
  hamburgerActive: T | null;
}
const Hamburger: React.FC<Props<any>> = ({ onClick, hamburgerActive }) => {
  return (
    <div className="hamburger" onClick={onClick}>
      <div className="hamburger__box">
        <div ref={hamburgerActive} className="hamburger__inner inner">
          <div className="inner__before"></div>
          <div className="inner__after"></div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
