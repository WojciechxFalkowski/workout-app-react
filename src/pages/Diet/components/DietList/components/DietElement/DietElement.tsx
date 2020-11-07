import React from "react";
import { DietNutrient } from "./components";
import "./dietElement.scss";
export interface Props {
  modifiedDate: string;
  carbs: number;
  fat: number;
  protein: number;
  sodium: number;
  sugar: number;
  calories: number;
}

const DietElement: React.FC<Props> = ({
  modifiedDate,
  carbs,
  fat,
  protein,
  sodium,
  sugar,
  calories,
}) => {
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Sole mineralne",
    "Cukry",
    "Kalorie",
  ];
  const nutrients: Array<number> = [
    carbs,
    fat,
    protein,
    sodium,
    sugar,
    calories,
  ];
  return (
    <>
      <div className="diet-element" key={modifiedDate}>
        <div className="diet-element__date">{modifiedDate}</div>
        <div className="diet-element__nutrients">
          {titles.map((title: string, index: number) => {
            return (
              <DietNutrient
                key={title}
                title={title}
                nutrients={nutrients}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DietElement;
