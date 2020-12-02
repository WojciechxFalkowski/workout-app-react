import React, { useContext } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { AuthContext } from "components/AuthProvider/AuthProvider";
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
  meal: meal;
  item: mealItem;
  index: number;
  indexList: number;
  id: string;
}

const IngredientItem: React.FC<Props> = ({
  meal,
  item,
  index,
  indexList,
  id,
}) => {
  const { currentUser } = useContext(AuthContext);
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
    <tr>
      <td className="meal-table__td">{item.ingredient}</td>
      <td className="meal-table__td">{item.carbs}</td>
      <td className="meal-table__td">{item.fats}</td>
      <td className="meal-table__td">{item.proteins}</td>
      <td className="meal-table__td">{item.calories}</td>
      <td className="meal-table__td">
        <IoIosRemoveCircleOutline
          onClick={() => handleRemoveMealItem(index)}
          className="meal-table__remove"
        />
      </td>
    </tr>
  );
};

export default IngredientItem;
