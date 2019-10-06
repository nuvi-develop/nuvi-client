
import React from "react";
import Chart from "react-apexcharts";


import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const LineChart = ({ theme }) => {
  const data = [
    {
      name: "만족도 지수",
      data: [1,3,6,5,4,3,6,7,8,7.8]
    }
  ];

  const options = {
    chart: {
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5]
    },
    markers: {
      size: 0,
      style: "hollow" // full, hollow, inverted
    },
    xaxis: {
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ]
    },
    tooltip: {
      x: {
        formatter: function(x){
          return x+"일"
        }
      }
    },
    grid: {
      borderColor: "#f1f1f1"
    },
    colors: [
      theme.primary,
      theme.success,
      theme.warning,
      theme.danger,
      theme.info
    ]
  };

  return (
        <div className="chart">
          <Chart options={options} series={data} type="line" height="200" />
        </div>
  );
};

export default LineChart
