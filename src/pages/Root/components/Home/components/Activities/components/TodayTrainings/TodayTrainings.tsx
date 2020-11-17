import * as React from "react";
import "./todayTrainings.scss";
export interface Props {}

const TodayTrainings: React.FC<Props> = () => {
  return (
    <div className="today-trainings">
      <span className="today-trainings__title">Treningi</span>
      <div className="today-trainings__trainings">Klatka piersiowa</div>
    </div>
  );
};

export default TodayTrainings;
