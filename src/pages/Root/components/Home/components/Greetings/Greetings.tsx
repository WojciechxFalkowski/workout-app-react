import React from "react";
import { Link } from "react-router-dom";
import "./greetings.scss";
export interface Props {
  name: string;
}

const Greetings: React.FC<Props> = ({ name }) => {
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
    <section className="greetings">
      <h1 className="greetings__name">
        {"Cześć "}
        {name ? (
          name
        ) : (
          <Link className="greetings__link" to="settings">
            nieznajomy
          </Link>
        )}
        {" !"}
      </h1>

      <span className="greetings__date">{today}</span>
    </section>
  );
};

export default Greetings;