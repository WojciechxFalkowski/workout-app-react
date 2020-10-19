import React, { useState } from "react";
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
let index = 0;
const Charts: React.FC<Props> = ({ trainings }) => {
  console.log(`wywołanie Home:${index++}`);
  console.log(`Charts`);
  console.log(`data: ${trainings} `);
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

  console.log(`newArray: ${trainingsPerMonth} `);

  const specification = [
    {
      type: "bar",

      data: {
        labels: weekNames,
        datasets: [
          {
            data: trainingsPerMonth,
            backgroundColor: function (context: any) {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              return value < 0
                ? "rgba(230, 25, 75, 0.5)"
                : index % 2
                ? "rgba(0, 130, 200, 0.5)"
                : "rgba(0, 200,130 , 0.5)";
            },

            borderColor: function (context: any) {
              const index = context.dataIndex;
              return index % 2 ? "blue" : "green";
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
                lineHeight: 5,
              },
            },
          ],
        },
      },
    },
  ];
  return (
    <>
      {
        <Chart specification={specification[0]} maxWidth={500}>
          {" "}
        </Chart>
      }
    </>
  );
};

export default Charts;
