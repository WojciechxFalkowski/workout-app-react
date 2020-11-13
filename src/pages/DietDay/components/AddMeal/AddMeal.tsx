import React, { useState } from "react";
import { Button } from "components";
import { Block } from "./components";
export interface Props {
  meals: any;
  id: string;
}

const AddMeal: React.FC<Props> = ({ meals, id }) => {
  const [showBlock, setShowBlock] = useState(false);
  const handleAddMeal = () => {
    setShowBlock(true);
  };
  return (
    <>
      <Button onClick={handleAddMeal}>Dodaj posiłek</Button>
      {showBlock && <Block setShowBlock={setShowBlock} meals={meals} id={id} />}
    </>
  );
};

export default AddMeal;
