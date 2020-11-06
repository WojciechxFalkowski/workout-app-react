import React, { useState } from "react";
import { DietElement } from "./components";
export interface Props {}

const Diet: React.FC<Props> = () => {
  const [diets, setDiets] = useState([
    {
      date: new Date("2020-11-05T21:25"),
      meals: [
        {
          name: "Sniadanie",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 100,
          calories: 100,
        },
        {
          name: "Obiad",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 100,
          calories: 100,
        },
      ],
    },
    {
      date: new Date("2020-11-06T21:25"),
      meals: [
        {
          name: "Sniadanie",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 140,
          calories: 100,
        },
        {
          name: "Obiad",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 150,
          sugar: 100,
          calories: 100,
        },
      ],
    },
  ]);
  return (
    <>
      <h2 className="diet__h2">Diet</h2>
      {diets.map((diet) => {
        const date = new Date(diet.date);
        const modifiedDate = `${
          date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
        }/${
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + date.getMonth() + 1
        }/${date.getFullYear()}`;
        let [carbs, fat, protein, sodium, sugar, calories] = [0, 0, 0, 0, 0, 0];
        diet.meals.forEach((meal) => {
          carbs += meal.carbs;
          fat += meal.fat;
          protein += meal.protein;
          sodium += meal.sodium;
          sugar += meal.sugar;
          calories += meal.calories;
        });
        console.log(carbs, fat, protein, sodium, sugar, calories);
        return (
          <DietElement
            modifiedDate={modifiedDate}
            carbs={carbs}
            fat={fat}
            protein={protein}
            sodium={sodium}
            sugar={sugar}
            calories={calories}
          />
        );
      })}
    </>
  );
};

export default Diet;
