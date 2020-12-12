import React from "react";
export interface Props {
  sumNutrientsByType: Array<number>;
  titles: Array<string>;
}

const TrLine: React.FC<Props> = ({ sumNutrientsByType, titles }) => {
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
