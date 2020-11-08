import React, { useState } from "react";
import { Button } from "components";
import { AddElementBlock } from "./components";
interface meal {
  name: string;
  carbs: number;
  fat: number;
  protein: number;
  sodium: number;
  sugar: number;
  calories: number;
}

export interface Props {
  meals: Array<meal>;
  id: string;
}
const MealList: React.FC<Props> = ({ meals, id }) => {
  const [showBlock, setShowBlock] = useState(false);
  const titles: Array<string> = [
    "Węglowodany",
    "Tłuszcze",
    "Białko",
    "Sole mineralne",
    "Kalorie",
  ];
  const handleAddMealEelement = () => {
    setShowBlock(true);
    console.log("dziala");
  };
  return (
    <>
      {meals &&
        meals.map((meal, index) => {
          return (
            <>
              <table key={meal.name}>
                <thead>
                  <tr>
                    <th>{meal.name}</th>
                    {titles.map((title) => (
                      <th>{title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Button onClick={handleAddMealEelement}>Dodaj</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {showBlock && (
                <AddElementBlock
                  index={index}
                  id={id}
                  setShowBlock={setShowBlock}
                />
              )}
            </>
          );
        })}
    </>
  );
};

export default MealList;
