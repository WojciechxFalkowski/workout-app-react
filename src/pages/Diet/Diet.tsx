import React, { useState, useEffect, useContext } from "react";
import { DietList } from "./components";
import "./diet.scss";
import { useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { Button } from "components";
interface list {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  mineralsalt: number;
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
  const handleAddDiet = () => {
    const today = new Date();
    const todayDatePattern = `${today.getFullYear()}${today.getMonth() + 1}${
      today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
    }`;
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
    const dietArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      dietArray.push(childData);
    });

    setDiets(dietArray);
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
    <div className="diet">
      <div className="diet__div">
        <Button onClick={handleAddDiet}>Dodaj diete</Button>
        {flag && (
          <span className="diet__span">Dzisiejsza dieta jest już dodana</span>
        )}
      </div>
      <DietList diets={diets} />
    </div>
  );
};

export default Diet;
