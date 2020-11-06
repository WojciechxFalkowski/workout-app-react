import React, { useState } from "react";
import { DietList } from "./components";
import "./diet.scss";
export interface Props {}
interface meal {
  name: string;
  carbs: number;
  fat: number;
  protein: number;
  sodium: number;
  sugar: number;
  calories: number;
}
interface diet {
  date: Date;
  meals: Array<meal>;
}

const Diet: React.FC<Props> = () => {
  const [diets, setDiets] = useState<Array<diet>>([
    {
      date: new Date("2020-11-05T21:25"),
      meals: [
        {
          name: "Sniadanie",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 100,
          calories: 100,
        },
        {
          name: "Obiad",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 100,
          calories: 100,
        },
      ],
    },
    {
      date: new Date("2020-11-06T21:25"),
      meals: [
        {
          name: "Sniadanie",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 100,
          sugar: 140,
          calories: 100,
        },
        {
          name: "Obiad",
          carbs: 100,
          fat: 100,
          protein: 100,
          sodium: 150,
          sugar: 100,
          calories: 100,
        },
      ],
    },
  ]);
  const handleAddDiet = () => {
    console.log("handleAddDiet");
    //stworzyc zapytanie do bazy danych aby utworzyl nowy rekort
    //po stworzeniu nowej diety przenosi do routa z nowo utworzoną dietą
    //usunac setDiets i diets i zrobic zwykla zmienna
    // setDiets([...diets, { date: new Date(), meals: [] }]);
  };
  return (
    <>
      <h2 onClick={handleAddDiet} className="diet__h2">
        Diet
      </h2>
      <DietList diets={diets} />
    </>
  );
};

export default Diet;
