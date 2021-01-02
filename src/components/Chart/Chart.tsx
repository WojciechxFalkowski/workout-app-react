import React, { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
import "./chart.scss";

export type props = {
  specification: any;
  children: any;
};
const Chart = ({ specification, children }: props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const chart = new ChartJS(ctx, specification);
        return () => {
          chart.destroy();
        };
      }
    }
  });

  return (
    <div className="chart">
      {children ? <h1 className="chart__h1">{children}</h1> : null}
      <canvas className="chart__canvas" ref={canvasRef} />
    </div>
  );
};

export default Chart;
