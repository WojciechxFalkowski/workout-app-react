import { Button } from "components";
import React, { useState, useContext } from "react";
import { AddElementBlock } from "./../../components";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase";

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
  meal: meal;
  indexList: number;
  id: string;
}

const MealTable: React.FC<Props> = ({ meal, indexList, id }) => {
  const { currentUser } = useContext(AuthContext);
  const [showBlock, setShowBlock] = useState(false);
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Sole mineralne",
    "Kalorie",
    "",
  ];
  const handleAddMealEelement = () => {
    setShowBlock(true);
  };
  const handleRemoveMealItem = (index: number) => {
    if (currentUser) {
      const filteredList = meal.list.filter((item, ind) => ind !== index);
      firebase
        .database()
        .ref(`users/${currentUser.uid}/diet/${id}/meal/${indexList}/list`)
        .set([...filteredList]);
    }
  };
  return (
    <>
      <table className="meal-table" key={meal.mealName}>
        <thead className="meal-table__thead">
          <tr className="meal-table__tr">
            <th className="meal-table__th">{meal.mealName}</th>
            {titles.map((title) => (
              <th key={title} className="meal-table__th">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="meal-table__tbody">
          {meal.list &&
            meal.list.map((item, index) => {
              return (
                <tr key={item.ingredient}>
                  <td className="meal-table__td">{item.ingredient}</td>
                  <td className="meal-table__td">{item.carbs}</td>
                  <td className="meal-table__td">{item.fats}</td>
                  <td className="meal-table__td">{item.proteins}</td>
                  <td className="meal-table__td">{item.mineralsalt}</td>
                  <td className="meal-table__td">{item.calories}</td>
                  <td className="meal-table__td">
                    <IoIosRemoveCircleOutline
                      onClick={() => handleRemoveMealItem(index)}
                    />
                  </td>
                </tr>
              );
            })}
          <tr className="meal-table__tr">
            <td className="meal-table__td">
              <Button onClick={handleAddMealEelement}>Dodaj</Button>
            </td>
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
