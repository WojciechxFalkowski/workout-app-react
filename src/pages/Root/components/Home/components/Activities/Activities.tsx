import React from "react";
import { EatenCalories, TodayTrainings } from "./components";
import "./activities.scss";
export interface Props {
  calories: number;
}

const Activities: React.FC<Props> = ({ calories }) => {
  return (
    <article className="activities">
      <span className="activities__title">Dzisiaj</span>
      <EatenCalories calories={calories} />
      <TodayTrainings />
    </article>
  );
};

export default Activities;