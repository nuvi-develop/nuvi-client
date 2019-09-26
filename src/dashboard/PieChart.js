import React from "react";
import { Pie } from "react-chartjs-2";
import { PieChart as PieChartIcon } from 'react-feather';
import NoData from './NoData';

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import  {
  isSameDate,
  stepSize,
  getDataPerDate,
  getFoodList,
  getDataPerFood,
  getDataPersentage
  } from '../custom';

const PieChart = ({ theme, context, supplyAndLefts }) => {
  const date = context.selectedDate;
  const supplyAndLefts_d = getDataPerDate(supplyAndLefts,date)
  const foodList = getFoodList(supplyAndLefts_d);
  const dataPerFood = getDataPerFood(foodList,supplyAndLefts_d);
  const dataPersentage = getDataPersentage(dataPerFood.left);
  const backgroundColor = [
    theme.primary,
    theme.warning,
    theme.danger,
    theme.secondary,
    theme.tirtiary,
    theme.info,
    "#123457",
    "#678990"
  ]
  const iconInlineStyle = backgroundColor.map(color=>{
    return {
      color:color
    }
  })

  const data = {
    labels: foodList,
    datasets: [
      {
        data: dataPerFood.left,
        backgroundColor: backgroundColor,
        borderColor: "transparent"
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <Badge color="info" className="float-right">
          {`${date.getDate()}일`}
        </Badge>

        <CardTitle tag="h5" className="mb-0">
          <PieChartIcon className="mr-2"/> 잔반량 구성
        </CardTitle>

      </CardHeader>
      <CardBody className="d-flex">
      {
        supplyAndLefts_d.length >0
        ?
        <div className="align-self-center w-100">
          <div className="py-3">
            <div className="chart chart-xs">
              <Pie data={data} options={options} />
            </div>
          </div>

          <Table className="mb-0">
            <thead>
              <tr>
                <th>메뉴</th>
                <th className="text-right">잔반량(ml)</th>
                <th className="text-right">비율</th>
              </tr>
            </thead>
            <tbody>
              {
                foodList.map((food,i)=>{
                  return(
                    <tr key={i}>
                      <td>
                        <FontAwesomeIcon icon={faSquare} style={iconInlineStyle[i]} />{` ${food}`}
                      </td>
                      <td className="text-right">{dataPerFood.left[i]}</td>
                      <td className="text-right text-success">{`${dataPersentage[i]}%`}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
        :
        <NoData />
      }

      </CardBody>
    </Card>
  );
};

export default PieChart;
