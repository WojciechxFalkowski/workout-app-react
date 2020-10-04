import React from "react";
import "./List.scss";
export interface Props {
  trainings: Array<training>;
}
interface training {
  date: string;
  trainingName: string;
}
const List: React.FC<Props> = ({ trainings }) => {
  return (
    <div className="list">
      <h2 className="list__h2">Ostatnie treningi</h2>
      <ul className="list__ul">
        {trainings &&
          trainings
            .map((training) => {
              return (
                <li key={training.date} className="list__li">
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
