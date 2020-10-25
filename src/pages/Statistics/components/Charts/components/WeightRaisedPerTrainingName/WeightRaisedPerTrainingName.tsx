import React, { useState } from "react";
import { Chart } from "components";

import "./weightRaisedPerTrainingName.scss";
interface trainingsPerTrainingNameItem {
  date: Array<string>;
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

const WeightRaisedPerTrainingName: React.FC<Props> = ({ trainings }) => {
  // console.log("trainings", trainings);
  const options: Array<string> = [];
  trainings.forEach((training: training, index: number) => {
    const id = options.findIndex((item) => item === training.workoutName);
    if (id === -1) {
      options.push(training.workoutName);
    }
  });

  const [selectChange, setSelectChange] = useState<string>(options[0]);
  const [cos, setCos] = useState<trainingsPerTrainingNameItem>();

  const data = trainings.filter((training: training) => {
    return training.workoutName === selectChange;
  });
  const trainingsArray: trainingsPerTrainingNameItem = { date: [], amount: [] };
  data.forEach((training) => {
    let amount = 0;
    if (training.exercises) {
      for (const [key, value] of Object.entries(training.exercises)) {
        if (value.series) {
          let seriesArray = [];

          for (const [key, series] of Object.entries(value.series)) {
            seriesArray.push(series);
          }
          for (let i = 0; i < seriesArray.length; i += 2) {
            amount += Number(seriesArray[i]) * Number(seriesArray[i + 1]);
          }
        }
      }
    }
    const date = new Date(training.date);
    const formatedDate = `${
      date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()
    }/${
      date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1
    }/${date.getFullYear()}`;
    trainingsArray.date.push(formatedDate);
    trainingsArray.amount.push(amount);
  });

  const specificationn = {
    type: "bar",

    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "rgba(230, 25, 75, 0.2)",
            "rgba(245, 130, 48, 0.2)",
            "rgba(255, 225, 25, 0.2)",
            "rgba(210, 245,60, 0.2)",
            "rgba(60, 180, 75, 0.2)",
            "rgba(70, 240, 75, 0.2)",
            "rgba(0, 130, 200, 0.2)",
            "rgba(0, 0, 128, 0.2)",
            "rgba(145, 30, 180, 0.2)",
            "rgba(240, 30, 180, 0.2)",
            "rgba(128, 128, 128, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ],
          borderColor: [
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
          borderWidth: 1,
          hoverBackgroundColor: [
            "rgba(230, 25, 75, 0.5)",
            "rgba(245, 130, 48, 0.5)",
            "rgba(255, 225, 25, 0.5)",
            "rgba(210, 245,60, 0.5)",
            "rgba(60, 180, 75, 0.5)",
            "rgba(70, 240, 75, 0.5)",
            "rgba(0, 130, 200, 0.5)",
            "rgba(0, 0, 128, 0.5)",
            "rgba(145, 30, 180, 0.5)",
            "rgba(240, 30, 180, 0.5)",
            "rgba(128, 128, 128, 0.5)",
            "rgba(0, 0, 0, 0.5)",
          ],
          hoverBorderColor: [
            "rgba(230, 25, 75, 1)",
            "rgba(245, 130, 48, 1)",
            "rgba(255, 225, 25, 1)",
            "rgba(210, 245,60,1)",
            "rgba(60, 180, 75, 1)",
            "rgba(70, 240, 75,1)",
            "rgba(0, 130, 200,1)",
            "rgba(0, 0, 128, 1)",
            "rgba(145, 30, 180, 1)",
            "rgba(240, 30, 180, 1)",
            "rgba(128, 128, 128, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          hoverBorderWidth: 3,
          weight: 1,
        },
      ],
    },
  };

  const specification = {
    type: "bar",
    data: {
      labels: trainingsArray.date,
      datasets: [
        {
          data: trainingsArray.amount,
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
        text: "Liczba podniesionych kg",
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
            },
          },
        ],
      },
    },
  };
  // console.log("trainingsArray", trainingsArray);
  const handleSelectChange = (e: any) => {
    setSelectChange(e.target.value);
  };
  return (
    <div className="weightRaisedPerTrainingName">
      <label className="weightRaisedPerTrainingName__label">
        Wybierz partię mięśni
      </label>
      <select onChange={handleSelectChange}>
        {options.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      {<Chart specification={specification}> </Chart>}
    </div>
  );
};

export default WeightRaisedPerTrainingName;
