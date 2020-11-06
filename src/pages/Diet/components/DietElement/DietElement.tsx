import React from "react";
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
  return (
    <>
      <div className="diet-element" key={modifiedDate}>
        <div className="diet-element__date">{modifiedDate}</div>
        <div className="diet-element__nutrients">
          <div className="diet-element__nutrient">
            <p className="diet-element__title">Węglowodany</p>
            <p className="diet-element__amount">{carbs}</p>
          </div>
          <div className="diet-element__nutrient">
            <p className="diet-element__title">Tłuszcze</p>
            <p className="diet-element__amount">{fat}</p>
          </div>
          <div className="diet-element__nutrient">
            <p className="diet-element__title">Białko</p>
            <p className="diet-element__amount">{protein}</p>
          </div>
          <div className="diet-element__nutrient">
            <p className="diet-element__title">Sole mineralne</p>
            <p className="diet-element__amount">{sodium}</p>
          </div>
          <div className="diet-element__nutrient">
            <p className="diet-element__title">Cukry</p>
            <p className="diet-element__amount">{sugar}</p>
          </div>
          <div className="diet-element__nutrient">
            <p className="diet-element__title">Kalorie</p>
            <p className="diet-element__amount">{calories}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DietElement;
