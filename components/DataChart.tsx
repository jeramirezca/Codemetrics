"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { months } from "../helper/Util";
import { ChartConfiguration } from "chart.js";

const DataChart = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  const labels = months({ count: 7 });
  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data, options, props]);
  return <canvas ref={chartRef} />;
};
Chart.register(...registerables);

export default DataChart;