import React, { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";
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
export interface Props {
  meals: Array<meal>;
  setActiveMeal: (arg1: boolean) => void;
  currentUserId: string;
  id: string;
}

const AddMeal: React.FC<Props> = ({
  meals,
  setActiveMeal,
  currentUserId,
  id,
}) => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState("");
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Kalorie",
  ];
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
            <span className="meal-table__add">
              {meals &&
                meals.findIndex((meal) => meal.mealName === inputName) === -1 &&
                inputName !== "" && (
                  <AiOutlineCheckCircle
                    className="meal-table__save-meal"
                    onClick={() => handleAddMeal()}
                  />
                )}
            </span>
            <span className="meal-table__error">
              {meals.findIndex((meal) => meal.mealName === inputName) !== -1 &&
                "Nazwa zajęta"}
            </span>
          </th>
          {titles.map((title) => (
            <th key={title} className="meal-table__th">
              {title}
            </th>
          ))}

          <th className="meal-table__th">
            <AiFillDelete onClick={() => setActiveMeal(false)} />
          </th>
        </tr>
      </thead>
      <tbody className="meal-table__tbody"></tbody>
    </table>
  );
};

export default AddMeal;
