import React, { useState, useEffect, useContext } from "react";
import "./trainingsList.scss";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { Table } from "./components";
import { LoadingIndicator } from "components";
type Trainings = Array<training>;
interface training {
  id: string;
  date: string;
  workoutName: string;
}
interface training {
  id: string;
  date: string;
  workoutName: string;
}
export interface Props {}
const TrainingsList: React.FC<Props> = () => {
  const [trainings, setTrainings] = useState<Trainings>([]);
  const { currentUser } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const uploadTrainings = function (snapshot: any) {
    const trainingArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      trainingArray.push(childData);
    });
    setTrainings(trainingArray);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/trainings")
        .orderByChild("date");
      ref.on("value", uploadTrainings);
      return () => {
        ref.off("value", uploadTrainings);
      };
    }
  }, [currentUser]);

  return (
    <section className="trainings__list">
      <h2 className="trainings__h2">Treningi</h2>
      {isLoaded ? <Table trainings={trainings} /> : <LoadingIndicator />}
    </section>
  );
};

export default TrainingsList;
