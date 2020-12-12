import React, { useState } from "react";
import { Chart } from "components";
import { dayMonthYearWithSeparator } from "utils/dateFunctions";
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
  const options: Array<string> = [];
  trainings.forEach((training: training) => {
    const id = options.findIndex((item) => item === training.workoutName);
    if (id === -1) {
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
    type: "bar",
    data: {
      labels: trainingsArray.date,
      datasets: [
        {
          data: trainingsArray.amount,
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
