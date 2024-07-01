import { months } from "@/helper/Util";

export const lineChartData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: "Transactions",
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export const doughnutChartData = {
  labels: ["Code lines", "Commentars", "Blank Lines"],
  datasets: [
    {
      label: "Lines in your code",
      data: [300, 50, 100],
      backgroundColor: ["#172a21", "#5d8883", "#9fccc6"],
      hoverOffset: 4,
    },
  ],
};