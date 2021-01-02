import React from "react";

import { MealTable } from "./components";
type mealItem = {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
};
type meal = {
  mealName: string;
  list: Array<mealItem>;
};

export type props = {
  meals: Array<meal>;
  id: string;
};
const MealList = ({ meals, id }: props) => {
  return (
    <>
      {meals &&
        meals.map((meal, index) => {
          return (
            <MealTable
              key={meal.mealName}
              meals={meals}
              meal={meal}
              indexList={index}
              id={id}
            />
          );
        })}
    </>
  );
};

export default MealList;
