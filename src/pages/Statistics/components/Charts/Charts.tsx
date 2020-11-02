import React from "react";
import {
  TrainingsPerMonth,
  TrainingsPerTrainingName,
  WeightRaisedPerTrainingName,
} from "./components";
interface training {
  date: string;
  id: string;
  workoutName: string;
  exercises?: object;
}
export interface Props {
  trainings: Array<training>;
}
const Charts: React.FC<Props> = ({ trainings }) => {
  return (
    <>
      <TrainingsPerMonth trainings={trainings} />
      <TrainingsPerTrainingName trainings={trainings} />
      <WeightRaisedPerTrainingName trainings={trainings} />
    </>
  );
};

export default Charts;
