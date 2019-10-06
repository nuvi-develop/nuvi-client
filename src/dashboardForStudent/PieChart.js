import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

const PieChart = ({ theme }) => {
  const data = {
    labels: ["참여", "불참"],
    datasets: [
      {
        data: [90,10],
        backgroundColor: [
          theme.info,
          theme.warning,
        ],
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
    <Card className="flex-fill w-100" style={{backgroundColor:theme.secondary_light}}>
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          식수현황
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex">
        <div className="align-self-center w-100">
          <div className="py-3">
            <div className="chart chart-xs">
              <Pie data={data} options={options} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PieChart
