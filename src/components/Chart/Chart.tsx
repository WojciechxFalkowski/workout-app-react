import React, { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
import "./chart.scss";

export interface Props {
  specification: any;
  children: any;
  maxWidth: number;
}
const Chart: React.FC<Props> = ({ specification, children, maxWidth }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        new ChartJS(ctx, specification);
      }
    }
  });

  return (
    <div className="chart">
      {children ? <h1 className="chart__h1">{children}</h1> : null}
      <canvas className="chart__canvas" ref={canvasRef} width={maxWidth} />
    </div>
  );
};

export default Chart;
