import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import "./dietDay.scss";
import { Button, GoBackDelete } from "components";
import { Block, MealList } from "./components";
interface params {
  id: string;
}
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

export interface Props {}

const DietDay: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const params: params = useParams();
  const history = useHistory();
  const [meals, setMeals] = useState<Array<meal>>([]);

  const [showBlock, setShowBlock] = useState(false);
  const uploadDietDay = function (snapshot: any) {
    const dietDayArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      dietDayArray.push(childData);
    });
    setMeals(dietDayArray);
  };

  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/diet/" + params.id + "/meal");

      ref.on("value", uploadDietDay);
      return () => {
        ref.off("value", uploadDietDay);
      };
    }
  }, [currentUser, params.id]);

  const handleAddMeal = () => {
    setShowBlock(true);
  };
  const handleRemoveDietDay = () => {
    if (currentUser) {
      firebase
        .database()
        .ref(`users/${currentUser.uid}/diet/${params.id}`)
        .remove();
      history.goBack();
    }
  };
  return (
    <div className="diet-day">
      {showBlock && (
        <Block
          setShowBlock={setShowBlock}
          meals={meals}
          setMeals={setMeals}
          id={params.id}
        />
      )}
      <GoBackDelete handleEdit={handleRemoveDietDay} />
      <Button onClick={handleAddMeal}>Dodaj posiłek</Button>

      <MealList meals={meals} id={params.id} />
    </div>
  );
};

export default DietDay;
