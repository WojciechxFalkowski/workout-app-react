import React from "react";
import "./List.scss";
import { useHistory } from "react-router-dom";
export interface Props {
  trainings: Array<training>;
}
interface training {
  id: string;
  date: string;
  workoutName: string;
}
const List: React.FC<Props> = ({ trainings }) => {
  let history = useHistory();
  const handleTraining = (training: training) => {
    history.push(`/trainings/${training.id}`);
  };
  return (
    <div className="list">
      <h2 className="list__h2">Treningi</h2>
      <ul className="list__ul">
        {trainings &&
          trainings
            .map((training) => {
              const modifiedDate = training.date.replace(/T/g, " ");
              return (
                <li
                  onClick={() => handleTraining(training)}
                  key={training.id}
                  className="list__li"
                >
                  <p className="list__p">{training.workoutName}</p>
                  <p className="list__p">{modifiedDate}</p>
                </li>
              );
            })
            .reverse()}
      </ul>
    </div>
  );
};

export default List;
