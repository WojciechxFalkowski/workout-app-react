import { Button } from "components";
import React, { useState, useContext } from "react";
import { AddElementBlock } from "./../../components";

import { AiFillDelete } from "react-icons/ai";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { IngredientItem, SumNutrientsByType } from "./components";
import "./mealTable.scss";
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
  meal: meal;
  indexList: number;
  id: string;
}

const MealTable: React.FC<Props> = ({ meals, meal, indexList, id }) => {
  const { currentUser } = useContext(AuthContext);
  const [showBlock, setShowBlock] = useState(false);
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Sole mineralne",
    "Kalorie",
  ];

  const handleAddMealEelement = () => {
    setShowBlock(true);
  };

  const handleRemoveMeal = (mealName: string) => {
    if (currentUser) {
      const filteredMealList = meals.filter(
        (item) => item.mealName !== mealName
      );
      console.log("filteredMealList", filteredMealList);
      firebase
        .database()
        .ref(`users/${currentUser.uid}/diet/${id}/meal`)
        .set([...filteredMealList]);
    }
  };
  return (
    <>
      <table key={meal.mealName} className="meal-table">
        <thead className="meal-table__thead">
          <tr className="meal-table__tr">
            <th className="meal-table__th">{meal.mealName}</th>
            {titles.map((title) => (
              <th key={title} className="meal-table__th">
                {title}
              </th>
            ))}

            <th className="meal-table__th">
              <AiFillDelete onClick={() => handleRemoveMeal(meal.mealName)} />
            </th>
          </tr>
        </thead>
        <tbody className="meal-table__tbody">
          {meal.list &&
            meal.list.map((item, index) => {
              return (
                <IngredientItem
                  key={item.ingredient}
                  meal={meal}
                  item={item}
                  index={index}
                  indexList={indexList}
                  id={id}
                />
              );
            })}
          <tr className="meal-table__tr">
            <td className="meal-table__td">
              <Button onClick={handleAddMealEelement}>Dodaj</Button>
            </td>
            <SumNutrientsByType meal={meal} titles={titles} />
            <td className="meal-table__td"></td>
          </tr>
        </tbody>
      </table>
      {showBlock && (
        <AddElementBlock
          index={indexList}
          id={id}
          setShowBlock={setShowBlock}
          meal={meal}
        />
      )}
    </>
  );
};

export default MealTable;
