import React from "react";
import { Chart } from "components";
interface trainingsPerTrainingNameItem {
  name: Array<string>;
  amount: Array<number>;
}
interface training {
  date: string;
  id: string;
  workoutName: string;
  exercises?: object;
}
export interface Props {
  trainings: Array<training>;
}

const TrainingsPerTrainingName: React.FC<Props> = ({ trainings }) => {
  const trainingsPerTrainingName: trainingsPerTrainingNameItem = {
    name: [],
    amount: [],
  };
  trainings.forEach((training: training) => {
    const index = trainingsPerTrainingName.name.findIndex(
      (item) => item === training.workoutName
    );
    if (index !== -1) {
      ++trainingsPerTrainingName.amount[index];
    } else {
      trainingsPerTrainingName.name.push(training.workoutName);
      trainingsPerTrainingName.amount.push(1);
    }
  });

  const specification = {
    type: "pie",

    data: {
      labels: trainingsPerTrainingName.name,
      datasets: [
        {
          data: trainingsPerTrainingName.amount,
          backgroundColor: [
            "rgba(102, 252, 241, 1)",
            "rgba(197, 198, 199, 1)",
            "rgba(230, 25, 75, 1)",
            "rgba(245, 130, 48, 1)",
            "rgba(255, 225, 25, 1)",
            "rgba(210, 245,60, 1)",
            "rgba(60, 180, 75, 1)",
            "rgba(70, 240, 75, 1)",
            "rgba(0, 130, 200, 1)",
            "rgba(0, 0, 128, 1)",
            "rgba(145, 30, 180, 1)",
            "rgba(240, 30, 180, 1)",
            "rgba(128, 128, 128, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderColor: [
            "rgba(102, 252, 241, 0.8)",
            "rgba(197, 198, 199, 0.8)",
            "rgba(230, 25, 75, 0.8)",
            "rgba(245, 130, 48, 0.8)",
            "rgba(255, 225, 25, 0.8)",
            "rgba(210, 245,60,0.8)",
            "rgba(60, 180, 75, 0.8)",
            "rgba(70, 240, 75,0.8)",
            "rgba(0, 130, 200,0.8)",
            "rgba(0, 0, 128, 0.8)",
            "rgba(145, 30, 180, 0.8)",
            "rgba(240, 30, 180, 0.8)",
            "rgba(128, 128, 128, 0.8)",
            "rgba(0, 0, 0, 0.8)",
          ],
          hoverBackgroundColor: [
            "rgba(102, 252, 241, 0.8)",
            "rgba(197, 198, 199, 0.8)",
            "rgba(230, 25, 75, 0.8)",
            "rgba(245, 130, 48, 0.8)",
            "rgba(255, 225, 25, 0.8)",
            "rgba(210, 245,60, 0.8)",
            "rgba(60, 180, 75, 0.8)",
            "rgba(70, 240, 75, 0.8)",
            "rgba(0, 130, 200, 0.8)",
            "rgba(0, 0, 128, 0.8)",
            "rgba(145, 30, 180, 0.8)",
            "rgba(240, 30, 180, 0.8)",
            "rgba(128, 128, 128, 0.8)",
            "rgba(0, 0, 0, 0.8)",
          ],
          hoverBorderWidth: 2,
        },
      ],
    },
  };

  return <>{<Chart specification={specification}> </Chart>}</>;
};

export default TrainingsPerTrainingName;
