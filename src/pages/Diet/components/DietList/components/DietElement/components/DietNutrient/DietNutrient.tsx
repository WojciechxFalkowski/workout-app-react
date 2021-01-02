import * as React from "react";
import "./dietNutrient.scss";
export type props = {
  title: string;
  nutrients: Array<number>;
  index: number;
};

const DietNutrient = ({ title, nutrients, index }: props) => {
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
