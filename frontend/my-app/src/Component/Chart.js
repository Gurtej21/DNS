import React from "react";
import Chart from "react-apexcharts";


const Mychart = (props) => {
    console.log(props);
  const barChartData = {
    options: {
      chart: {
        id: "bar-chart",
      },
      xaxis: {
        categories: ["A", "MX", "CNAME", "AAAA", "NS", "PTR", "SOA", "SRV", "TXT", "DNSSEC"],
      },
    },
    series: [
      {
        name: "Count",
        data: [props.count.A, props.count.MX, props.count.CNAME, props.count.AAAA, props.count.NS, 
        props.count.PTR, props.count.SOA, props.count.SRV, props.count.TXT, props.count.DNSSEC],
      },
    ],
  };

//   const radialBarChartData = {
//     options: {
//       chart: {
//         id: "radial-bar-chart",
//       },
//     },
//     series: [70],
//     labels: ["Progress"],
//   };

//   const scatterChartData = {
//     options: {
//       chart: {
//         id: "scatter-chart",
//       },
//       xaxis: {
//         categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
//       },
//     },
//     series: [
//       { name: "Scatter Series 1", data: [{ x: 40, y: 60 }, { x: 80, y: 50 }, { x: 60, y: 40 }, { x: 30, y: 20 }] },
//     ],
//   };

//   const candlestickChartData = {
//     options: {
//       chart: {
//         id: "candlestick-chart",
//       },
//       xaxis: {
//         categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       },
//     },
//     series: [
//       {
//         data: [
//           { x: new Date(2022, 0, 1), y: [30, 40, 20, 40] },
//           { x: new Date(2022, 1, 1), y: [20, 35, 10, 35] },
//           { x: new Date(2022, 2, 1), y: [35, 50, 30, 50] },
//           { x: new Date(2022, 3, 1), y: [50, 60, 40, 60] },
//           { x: new Date(2022, 4, 1), y: [40, 45, 25, 45] },
//           { x: new Date(2022, 5, 1), y: [45, 55, 35, 55] },
//           { x: new Date(2022, 6, 1), y: [55, 70, 45, 70] },
//           { x: new Date(2022, 7, 1), y: [70, 80, 60, 80] },
//           { x: new Date(2022, 8, 1), y: [60, 70, 40, 70] },
//           { x: new Date(2022, 9, 1), y: [70, 85, 55, 85] },
//           { x: new Date(2022, 10, 1), y: [85, 95, 75, 95] },
//           { x: new Date(2022, 11, 1), y: [75, 85, 60, 85] },
//         ],
//       },
//     ],
//   };

  return (
    <div className="chart">
      <div className="chart-container">
        <h2>Bar Chart Of Record Type</h2>
        <Chart options={barChartData.options} series={barChartData.series} type="bar" height={400} />
      </div>
      {/* <div className="chart-container">
        <h2>Radial Bar Chart</h2>
        <Chart options={radialBarChartData.options} series={radialBarChartData.series} type="radialBar" height={350} />
      </div>
      <div className="chart-container">
        <h2>Scatter Chart</h2>
        <Chart options={scatterChartData.options} series={scatterChartData.series} type="scatter" height={350} />
      </div>
      <div className="chart-container">
        <h2>Candlestick Chart</h2>
        <Chart options={candlestickChartData.options} series={candlestickChartData.series} type="candlestick" height={350} />
      </div> */}


 
    </div>
  );
};

export default Mychart;

