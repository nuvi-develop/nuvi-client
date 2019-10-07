import React from "react";
import Chart from "react-apexcharts";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const classGenerator = () => {
  const grade = [1,2,3,4,5,6]
  const classNo = [1,2,3,4,5,6,7,8,9,10]
  let strList = []
  let pointList = []
  let i = 0;
  grade.map(g=>{
    classNo.map(c=>{
      strList.push(`${g}학년 ${c}반`)
      pointList.push(i)
      i+=1
    })
  })
  return {
    strList:strList.reverse(),
    pointList:pointList.reverse()
  }

}

const BarChart = ({ theme }) => {
  const data = [
    {
      name: "참여도 점수",
      data: classGenerator().pointList
    },
    {
      name: "잔반량 점수",
      data: classGenerator().pointList
    }
  ];

  const options = {
    chart: {
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    xaxis: {
      categories: classGenerator().strList,
      labels: {
        formatter: function(val) {
          return val + "K";
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + "K";
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40
    },
    colors: [
      theme.success,
      theme.warning,
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">종합 1위: 6학년 10반</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart">
          <Chart options={options} series={data} type="bar" height="1300" />
        </div>
      </CardBody>
    </Card>
  );
};

export default BarChart
