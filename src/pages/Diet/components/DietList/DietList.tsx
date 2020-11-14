import React from "react";
import { DietElement } from "./components";
interface list {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  mineralsalt: number;
  calories: number;
}
interface meal {
  mealName: string;
  list: Array<list>;
}
interface diet {
  date: string;
  meal: Array<meal>;
}
export interface Props {
  diets: Array<diet>;
}

const DietList: React.FC<Props> = ({ diets }) => {
  return (
    <>
      {diets
        .map((diet) => {
          let [carbs, fats, proteins, mineralsalt, calories] = [0, 0, 0, 0, 0];
          if (diet.meal) {
            diet.meal.forEach((meal) => {
              if (meal.list) {
                meal.list.forEach((item) => {
                  carbs += item.carbs;
                  fats += item.fats;
                  proteins += item.proteins;
                  mineralsalt += item.mineralsalt;
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
              mineralsalt={mineralsalt}
              calories={calories}
            />
          );
        })
        .reverse()}
    </>
  );
};

export default DietList;
