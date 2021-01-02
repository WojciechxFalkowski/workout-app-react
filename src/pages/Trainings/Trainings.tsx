import React from "react";
import { AddTraining, TrainingsList } from "./components";
import "./trainings.scss";

const Trainings = () => {
  return (
    <main className="trainings">
      <AddTraining />
      <TrainingsList />
    </main>
  );
};

export default Trainings;
