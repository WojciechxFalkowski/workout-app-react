import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase";
import "./dietDay.scss";
import { Button, GoBackDelete } from "components";
interface params {
  id: string;
}
export interface Props {}

const DietDay: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const params: params = useParams();
  const history = useHistory();

  const [dietDay, setDietDay] = useState([]);

  const uploadDietDay = function (snapshot: any) {
    const dietDayArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      dietDayArray.push(childData);
    });

    setDietDay(dietDayArray);
  };

  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/diet/" + params.id)
        .orderByChild("date");
      ref.on("value", uploadDietDay);
      return () => {
        ref.off("value", uploadDietDay);
      };
    }
  }, [currentUser, params.id]);
  console.log("dietDay", dietDay);
  const handleAddMeal = () => {
    console.log("handleAddMeal");
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
      <GoBackDelete handleEdit={handleRemoveDietDay} />
      <Button onClick={handleAddMeal}>Dodaj posiłek</Button>
    </div>
  );
};

export default DietDay;
