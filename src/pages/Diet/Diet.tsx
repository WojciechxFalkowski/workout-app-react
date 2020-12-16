import React, { useState, useEffect, useContext } from "react";
import { DietList } from "./components";
import "./diet.scss";
import { useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { Button, LoadingIndicator } from "components";
import { dayMonthYearWithSeparator } from "utils/dateFunctions";
interface list {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
}
interface meal {
  mealName: string;
  list: Array<list>;
}
interface diet {
  date: string;
  meal: Array<meal>;
}
export interface Props {}

const Diet: React.FC<Props> = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [diets, setDiets] = useState<Array<diet>>([]);
  const [flag, setFlag] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleAddDiet = () => {
    const today = new Date();
    const todayDatePattern = dayMonthYearWithSeparator(today, "", "yes");
    let flag = true;
    diets.forEach((item) => {
      if (todayDatePattern === item.date) {
        flag = false;
        setFlag(true);
      }
    });
    if (flag) {
      const saveNewDiet = (userId: string, date: string) => {
        firebase
          .database()
          .ref("users/" + userId + "/diet/" + date)
          .set({ date });
      };

      if (currentUser) {
        saveNewDiet(currentUser.uid, todayDatePattern);
        history.push(`/diet/${todayDatePattern}`);
      }
    }
  };
  const uploadDiet = function (snapshot: any) {
    const dietArray: Array<diet> = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      dietArray.push(childData);
    });
    setDiets(dietArray);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/diet")
        .orderByChild("date");
      ref.on("value", uploadDiet);
      return () => {
        ref.off("value", uploadDiet);
      };
    }
  }, [currentUser]);
  return (
    <main className="diet">
      <div className="diet__div">
        <Button onClick={handleAddDiet}>Dodaj diete</Button>
        {flag && (
          <span className="diet__span">Dzisiejsza dieta jest już dodana</span>
        )}
      </div>
      {isLoaded ? <DietList diets={diets} /> : <LoadingIndicator />}
    </main>
  );
};

export default Diet;
