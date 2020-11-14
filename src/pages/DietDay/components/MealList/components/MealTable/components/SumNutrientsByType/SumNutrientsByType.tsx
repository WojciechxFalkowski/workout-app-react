import React from "react";
interface mealItem {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  mineralsalt: number;
  calories: number;
}
interface meal {
  mealName: string;
  list: Array<mealItem>;
}
export interface Props {
  meal: meal;
  titles: Array<string>;
}

const SumNutrientsByType: React.FC<Props> = ({ meal, titles }) => {
  const sumNutrientsByType = [0, 0, 0, 0, 0];
  if (meal.list) {
    meal.list.forEach((item) => {
      sumNutrientsByType[0] += Number(item.carbs);
      sumNutrientsByType[1] += Number(item.fats);
      sumNutrientsByType[2] += Number(item.proteins);
      sumNutrientsByType[3] += Number(item.mineralsalt);
      sumNutrientsByType[4] += Number(item.calories);
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
