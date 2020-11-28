import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import "./dietDay.scss";
import { GoBackDelete } from "components";
import { MealList, AddMeal, MealSummary } from "./components";
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
    <main className="diet-day">
      <GoBackDelete handleEdit={handleRemoveDietDay} editTitle="Usuń diete" />
      <section className="diet-day__section">
        <AddMeal meals={meals} id={params.id} />
        <MealList meals={meals} id={params.id} />
        {meals.length !== 0 && <MealSummary meals={meals} />}
      </section>
    </main>
  );
};

export default DietDay;
