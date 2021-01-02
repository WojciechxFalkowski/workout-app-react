import React from "react";
import "./button.scss";
type props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
};

const Button = ({ onClick, children }: props) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

export default Button;
