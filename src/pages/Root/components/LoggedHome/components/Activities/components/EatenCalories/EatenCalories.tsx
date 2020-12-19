import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./eatenCalories.scss";
interface ingredients {
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
}
export interface Props {
  ingredients: ingredients;
}

const EatenCalories: React.FC<Props> = ({
  ingredients: { carbs, fats, proteins, calories },
}) => {
  const history = useHistory();

  return (
    <div className="eaten-calories">
      <span className="eaten-calories__title">Dieta</span>
      <div className="eaten-calories__calories">
        {carbs && (
          <p
            onClick={() => history.push(`settings`)}
            className="eaten-calories__p"
          >
            Węglowodany: {carbs}
          </p>
        )}
        {fats && (
          <p
            onClick={() => history.push(`settings`)}
            className="eaten-calories__p"
          >
            Tłuszcze: {fats}
          </p>
        )}
        {proteins && (
          <p
            onClick={() => history.push(`settings`)}
            className="eaten-calories__p"
          >
            Białko: {proteins}
          </p>
        )}
        {calories && (
          <p
            onClick={() => history.push(`settings`)}
            className="eaten-calories__p"
          >
            Kalorie: {calories}
          </p>
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
