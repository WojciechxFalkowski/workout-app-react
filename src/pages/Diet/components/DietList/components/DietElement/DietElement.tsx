import React from "react";
import { DietNutrient } from "./components";
import "./dietElement.scss";
import { useHistory } from "react-router-dom";
export interface Props {
  date: string;
  carbs: number;
  fats: number;
  proteins: number;
  mineralsalt: number;
  calories: number;
}

const DietElement: React.FC<Props> = ({
  date,
  carbs,
  fats,
  proteins,
  mineralsalt,
  calories,
}) => {
  const history = useHistory();
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Sole mineralne",
    "Kalorie",
  ];
  const nutrients: Array<number> = [
    carbs,
    fats,
    proteins,
    mineralsalt,
    calories,
  ];
  const handleDietDay = (date: string) => {
    history.push(`diet/${date}`);
  };
  const modifiedDate = `${date.slice(6, 8)}/${date.slice(4, 6)}/${date.slice(
    0,
    4
  )}`;
  return (
    <>
      <div
        onClick={() => handleDietDay(date)}
        className="diet-element"
        key={date}
      >
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
