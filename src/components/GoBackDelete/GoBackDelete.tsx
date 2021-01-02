import React from "react";
import { Button, Arrow } from "components";
import "./goBackDelete.scss";
export type props = {
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editTitle: string;
};

const GoBackDelete = ({ handleEdit, editTitle }: props) => {
  return (
    <section className="go-back-delete">
      <Arrow />
      <Button onClick={handleEdit}>{editTitle}</Button>
    </section>
  );
};

export default GoBackDelete;
