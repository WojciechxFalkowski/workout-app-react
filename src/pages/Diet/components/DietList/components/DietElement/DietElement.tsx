import React from "react";
import { DietNutrient } from "./components";
import "./dietElement.scss";
import { useHistory } from "react-router-dom";
import { ingredientTitles } from "utils/constants";
import { slicedDayMonthYearWithSeparator } from "utils/dateFunctions";
export type props = {
  date: string;
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
};
const DietElement = ({ date, carbs, fats, proteins, calories }: props) => {
  const history = useHistory();
  const titles = ingredientTitles;
  const nutrients = [carbs, fats, proteins, calories];
  const handleDietDay = (date: string) => {
    history.push(`diet/${date}`);
  };

  const modifiedDate = slicedDayMonthYearWithSeparator(date, "/");
  return (
    <div
      onClick={() => handleDietDay(date)}
      className="diet-element"
      key={date}
    >
      <div className="diet-element__date">{modifiedDate}</div>
      <div className="diet-element__nutrients">
        {titles.map((title: string, index: number) => (
          <DietNutrient
            key={title}
            title={title}
            nutrients={nutrients}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DietElement;
