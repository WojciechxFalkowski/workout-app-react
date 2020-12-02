import React from "react";

import { MealTable } from "./components";
interface mealItem {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
}
interface meal {
  mealName: string;
  list: Array<mealItem>;
}

export interface Props {
  meals: Array<meal>;
  id: string;
}
const MealList: React.FC<Props> = ({ meals, id }) => {
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
