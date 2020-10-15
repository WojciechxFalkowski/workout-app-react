import React from "react";
import { useHistory } from "react-router-dom";
import "./trainingExerciseList.scss";
export interface Props {
  exercises: any;
  id: string;
}

const TrainingExerciseList: React.FC<Props> = ({ exercises, id }) => {
  const history = useHistory();
  const handleTrainingExercise = (exerciseKey: any, exerciseName: any) => {
    history.push({
      pathname: `/trainings/${id}/${exerciseKey}`,
      state: { exerciseName },
    });
  };
  return (
    <ul className="training-exercise-list__ul">
      {exercises
        .map((exerciseName: any) => {
          return (
            <li
              onClick={() =>
                handleTrainingExercise(exerciseName.key, exerciseName.name)
              }
              key={exerciseName.key}
              className="training-exercise-list__exercise"
            >
              {exerciseName.name}
            </li>
          );
        })
        .reverse()}
    </ul>
  );
};

export default TrainingExerciseList;
