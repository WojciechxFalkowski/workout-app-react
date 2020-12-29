import React from "react";
import { Chart } from "components";
import { monthsNames } from "utils/constants";
interface training {
  date: string;
  id: string;
  workoutName: string;
  exercises?: object;
}
export interface Props {
  trainings: Array<training>;
}

const TrainingsPerMonth: React.FC<Props> = ({ trainings }) => {
  const weekNames = monthsNames;
  const trainingsPerMonth: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  trainings.forEach((training: training) => {
    trainingsPerMonth[new Date(training.date).getMonth()] += 1;
  });
  const specification = {
    type: "bar",
    data: {
      labels: weekNames,
      datasets: [
        {
          minBarLength: 1,
          data: trainingsPerMonth,
          backgroundColor: function (context: any) {
            const index = context.dataIndex;
            return index % 2
              ? "rgba(102, 252, 241, 1)"
              : "rgba(197, 198, 199, 1)";
          },
        },
      ],
    },

    options: {
      title: {
        display: true,
        text: "Liczba treningów w roku",
      },
      legend: {
        display: false,
        labels: {},
        position: "right",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              lineHeight: 2,
              beginAtZero: true,
              callback: function (value: any) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
            },
          },
        ],
      },
    },
  };

  return <>{<Chart specification={specification}> </Chart>}</>;
};

export default TrainingsPerMonth;
