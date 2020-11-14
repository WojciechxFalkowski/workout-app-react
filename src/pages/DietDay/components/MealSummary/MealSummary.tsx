import React from "react";
import "./mealSummary.scss";
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
  meals: Array<meal>;
}
const MealSummary: React.FC<Props> = ({ meals }) => {
  const sumNutrientsByType: Array<number> = [0, 0, 0, 0, 0];
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Sole mineralne",
    "Kalorie",
  ];
  const dailySchedule: Array<number> = [3000, 3000, 3000, 3000, 3000];
  meals.forEach((meal) => {
    if (meal.list) {
      meal.list.forEach((item) => {
        sumNutrientsByType[0] += item.carbs;
        sumNutrientsByType[1] += item.fats;
        sumNutrientsByType[2] += item.proteins;
        sumNutrientsByType[3] += item.mineralsalt;
        sumNutrientsByType[4] += item.calories;
      });
    }
  });
  return (
    <table className="mealSummary">
      <tbody className="mealSummary__tbody">
        <tr className="mealSummary__tr">
          <td className="mealSummary__td">Razem</td>
          {sumNutrientsByType.map((type, index) => {
            return (
              <td key={titles[index]} className="mealSummary__td">
                {type}
              </td>
            );
          })}
        </tr>
        <tr className="mealSummary__tr">
          <td className="mealSummary__td">Dzienny plan</td>
          {dailySchedule.map((item, index) => (
            <td key={titles[index]} className="mealSummary__td">
              {item}
            </td>
          ))}
        </tr>
        <tr className="mealSummary__tr">
          <td className="mealSummary__td">Brakujące</td>
          {dailySchedule.map((item, index) => {
            const distinction = sumNutrientsByType[index] - item;
            if (distinction >= 0) {
              return (
                <td
                  key={titles[index]}
                  className="mealSummary__td mealSummary__above-zero"
                >
                  {distinction}
                </td>
              );
            } else {
              return (
                <td
                  key={titles[index]}
                  className="mealSummary__td mealSummary__below-zero"
                >
                  {distinction}
                </td>
              );
            }
          })}
        </tr>
      </tbody>
      <tfoot className="mealSummary__tfoot">
        <tr className="mealSummary__tr">
          <th className="mealSummary__th"></th>
          {titles.map((title) => (
            <th key={title} className="mealSummary__th">
              {title}
            </th>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default MealSummary;
