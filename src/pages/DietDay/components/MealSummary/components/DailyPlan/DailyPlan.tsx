import React from "react";
export interface Props {
  titles: Array<string>;
  diet: Array<number>;
}

const DailyPlan: React.FC<Props> = ({ titles, diet }) => {
  return (
    <tr className="meal-summary__tr">
      <td className="meal-summary__td">Dzienny plan</td>
      {titles.map((title, index) => (
        <td key={title} className="meal-summary__td">
          {diet[index] === undefined ? "-" : diet[index]}
        </td>
      ))}
    </tr>
  );
};

export default DailyPlan;
