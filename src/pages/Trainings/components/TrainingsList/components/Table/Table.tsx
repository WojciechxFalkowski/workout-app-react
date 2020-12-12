import React from "react";
import { useHistory } from "react-router-dom";
import {
  dayMonthYearWithSeparator,
  hoursMinutesWithSeparator,
} from "utils/dateFunctions";
import "./table.scss";
interface training {
  id: string;
  date: string;
  workoutName: string;
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
    <table className="table">
      <thead>
        <tr className="table__tr">
          <th className="table__th">Nazwa</th>
          <th className="table__th">Data</th>
        </tr>
      </thead>
      <tbody>
        {trainings
          .map((training: training) => {
            const date = new Date(training.date);
            const modifiedDate = `${dayMonthYearWithSeparator(
              date,
              "/"
            )} ${hoursMinutesWithSeparator(date, ":")}`;
            return (
              <tr key={training.id} className="table__tr">
                <th className="table__th">
                  <button
                    onClick={() => handleTraining(training)}
                    className="table__button"
                  >
                    {training.workoutName}
                  </button>
                </th>
                <th className="table__th">{modifiedDate}</th>
              </tr>
            );
          })
          .reverse()}
      </tbody>
    </table>
  );
};

export default Table;
