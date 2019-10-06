import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const MixedChart = ({ theme, title }) => {
  const data = [
    {
      name: `일별 ${title}`,
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22]
    },
    {
      name: `평균 ${title}`,
      type: "line",
      data: [30, 30, 30, 30,30, 30, 30, 30, 30, 30]
    }
  ];

  const options = {
    chart: {
      stacked: false
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth"
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },
    fill: {
      type:"solid",
      opacity: [0.5, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ],
    markers: {
      size: 0
    },
    xaxis: {
      type: "category"
    },
    yaxis: {
      title: {
        text: "%"
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function(y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " %";
          }
          return y;
        }
      },
      x:{
        formatter: function(x) {
          return x+"일"
        }
      }
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
    <Card style={{backgroundColor:theme.secondary_light}}>
      <CardHeader>
        <CardTitle tag="h5">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart">
          <Chart options={options} series={data} type="line" height="350" />
        </div>
      </CardBody>
    </Card>
  );
};

export default MixedChart
