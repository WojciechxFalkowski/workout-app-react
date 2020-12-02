import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import firebase from "firebase/app";
interface mealItem {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
}
export interface Props {
  setActiveMeal: (active: boolean) => void;
  mealList: Array<mealItem>;
  currentUserId: string;
  id: string;
  indexList: number;
}

const AddIngredient: React.FC<Props> = ({
  setActiveMeal,
  mealList,
  currentUserId,
  id,
  indexList,
}) => {
  const useInput = ({ type }: any) => {
    const [value, setValue] = useState("");
    const input = (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        min={0}
      />
    );
    return [value, input];
  };
  const [ingredient, setIngredient] = useInput({ type: "text" });
  const [carbs, setCarbs] = useInput({ type: "number" });
  const [fats, setFats] = useInput({ type: "number" });
  const [proteins, setProteins] = useInput({ type: "number" });
  const [calories, setCalories] = useInput({ type: "number" });
  let isNameTaken;
  if (mealList) {
    isNameTaken =
      mealList.findIndex((item) => item.ingredient === String(ingredient)) !==
      -1;
  }
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
          {isNameTaken && "Podana nazwa jest zajęta"}
        </span>
      </td>
      <td className="meal-table__td">{setCarbs}</td>
      <td className="meal-table__td">{setFats}</td>
      <td className="meal-table__td">{setProteins}</td>
      <td className="meal-table__td">{setCalories}</td>
      <td className="meal-table__td">
        <span onClick={() => handleSaveMealItem()}>
          {ingredient !== "" &&
          carbs !== "" &&
          fats !== "" &&
          proteins !== "" &&
          calories !== "" &&
          !isNameTaken ? (
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
