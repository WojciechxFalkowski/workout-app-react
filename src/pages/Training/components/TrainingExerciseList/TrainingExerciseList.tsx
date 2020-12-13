import React from "react";
import { useHistory } from "react-router-dom";
import "./trainingExerciseList.scss";
interface exerciseItem {
  workoutName: string;
  series?: Array<string>;
  key: string;
}
export interface Props {
  exercises: Array<exerciseItem>;
  id: string;
}
const TrainingExerciseList: React.FC<Props> = ({ exercises, id }) => {
  const history = useHistory();
  const handleTrainingExercise = (
    exerciseKey: string,
    exerciseName: string
  ) => {
    history.push({
      pathname: `/trainings/${id}/${exerciseKey}`,
      state: { exerciseName },
    });
  };
  return (
    <ul className="training-exercise-list__ul">
      {exercises.map((exerciseName: exerciseItem) => {
        return (
          <li
            key={exerciseName.key}
            onClick={() =>
              handleTrainingExercise(exerciseName.key, exerciseName.workoutName)
            }
            className="training-exercise-list__exercise"
          >
            <span className="training-exercise-list__workout-name">
              {exerciseName.workoutName}
            </span>
            <div className="training-exercise-list__series-div">
              {exerciseName.series?.map((strinNumber, inx) => {
                if (inx % 2 === 0 && exerciseName.series) {
                  const seriesString = `${exerciseName.series[inx]}:${
                    exerciseName.series[inx + 1]
                  }`;
                  return (
                    <span key={inx} className="training-exercise-list__series">
                      {seriesString}
                    </span>
                  );
                }
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TrainingExerciseList;
