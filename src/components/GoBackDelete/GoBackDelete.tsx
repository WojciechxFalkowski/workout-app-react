import React from "react";
import { Button, Arrow } from "components";
import "./goBackDelete.scss";
export interface Props {
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editTitle: string;
}

const GoBackDelete: React.FC<Props> = ({ handleEdit, editTitle }) => {
  return (
    <section className="go-back-delete">
      <Arrow />
      <Button onClick={handleEdit}>{editTitle}</Button>
    </section>
  );
};

export default GoBackDelete;
