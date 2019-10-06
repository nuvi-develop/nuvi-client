
import React from "react";
import Chart from "react-apexcharts";


import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const LineChart = ({ theme, title }) => {
  const data = [
    {
      name: "낭비된 비용(천원)",
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
    <Card style={{backgroundColor:theme.secondary_light}}>
      <CardHeader>
        <CardTitle tag="h5">
        {title}
        <span className="badge badge-warning float-right mr-1">7.8(천원)</span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart">
          <Chart options={options} series={data} type="line" height="200" />
        </div>
      </CardBody>
    </Card>

  );
};

export default LineChart
