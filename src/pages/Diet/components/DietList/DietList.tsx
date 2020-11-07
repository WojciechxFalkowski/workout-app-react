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
  date: string;
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
          let [carbs, fat, protein, sodium, sugar, calories] = [
            0,
            0,
            0,
            0,
            0,
            0,
          ];

          diet.meals?.forEach((meal) => {
            carbs += meal.carbs;
            fat += meal.fat;
            protein += meal.protein;
            sodium += meal.sodium;
            sugar += meal.sugar;
            calories += meal.calories;
          });
          return (
            <DietElement
              key={diet.date}
              date={diet.date}
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
