import React from "react";
import { EatenCalories, TodayTrainings } from "./components";
import "./activities.scss";
export interface Props {}

const Activities: React.FC<Props> = () => {
  return (
    <div className="activities">
      <span className="activities__title">Dzisiaj</span>
      <EatenCalories />
      <TodayTrainings />
    </div>
  );
};

export default Activities;
