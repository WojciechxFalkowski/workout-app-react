import React from "react";
import { DietElement } from "./components";
type list = {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
};
type meal = {
  mealName: string;
  list: Array<list>;
};
type diet = {
  date: string;
  meal: Array<meal>;
};
export type props = {
  diets: Array<diet>;
};

const DietList = ({ diets }: props) => {
  return (
    <>
      {diets
        .map((diet) => {
          let [carbs, fats, proteins, calories] = [0, 0, 0, 0];
          if (diet.meal) {
            diet.meal.forEach((meal) => {
              if (meal.list) {
                meal.list.forEach((item) => {
                  carbs += item.carbs;
                  fats += item.fats;
                  proteins += item.proteins;
                  calories += item.calories;
                });
              }
            });
          }
          return (
            <DietElement
              key={diet.date}
              date={diet.date}
              carbs={carbs}
              fats={fats}
              proteins={proteins}
              calories={calories}
            />
          );
        })
        .reverse()}
    </>
  );
};

export default DietList;
