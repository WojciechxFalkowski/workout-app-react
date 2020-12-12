import React from "react";
export interface Props {
  sumNutrientsByType: Array<number>;
  diet: Array<number>;
  titles: Array<string>;
}

const MissingCalories: React.FC<Props> = ({
  sumNutrientsByType,
  diet,
  titles,
}) => {
  return (
    <>
      <tr className="meal-summary__tr">
        <td className="meal-summary__td">Brakujące</td>
        {sumNutrientsByType.map((type, index) => {
          const distinction =
            diet[index] === undefined ? "-" : type - diet[index];
          if (distinction >= 0) {
            return (
              <td
                key={titles[index]}
                className="meal-summary__td meal-summary__above-zero"
              >
                {distinction}
              </td>
            );
          } else if (distinction === "-") {
            return (
              <td key={titles[index]} className="meal-summary__td">
                {distinction}
              </td>
            );
          } else {
            return (
              <td
                key={titles[index]}
                className="meal-summary__td meal-summary__below-zero"
              >
                {distinction}
              </td>
            );
          }
        })}
      </tr>
    </>
  );
};

export default MissingCalories;
