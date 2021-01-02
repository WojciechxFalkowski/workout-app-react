import React from "react";
import { Link } from "react-router-dom";
import "./greetings.scss";
import { namesOfDaysOfWeekArray, namesOfTheMonths } from "utils/constants";
export type props = {
  name: string;
};

const Greetings = ({ name }: props) => {
  const date = new Date();
  const dayOfWeek = namesOfDaysOfWeekArray;
  const monthOfYear = namesOfTheMonths;
  const today = `${dayOfWeek[date.getDay()]}, ${date.getDate()} ${
    monthOfYear[date.getMonth()]
  } ${date.getFullYear()}`;
  return (
    <section className="greetings">
      <h2 className="greetings__name">
        {"Cześć "}
        {name ? (
          name
        ) : (
          <Link className="greetings__link" to="settings">
            nieznajomy
          </Link>
        )}
        {" !"}
      </h2>

      <span className="greetings__date">{today}</span>
    </section>
  );
};

export default Greetings;
