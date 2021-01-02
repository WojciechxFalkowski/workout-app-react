import React from "react";
import { Link } from "react-router-dom";
import "./eatenCalories.scss";
type ingredients = {
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
};
export type props = {
  ingredients: ingredients;
};

const EatenCalories = ({
  ingredients: { carbs, fats, proteins, calories },
}: props) => {
  return (
    <div className="eaten-calories">
      <p className="eaten-calories__title">Dieta</p>
      <div className="eaten-calories__calories">
        {carbs && (
          <Link to="settings" className="eaten-calories__p">
            Węglowodany: {carbs}
          </Link>
        )}
        {fats && (
          <Link to="settings" className="eaten-calories__p">
            Tłuszcze: {fats}
          </Link>
        )}
        {proteins && (
          <Link to="settings" className="eaten-calories__p">
            Białko: {proteins}
          </Link>
        )}
        {calories && (
          <Link to="settings" className="eaten-calories__p">
            Kalorie: {calories}
          </Link>
        )}
        {!carbs && !fats && !proteins && !calories && (
          <Link className="eaten-calories__a" to="settings">
            Brak ustawionej diety
          </Link>
        )}
      </div>
    </div>
  );
};

export default EatenCalories;
