import React from "react";
import { Link } from "react-router-dom";
import "./greetings.scss";
import { namesOfDaysOfWeekArray, namesOfTheMonths } from "utils/constants";
export interface Props {
  name: string;
}

const Greetings: React.FC<Props> = ({ name }) => {
  const date = new Date();
  const dayOfWeek = namesOfDaysOfWeekArray;
  const monthOfYear = namesOfTheMonths;
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
