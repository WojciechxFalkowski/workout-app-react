import * as React from "react";
import "./dietNutrient.scss";
export interface Props {
  title: string;
  nutrients: Array<number>;
  index: number;
}

const DietNutrient: React.FC<Props> = ({ title, nutrients, index }) => {
  return (
    <>
      <div className="diet-nutrient">
        <p className="diet-nutrient__title">{title}</p>
        <p className="diet-nutrient__amount">{nutrients[index]}</p>
      </div>
    </>
  );
};

export default DietNutrient;
