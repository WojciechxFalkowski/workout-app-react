import React from "react";
import { DietElement } from "./components";
interface list {
  ingredient: string;
  carbs: string;
  fats: string;
  proteins: string;
  mineralsalt: string;
  calories: string;
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
                  carbs += Number(item.carbs);
                  fats += Number(item.fats);
                  proteins += Number(item.proteins);
                  mineralsalt += Number(item.mineralsalt);
                  calories += Number(item.calories);
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
