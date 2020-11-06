import React from "react";
import { DietElement } from "./components";

interface meal {
  name: string;
  carbs: number;
  fat: number;
  protein: number;
  sodium: number;
  sugar: number;
  calories: number;
}
interface diet {
  date: Date;
  meals: Array<meal>;
}
export interface Props {
  diets: Array<diet>;
}

const DietList: React.FC<Props> = ({ diets }) => {
  return (
    <>
      {diets
        .map((diet) => {
          const date = new Date(diet.date);
          const modifiedDate = `${
            date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
          }/${
            date.getMonth() + 1 > 9
              ? date.getMonth() + 1
              : "0" + date.getMonth() + 1
          }/${date.getFullYear()}`;
          let [carbs, fat, protein, sodium, sugar, calories] = [
            0,
            0,
            0,
            0,
            0,
            0,
          ];
          diet.meals.forEach((meal) => {
            carbs += meal.carbs;
            fat += meal.fat;
            protein += meal.protein;
            sodium += meal.sodium;
            sugar += meal.sugar;
            calories += meal.calories;
          });
          return (
            <DietElement
              key={modifiedDate}
              modifiedDate={modifiedDate}
              carbs={carbs}
              fat={fat}
              protein={protein}
              sodium={sodium}
              sugar={sugar}
              calories={calories}
            />
          );
        })
        .reverse()}
    </>
  );
};

export default DietList;
