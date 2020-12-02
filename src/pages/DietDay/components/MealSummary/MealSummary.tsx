import React, { useState, useEffect } from "react";
import "./mealSummary.scss";
import firebase from "firebase/app";
interface mealItem {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
}
interface meal {
  mealName: string;
  list: Array<mealItem>;
}
interface diet {
  calories: number;
  carbs: number;
  fats: number;
  proteins: number;
}
export interface Props {
  meals: Array<meal>;
  currentUserId: string;
}
const MealSummary: React.FC<Props> = ({ meals, currentUserId }) => {
  const sumNutrientsByType: Array<number> = [0, 0, 0, 0];
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Kalorie",
  ];
  const [diet, setDiet] = useState<Array<number>>([0, 0, 0, 0]);
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
            <tr className="meal-summary__tr">
              <td className="meal-summary__td">Razem</td>
              {sumNutrientsByType.map((type, index) => {
                return (
                  <td key={titles[index]} className="meal-summary__td">
                    {type}
                  </td>
                );
              })}
            </tr>
            <tr className="meal-summary__tr">
              <td className="meal-summary__td">Dzienny plan</td>
              {titles.map((title, index) => (
                <td key={title} className="meal-summary__td">
                  {diet[index] === undefined ? "-" : diet[index]}
                </td>
              ))}
            </tr>
            <tr className="meal-summary__tr">
              <td className="meal-summary__td">Brakujące</td>
              {sumNutrientsByType.map((type, index) => {
                const distinction =
                  diet[index] === undefined ? "-" : type - diet[index];
                if (distinction >= 0) {
                  return (
                    <td
                      key={titles[index]}
                      className="meal-summary__td meal-summary__above-zero"
                    >
                      {distinction}
                    </td>
                  );
                } else if (distinction === "-") {
                  return (
                    <td key={titles[index]} className="meal-summary__td">
                      {distinction}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={titles[index]}
                      className="meal-summary__td meal-summary__below-zero"
                    >
                      {distinction}
                    </td>
                  );
                }
              })}
            </tr>
          </tbody>
          <tfoot className="meal-summary__tfoot">
            <tr className="meal-summary__tr">
              <th className="meal-summary__th"></th>
              {titles.map((title) => (
                <th key={title} className="meal-summary__th">
                  {title}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default MealSummary;
