import React from "react";
import { useHistory } from "react-router-dom";
import { dayMonthYearWithSeparator } from "utils/dateFunctions";
import "./listItems.scss";
interface exercise {
  workoutName: string;
  series: Array<string>;
}
interface training {
  id: string;
  date: string;
  workoutName: string;
  exercises?: exercise;
}
export interface Props {
  trainings: Array<training>;
}
const Table: React.FC<Props> = ({ trainings }) => {
  const history = useHistory();
  const handleTraining = (training: training) => {
    history.push(`/trainings/${training.id}`);
  };

  return (
    <ul className="list-items">
      {trainings
        .map((training: training) => {
          const date = new Date(training.date);
          const modifiedDate = `${dayMonthYearWithSeparator(date, "/")}`;
          let exercisesCount = 0;
          if (training.exercises) {
            exercisesCount = Object.keys(training.exercises).length;
          }
          return (
            <li
              onClick={() => handleTraining(training)}
              key={training.id}
              className="list-items__li"
            >
              <span className="list-items__span">{training.workoutName}</span>
              <span className="list-items__span">{modifiedDate}</span>
              <span className="list-items__span">{exercisesCount}</span>
            </li>
          );
        })
        .reverse()}
    </ul>
  );
};

export default Table;
