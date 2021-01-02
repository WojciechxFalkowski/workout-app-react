import React from "react";
import {
  TrainingsPerMonth,
  TrainingsPerTrainingName,
  WeightRaisedPerTrainingName,
} from "./components";
type training = {
  date: string;
  id: string;
  workoutName: string;
  exercises?: object;
};
export type props = {
  trainings: Array<training>;
};
const Charts = ({ trainings }: props) => {
  return (
    <>
      <TrainingsPerMonth trainings={trainings} />
      <TrainingsPerTrainingName trainings={trainings} />
      <WeightRaisedPerTrainingName trainings={trainings} />
    </>
  );
};

export default Charts;
