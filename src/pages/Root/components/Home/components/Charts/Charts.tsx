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

const Charts: React.FC<Props> = ({ trainings }) => {
  console.log(`Charts`);
  console.log(`data: ${trainings} `);
  // const specification = [
  //   {
  //     type: "bar",

  //     data: {
  //       labels: getDaysTrans.daysName,
  //       datasets: [
  //         {
  //           data: getDaysTrans.daysMoney,
  //           backgroundColor: function (context) {
  //             const index = context.dataIndex;
  //             const value = context.dataset.data[index];
  //             return value < 0
  //               ? "rgba(230, 25, 75, 0.5)"
  //               : index % 2
  //               ? "rgba(0, 130, 200, 0.5)"
  //               : "rgba(0, 200,130 , 0.5)";
  //           },

  //           borderColor: function (context) {
  //             const index = context.dataIndex;
  //             const value = context.dataset.data[index];
  //             return value < 0 ? "red" : index % 2 ? "blue" : "green";
  //           },
  //           borderWidth: 1,
  //           hoverBackgroundColor: [],
  //           hoverBorderColor: [],
  //           hoverBorderWidth: 3,
  //           weight: 1,
  //         },
  //       ],
  //     },

  //     options: {
  //       title: {
  //         display: true,
  //         text: 'halko',
  //       },
  //       legend: {
  //         display: false,
  //         labels: {},
  //         position: "right",
  //       },
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               lineHeight: 1.6,
  //               callback: function (value, index, values) {
  //                 return value + " $";
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   }];
  return <>{/* <Chart specification={specification[0]}/> */}</>;
};

export default Charts;
