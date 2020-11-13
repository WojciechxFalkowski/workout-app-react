import React, { useState, useEffect, useContext } from "react";
import { DietList } from "./components";
import "./diet.scss";
import { useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { Button } from "components";
export interface Props {}

const Diet: React.FC<Props> = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [diet, setDiet] = useState([]);

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
