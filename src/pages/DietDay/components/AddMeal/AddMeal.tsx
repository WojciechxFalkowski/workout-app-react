import React, { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";
import firebase from "firebase/app";
import { ingredientTitles } from "utils/constants";

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
  setActiveMeal: (arg1: boolean) => void;
  currentUserId: string;
  id: string;
};

const AddMeal = ({ meals, setActiveMeal, currentUserId, id }: props) => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState("");
  const titles = ingredientTitles;
  const maxNameLength = inputName.length >= 20;
  const handleAddMeal = () => {
    if (currentUserId) {
      firebase
        .database()
        .ref(`users/${currentUserId}/diet/${id}/meal`)
        .set([...meals, { mealName: inputName }]);
      setActiveMeal(false);
    }
    setActiveMeal(false);
  };
  useEffect(() => {
    if (inputNameRef.current) {
      inputNameRef.current.focus();
    }
  }, []);
  return (
    <table key="add-meal" className="meal-table">
      <thead className="meal-table__thead">
        <tr className="meal-table__tr">
          <th className="meal-table__th">
            <input
              type="text"
              value={inputName}
              placeholder="Nazwa"
              onChange={(e) => setInputName(e.target.value)}
              ref={inputNameRef}
            />
            <span className="meal-table__error">
              {meals.findIndex((meal) => meal.mealName === inputName) !== -1 &&
                "Nazwa zajęta"}{" "}
              {maxNameLength && "Maksymalna długość to 20 znaków"}
            </span>
          </th>
          {titles.map((title) => (
            <th key={title} className="meal-table__th">
              {title}
            </th>
          ))}

          <th className="meal-table__th">
            {meals &&
            meals.findIndex((meal) => meal.mealName === inputName) === -1 &&
            inputName !== "" &&
            !maxNameLength ? (
              <AiOutlineCheckCircle
                className="meal-table__save-meal"
                onClick={() => handleAddMeal()}
              />
            ) : (
              <AiFillDelete onClick={() => setActiveMeal(false)} />
            )}
          </th>
        </tr>
      </thead>
      <tbody className="meal-table__tbody"></tbody>
    </table>
  );
};

export default AddMeal;
