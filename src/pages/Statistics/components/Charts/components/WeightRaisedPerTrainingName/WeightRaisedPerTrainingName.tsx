import React, { useState } from "react";
import { Chart } from "components";
import { dayMonthYearWithSeparator } from "utils/dateFunctions";
import "./weightRaisedPerTrainingName.scss";
type trainingsPerTrainingNameItem = {
  date: Array<string>;
  amount: Array<number>;
};
type training = {
  date: string;
  id: string;
  workoutName: string;
  exercises?: object;
};
export type props = {
  trainings: Array<training>;
};

const WeightRaisedPerTrainingName = ({ trainings }: props) => {
  const options: Array<string> = [];
  trainings.forEach((training: training) => {
    if (!options.includes(training.workoutName)) {
      options.push(training.workoutName);
    }
  });
  const [selectChange, setSelectChange] = useState<string>(options[0]);
  const data = trainings.filter((training: training) => {
    return training.workoutName === selectChange;
  });
  const trainingsArray: trainingsPerTrainingNameItem = { date: [], amount: [] };
  data.forEach((training) => {
    let amount = 0;
    if (training.exercises) {
      for (const [, value] of Object.entries(training.exercises)) {
        if (value.series) {
          let seriesArray = [];

          for (const [, series] of Object.entries(value.series)) {
            seriesArray.push(series);
          }
          for (let i = 0; i < seriesArray.length; i += 2) {
            amount += Number(seriesArray[i]) * Number(seriesArray[i + 1]);
          }
        }
      }
    }
    const date = new Date(training.date);
    const formatedDate = `${dayMonthYearWithSeparator(date, "/")}`;
    trainingsArray.date.push(formatedDate);
    trainingsArray.amount.push(amount);
  });

  const specification = {
    type: "line",
    data: {
      labels: trainingsArray.date,
      datasets: [
        {
          data: trainingsArray.amount,
          fill: "false",
          borderColor: "rgba(102, 252, 241, 1)",
          backgroundColor: "rgba(102, 252, 241, 1)",
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
  const handleSelectChange = (e: any) => {
    setSelectChange(e.target.value);
  };
  return (
    <div className="weight-chart">
      <label className="weight-chart__label">Wybierz nazwe treningu</label>
      <select onChange={handleSelectChange} className="weight-chart__select">
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
