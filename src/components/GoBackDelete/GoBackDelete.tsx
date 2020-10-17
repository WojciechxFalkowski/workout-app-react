import React from "react";
import { Button, Arrow } from "components";
import "./goBackDelete.scss";
export interface Props {
  handleEdit: () => void;
}

const GoBackDelete: React.FC<Props> = ({ handleEdit }) => {
  return (
    <div className="go-back-delete">
      <Arrow />
      <Button onClick={handleEdit}>Usuń trening</Button>
    </div>
  );
};

export default GoBackDelete;
