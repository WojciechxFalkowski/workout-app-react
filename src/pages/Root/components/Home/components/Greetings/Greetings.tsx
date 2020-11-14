import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import "./greetings.scss";
export interface Props {}

const Greetings: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const date = new Date();
  const dayOfWeek = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwarte",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];
  const monthOfYear = [
    "Stycznia",
    "Lutego",
    "Marca",
    "Kwietnia",
    "Maja",
    "Czerwca",
    "Lipca",
    "Sierpnia",
    "Września",
    "Października",
    "Listopada",
    "Grudnia",
  ];
  const today = `${dayOfWeek[date.getDay()]}, ${date.getDate()} ${
    monthOfYear[date.getMonth()]
  } ${date.getFullYear()}`;
  return (
    <div className="greetings">
      {currentUser && (
        <span className="greetings__name">
          Cześć {currentUser.displayName} !
        </span>
      )}
      <span className="greetings__date">{today}</span>
    </div>
  );
};

export default Greetings;
