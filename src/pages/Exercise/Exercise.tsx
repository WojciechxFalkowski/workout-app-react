import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Arrow } from "./../Training/components";
import { FormTemplate } from "components";
import { AiOutlineCheck } from "react-icons/ai";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "fire";
import { required, composeValidators } from "utils/validation";
import "./exercise.scss";
interface Id {
  id: string;
}
interface Params {
  params: Id;
}
export interface Props {
  match: Params;
}

const Exercise: React.FC<Props> = (props) => {
  let history = useHistory();
  let list = undefined;
  const { currentUser } = useContext(AuthContext);
  const { exerciseName }: any = history.location.state;
  console.log(props.match.params.id, exerciseName);
  const [series, setSeries] = useState(["70:10"]);
  const checkSeries = (series: Array<string>) => {
    return series.map((item, index) => {
      const firstHalf = Number(item.substring(0, item.indexOf(":")));
      const secondHalf = Number(
        item.substring(item.indexOf(":") + 1, item.length)
      );
      console.log(typeof firstHalf);
      console.log(firstHalf);
      return (
        <li className="exercise__li" key={index}>
          <h3 className="exercise__h3">Seria nr</h3>
          <div className="exercise__div">
            <label className="exercise__label">ciężar</label>
            <input className="exercise__input" type="text" />
            <p className="exercise__p">
              kg
              <span onClick={() => handleMinus} className="exercise__minus">
                -
              </span>
              <span onClick={() => handlePlus} className="exercise__plus">
                +
              </span>
            </p>
          </div>
          <div className="exercise__div">
            <label className="exercise__label">powtórzenia</label>
            <input className="exercise__input" type="text" />
            <p className="exercise__p">
              x
              <span onClick={() => handleMinus} className="exercise__minus">
                -
              </span>
              <span onClick={() => handlePlus} className="exercise__plus">
                +
              </span>
            </p>
          </div>
        </li>
      );
    });
    console.log("siemka");
  };

  const handleDeleteExercise = () => {
    if (currentUser) {
      // fire
      //   .database()
      //   .ref("users/" + currentUser.uid + "/trainings/")
      //   .remove();
      history.goBack();
    }
  };
  const handleSubmit = () => {};
  const handleMinus = () => {
    console.log("handleMinus");
  };
  const handlePlus = () => {
    console.log("handlePlus");
  };
  const handleAddSeries = () => {
    console.log("handleAddSeries");
  };
  const handleSaveExercise = () => {
    console.log("handleSaveExercise");
  };
  return (
    <div className="exercise">
      <Arrow />
      <button onClick={handleDeleteExercise} className="exercise__button">
        Usuń ćwiczenie
      </button>
      <h2 className="exercise__h2">{exerciseName}</h2>
      <ul className="exercise__ul">{checkSeries(series)}</ul>
      <div onClick={handleAddSeries} className="exercise__line">
        <div className="exercise__check">+</div>
      </div>
      {/* <div className="exercise__add-series"></div> */}
      <div className="exercise__add">
        <AiOutlineCheck
          onClick={handleSaveExercise}
          className="exercise__icon"
        />
      </div>
    </div>
  );
};

export default Exercise;
