import React from "react";
import { Link } from "react-router-dom";
import "./eatenCalories.scss";
export interface Props {
  calories: number;
}

const EatenCalories: React.FC<Props> = ({ calories }) => {
  return (
    <div className="eaten-calories">
      <span className="eaten-calories__title">Dieta</span>
      <div className="eaten-calories__calories">
        <Link className="eaten-calories__a" to="settings">
          {typeof calories === "number"
            ? `${calories} kcal`
            : "Brak ustawionej diety"}
        </Link>
      </div>
    </div>
  );
};

export default EatenCalories;
