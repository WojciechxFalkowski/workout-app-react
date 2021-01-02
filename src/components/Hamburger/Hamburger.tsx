import React from "react";
import "./Hamburger.scss";

export type props<T> = {
  onClick: () => void;
  hamburgerActive: T;
};
const Hamburger = ({ onClick, hamburgerActive }: props<any>) => {
  return (
    <button className="hamburger" onClick={onClick}>
      <div className="hamburger__box">
        <div ref={hamburgerActive} className="hamburger__inner inner">
          <div className="inner__before"></div>
          <div className="inner__after"></div>
        </div>
      </div>
    </button>
  );
};

export default Hamburger;
