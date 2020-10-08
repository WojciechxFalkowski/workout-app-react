import React from "react";
import "./List.scss";
import { useHistory } from "react-router-dom";
export interface Props {
  trainings: Array<training>;
}
interface training {
  id: string;
  date: string;
  trainingName: string;
}
const List: React.FC<Props> = ({ trainings }) => {
  let history = useHistory();
  const handleTraining = (training: training) => {
    console.log(training);
    history.push(`/trainings/${training.id}`);
  };
  return (
    <div className="list">
      <h2 className="list__h2">Ostatnie treningi</h2>
      <ul className="list__ul">
        {trainings &&
          trainings
            .map((training) => {
              return (
                <li
                  onClick={() => handleTraining(training)}
                  key={training.date}
                  className="list__li"
                >
                  <p className="list__p">{training.trainingName}</p>
                  <p className="list__p">{training.date}</p>
                </li>
              );
            })
            .reverse()}
      </ul>
    </div>
  );
};

export default List;
