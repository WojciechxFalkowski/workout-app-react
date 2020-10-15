import React from "react";
import "./button.scss";
export interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

export default Button;
