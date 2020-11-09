import React from "react";
import { Chart } from "components";
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
  const weekNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
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
          data: trainingsPerMonth,
          backgroundColor: function (context: any) {
            const index = context.dataIndex;
            return index % 2
              ? "rgba(255, 165, 0, 0.5)"
              : "rgba(235, 118, 98, 0.8)";
          },

          borderColor: function (context: any) {
            const index = context.dataIndex;
            return index % 2
              ? "rgba(255, 165, 0, 0.5)"
              : "rgba(235, 118, 98, 1)";
          },
          borderWidth: 1,
          hoverBackgroundColor: [],
          hoverBorderColor: [],
          hoverBorderWidth: 3,
          weight: 1,
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
            },
          },
        ],
      },
    },
  };

  return <>{<Chart specification={specification}> </Chart>}</>;
};

export default TrainingsPerMonth;
