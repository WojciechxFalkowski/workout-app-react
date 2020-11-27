import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import "./greetings.scss";
export interface Props {
  name: string;
}

const Greetings: React.FC<Props> = ({ name }) => {
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
      <span className="greetings__name">
        {"Cześć "}
        {name ? (
          name
        ) : (
          <Link className="greetings__link" to="settings">
            nieznajomy
          </Link>
        )}
        {" !"}
      </span>

      <span className="greetings__date">{today}</span>
    </div>
  );
};

export default Greetings;
