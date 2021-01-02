import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "./todayTrainings.scss";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { dayMonthYearWithSeparator } from "utils/dateFunctions";
type Trainings = Array<training>;
type training = {
  id: string;
  date: string;
  workoutName: string;
};
const TodayTrainings = () => {
  const { currentUser } = useContext(AuthContext);
  const [trainings, setTrainings] = useState<Trainings>();
  const date = new Date();
  const modifiedDate = dayMonthYearWithSeparator(date, "-", "yes");
  const uploadTrainings = function (snapshot: any) {
    const trainingArray: Trainings = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      trainingArray.push(childData);
    });
    setTrainings(trainingArray);
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/trainings")
        .orderByChild("date")
        .startAt(modifiedDate);
      ref.on("value", uploadTrainings);
      return () => {
        ref.off("value", uploadTrainings);
      };
    }
  }, [currentUser, modifiedDate]);
  return (
    <div className="today-trainings">
      <p className="today-trainings__title">Treningi</p>
      {trainings && trainings.length !== 0 ? (
        trainings.map((training) => {
          return (
            <Link
              key={training.id}
              to={`trainings/${training.id}`}
              className="today-trainings__link"
            >
              {training.workoutName}
            </Link>
          );
        })
      ) : (
        <div className="today-trainings__unset">
          <Link className="today-trainings__a" to="trainings">
            Brak ustawionych treningów
          </Link>
        </div>
      )}
    </div>
  );
};

export default TodayTrainings;
