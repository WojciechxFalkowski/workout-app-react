import React from "react";
import { EatenCalories, TodayTrainings } from "./components";
import "./activities.scss";
interface ingredients {
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
}
export interface Props {
  ingredients: ingredients;
}

const Activities: React.FC<Props> = ({ ingredients }) => {
  return (
    <article className="activities">
      <span className="activities__title">Dzisiaj</span>
      <EatenCalories calories={ingredients.calories} />
      <TodayTrainings />
    </article>
  );
};

export default Activities;
