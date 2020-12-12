import React from "react";
export interface Props {
  titles: Array<string>;
}

const Tfoot: React.FC<Props> = ({ titles }) => {
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
