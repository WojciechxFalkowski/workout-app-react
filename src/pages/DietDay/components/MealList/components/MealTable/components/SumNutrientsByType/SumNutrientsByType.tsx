import React from "react";
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
  meal: meal;
  titles: Array<string>;
};

const SumNutrientsByType = ({ meal, titles }: props) => {
  const sumNutrientsByType = [0, 0, 0, 0];
  if (meal.list) {
    meal.list.forEach((item) => {
      sumNutrientsByType[0] += item.carbs;
      sumNutrientsByType[1] += item.fats;
      sumNutrientsByType[2] += item.proteins;
      sumNutrientsByType[3] += item.calories;
    });
  }
  return (
    <>
      {sumNutrientsByType.map((item, index) => {
        return (
          <td key={titles[index]} className="meal-table__td">
            {item}
          </td>
        );
      })}
    </>
  );
};

export default SumNutrientsByType;
