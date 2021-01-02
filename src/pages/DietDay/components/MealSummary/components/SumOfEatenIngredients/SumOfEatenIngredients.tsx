import React from "react";
export type props = {
  sumNutrientsByType: Array<number>;
  titles: Array<string>;
};

const TrLine = ({ sumNutrientsByType, titles }: props) => {
  return (
    <tr className="meal-summary__tr">
      <td className="meal-summary__td">Razem</td>
      {sumNutrientsByType.map((type, index) => {
        return (
          <td key={titles[index]} className="meal-summary__td">
            {type}
          </td>
        );
      })}
    </tr>
  );
};

export default TrLine;
