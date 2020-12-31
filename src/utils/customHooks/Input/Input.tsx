import React, { useState } from "react";
export interface Props {}

const Input = ({ type }: any) => {
  const [value, setValue] = useState("");
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      min={0}
    />
  );
  return [value, input];
};

export default Input;
