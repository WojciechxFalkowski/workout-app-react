import React from "react";
import { EatenCalories, TodayTrainings } from "./components";
import "./activities.scss";
type ingredients = {
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
};
export type props = {
  ingredients: ingredients;
};

const Activities = ({ ingredients }: props) => {
  return (
    <section className="activities">
      <p className="activities__title">Dzisiaj</p>
      <EatenCalories ingredients={ingredients} />
      <TodayTrainings />
    </section>
  );
};

export default Activities;
