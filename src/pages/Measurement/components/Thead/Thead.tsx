import React from "react";
export interface Props {}

const Thead: React.FC<Props> = () => {
  return (
    <thead className="measurement__thead">
      <tr className="measurement__tr">
        <th className="measurement__th">Data</th>
        <th className="measurement__th">Waga</th>
        <th className="measurement__th">Ramię</th>
        <th className="measurement__th">Klatka</th>
        <th className="measurement__th">Talia</th>
        <th className="measurement__th">Uda</th>
        <th className="measurement__th"></th>
      </tr>
    </thead>
  );
};

export default Thead;
