import React from "react";
import { Bar } from "react-chartjs-2";
import { BarChart2 } from "react-feather";
import NoData from './NoData';
import  {
  isSameDate,
  stepSize,
  getDataPerDate,
  getFoodList,
  getDataPerFood
  } from '../custom';



import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

const BarChart = ({ theme ,supplyAndLefts , context}) => {
  const date = context.selectedDate;
  const supplyAndLefts_d = getDataPerDate(supplyAndLefts,date)
  const foodList = getFoodList(supplyAndLefts_d);
  const dataPerFood = getDataPerFood(foodList,supplyAndLefts_d);
  const step = stepSize(dataPerFood.supply)


  const data = {
    labels: foodList,
    datasets: [
      {
        label: "제공량(ml)",
        backgroundColor: theme.primary,
        borderColor: theme.primary,
        hoverBackgroundColor: theme.primary,
        hoverBorderColor: theme.primary,
        data: dataPerFood.supply
      },
      {
        label: "잔반량(ml)",
        backgroundColor: "#E8EAED",
        borderColor: "#E8EAED",
        hoverBackgroundColor: "#E8EAED",
        hoverBorderColor: "#E8EAED",
        data: dataPerFood.left
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
          stacked: false,
          ticks: {
            stepSize: step,
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 0.75,
          categoryPercentage: 0.5,
          stacked: false,
          gridLines: {
            color: "transparent"
          }
        }
      ]
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>

        <Badge color="info" className="float-right">
          {`${date.getDate()}일`}
        </Badge>

        <CardTitle tag="h5" className="mb-0">
          <BarChart2 className="mr-2"/> 메뉴별 잔반량
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex">
        {
          supplyAndLefts_d.length > 0
          ?
          <div className="align-self-center w-100">
            <div className="chart chart-lg">
              <Bar data={data} options={options} />
            </div>
          </div>
          :
          <NoData />
        }
      </CardBody>
    </Card>
  );
};

export default BarChart;
