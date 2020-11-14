import React from "react";
import { Button, Arrow } from "components";
import "./goBackDelete.scss";
export interface Props {
  handleEdit: () => void;
  editTitle: string;
}

const GoBackDelete: React.FC<Props> = ({ handleEdit, editTitle }) => {
  return (
    <div className="go-back-delete">
      <Arrow />
      <Button onClick={handleEdit}>{editTitle}</Button>
    </div>
  );
};

export default GoBackDelete;
