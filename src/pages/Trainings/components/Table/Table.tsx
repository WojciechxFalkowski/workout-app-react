import React from "react";
import "./Table.scss";
import { useHistory } from "react-router-dom";
export interface Props {
  trainings: Array<training>;
}
interface training {
  id: string;
  date: string;
  workoutName: string;
}
const Table: React.FC<Props> = ({ trainings }) => {
  const history = useHistory();
  const handleTraining = (training: training) => {
    history.push(`/trainings/${training.id}`);
  };
  return (
    <>
      <h2 className="trainings__h2">Treningi</h2>
      <table className="trainings__table">
        <thead>
          <tr className="trainings__tr">
            <th className="trainings__th">Nazwa</th>
            <th className="trainings__th">Data</th>
          </tr>
        </thead>
        <tbody>
          {trainings
            .map((training: training) => {
              const date = new Date(training.date);
              const modifiedDate = `${
                date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
              }-${
                date.getMonth() + 1 > 9
                  ? date.getMonth() + 1
                  : "0" + date.getMonth() + 1
              }-${date.getFullYear()} ${
                date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
              }:${
                date.getMinutes() > 9
                  ? date.getMinutes()
                  : "0" + date.getMinutes()
              }`;
              return (
                <tr key={training.id} className="trainings__tr">
                  <th className="trainings__th">
                    <span
                      onClick={() => handleTraining(training)}
                      className="trainings__span"
                    >
                      {training.workoutName}
                    </span>
                  </th>
                  <th className="trainings__th">{modifiedDate}</th>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </>
  );
};

export default Table;
