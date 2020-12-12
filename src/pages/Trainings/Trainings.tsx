import React from "react";
import { AddTraining, TrainingsList } from "./components";
import "./trainings.scss";
export interface Props {}
const Trainings: React.FC<Props> = () => {
  return (
    <main className="trainings">
      <AddTraining />

      <TrainingsList />
    </main>
  );
};

export default Trainings;
