import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import "./dietDay.scss";
import { GoBackDelete, Button, LoadingIndicator } from "components";
import { MealList, AddMeal, MealSummary } from "./components";

interface params {
  id: string;
}
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
export interface Props {}
const DietDay: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const params: params = useParams();
  const history = useHistory();
  const [meals, setMeals] = useState<Array<meal>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const uploadDietDay = function (snapshot: any) {
    const dietDayArray: Array<meal> = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      dietDayArray.push(childData);
    });
    setMeals(dietDayArray);
  };
  const [activeMeal, setActiveMeal] = useState(false);
  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/diet/" + params.id + "/meal");
      ref.on("value", uploadDietDay);
      setIsLoaded(true);
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
      {isLoaded ? (
        <section className="diet-day__section">
          <Button onClick={() => setActiveMeal(true)}>Dodaj posiłek</Button>
          <MealList meals={meals} id={params.id} />
          {activeMeal && currentUser && (
            <AddMeal
              meals={meals}
              setActiveMeal={setActiveMeal}
              currentUserId={currentUser.uid}
              id={params.id}
            />
          )}
          {meals.length !== 0 && currentUser && (
            <MealSummary meals={meals} currentUserId={currentUser.uid} />
          )}
        </section>
      ) : (
        <LoadingIndicator />
      )}
    </main>
  );
};

export default DietDay;
