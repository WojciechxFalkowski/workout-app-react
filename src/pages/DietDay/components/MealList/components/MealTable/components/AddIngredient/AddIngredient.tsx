import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import firebase from "firebase/app";
import { Input } from "utils/customHooks";
type mealItem = {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
};
export type props = {
  setActiveMeal: (active: boolean) => void;
  mealList: Array<mealItem>;
  currentUserId: string;
  id: string;
  indexList: number;
};

const AddIngredient = ({
  setActiveMeal,
  mealList,
  currentUserId,
  id,
  indexList,
}: props) => {
  const [ingredient, setIngredient] = Input({ type: "text" });
  const [carbs, setCarbs] = Input({ type: "number" });
  const [fats, setFats] = Input({ type: "number" });
  const [proteins, setProteins] = Input({ type: "number" });
  const [calories, setCalories] = Input({ type: "number" });
  let isNameTaken;
  if (mealList) {
    isNameTaken =
      mealList.findIndex((item) => item.ingredient === String(ingredient)) !==
      -1;
  }
  const maxNameLength =
    typeof ingredient === "string" && ingredient.length >= 40;
  const handleSaveMealItem = () => {
    const mealItem = {
      ingredient: String(ingredient),
      carbs: Number(carbs),
      fats: Number(fats),
      proteins: Number(proteins),
      calories: Number(calories),
    };
    if (currentUserId) {
      let mealItems = [];
      if (mealList) {
        mealItems = [...mealList, mealItem];
      } else {
        mealItems = [mealItem];
      }
      firebase
        .database()
        .ref(`users/${currentUserId}/diet/${id}/meal/${indexList}/list`)
        .set(mealItems);
      setActiveMeal(false);
    }
  };
  return (
    <tr className="meal-table__tr">
      <td className="meal-table__td">
        {setIngredient}
        <span className="meal-table__span">
          {isNameTaken && "Podana nazwa jest zajęta"}{" "}
          {maxNameLength && "Maksymalna długość to 40 znaków"}
        </span>
      </td>
      <td className="meal-table__td">{setCarbs}</td>
      <td className="meal-table__td">{setFats}</td>
      <td className="meal-table__td">{setProteins}</td>
      <td className="meal-table__td">{setCalories}</td>
      <td className="meal-table__td">
        <span>
          {ingredient !== "" &&
          carbs !== "" &&
          fats !== "" &&
          proteins !== "" &&
          calories !== "" &&
          !isNameTaken &&
          !maxNameLength ? (
            <AiOutlineCheckCircle
              className="meal-table__save"
              onClick={() => handleSaveMealItem()}
            />
          ) : (
            <IoIosRemoveCircleOutline
              onClick={() => setActiveMeal(false)}
              className="meal-table__remove"
            />
          )}
        </span>
      </td>
    </tr>
  );
};

export default AddIngredient;
