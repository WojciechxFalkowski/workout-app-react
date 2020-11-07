import React, { useState, useEffect, useContext } from "react";
import { DietList } from "./components";
import "./diet.scss";
import { useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase";
import { Button } from "components";
export interface Props {}
interface meal {
  name: string;
  carbs: number;
  fat: number;
  protein: number;
  sodium: number;
  sugar: number;
  calories: number;
}
interface diet {
  date: Date;
  meals: Array<meal>;
}

const Diet: React.FC<Props> = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [diet, setDiet] = useState([]);
  const [diets, setDiets] = useState<Array<diet>>([
    {
      date: new Date("2020-11-05T21:25"),
      meals: [
        {
          name: "Sniadanie",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 100,
          calories: 100,
        },
        {
          name: "Obiad",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 100,
          calories: 100,
        },
      ],
    },
    {
      date: new Date("2020-11-06T21:25"),
      meals: [
        {
          name: "Sniadanie",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 140,
          calories: 100,
        },
        {
          name: "Obiad",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 150,
          sugar: 100,
          calories: 100,
        },
      ],
    },
  ]);
  const handleAddDiet = () => {
    const saveNewDiet = (userId: string, date: string) => {
      firebase
        .database()
        .ref("users/" + userId + "/diet/" + date)
        .set({ date });
    };
    const today = new Date();
    const todayDatePattern = `${today.getFullYear()}${today.getMonth() + 1}${
      today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
    }`;

    if (currentUser) {
      saveNewDiet(currentUser.uid, todayDatePattern);
      history.push(`/diet/${todayDatePattern}`);
    }
  };
  const uploadDiet = function (snapshot: any) {
    const dietArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      dietArray.push(childData);
    });

    setDiet(dietArray);
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
      <Button onClick={handleAddDiet}>Dodaj diete</Button>
      <DietList diets={diet} />
    </div>
  );
};

export default Diet;
