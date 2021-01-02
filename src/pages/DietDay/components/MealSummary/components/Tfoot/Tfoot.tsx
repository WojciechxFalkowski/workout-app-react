import React from "react";
export type props = {
  titles: Array<string>;
};

const Tfoot = ({ titles }: props) => {
  return (
    <tfoot className="meal-summary__tfoot">
      <tr className="meal-summary__tr">
        <th className="meal-summary__th"></th>
        {titles.map((title) => (
          <th key={title} className="meal-summary__th">
            {title}
          </th>
        ))}
      </tr>
    </tfoot>
  );
};

export default Tfoot;
