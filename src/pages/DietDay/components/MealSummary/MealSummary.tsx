import React, { useState, useEffect } from "react";
import "./mealSummary.scss";
import firebase from "firebase/app";
import { ingredientTitles } from "utils/constants";
import {
  SumOfEatenIngredients,
  DailyPlan,
  MissingCalories,
  Tfoot,
} from "./components";
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
  currentUserId: string;
};
const MealSummary = ({ meals, currentUserId }: props) => {
  const sumNutrientsByType = [0, 0, 0, 0];
  const titles = ingredientTitles;
  const [diet, setDiet] = useState([0, 0, 0, 0]);
  const [flag, setFlag] = useState(false);
  meals.forEach((meal) => {
    if (meal.list) {
      meal.list.forEach((item) => {
        sumNutrientsByType[0] += item.carbs;
        sumNutrientsByType[1] += item.fats;
        sumNutrientsByType[2] += item.proteins;
        sumNutrientsByType[3] += item.calories;
      });
    }
  });
  const uploadDiet = (snapshot: any) => {
    if (snapshot.val()) {
      const { carbs, fats, proteins, calories } = snapshot.val();
      setDiet([carbs, fats, proteins, calories]);
      setFlag(true);
    }
  };
  useEffect(() => {
    if (currentUserId) {
      const ref = firebase
        .database()
        .ref("users/" + currentUserId + "/settings/diet");
      ref.on("value", uploadDiet);
      return () => {
        ref.off("value", uploadDiet);
      };
    }
  }, [currentUserId]);
  return (
    <>
      {flag && (
        <table className="meal-summary">
          <tbody className="meal-summary__tbody">
            <SumOfEatenIngredients
              sumNutrientsByType={sumNutrientsByType}
              titles={titles}
            />
            <DailyPlan diet={diet} titles={titles} />
            <MissingCalories
              sumNutrientsByType={sumNutrientsByType}
              diet={diet}
              titles={titles}
            />
          </tbody>
          <Tfoot titles={titles} />
        </table>
      )}
    </>
  );
};

export default MealSummary;
