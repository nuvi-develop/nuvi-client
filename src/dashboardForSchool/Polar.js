import React from "react";
import { Polar } from "react-chartjs-2";
import { connect } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const PolarChart = ({ theme }) => {
  const data = {
    labels: ["쌀밥", "된장국", "멸치볶음", "불고기", "김치"],
    datasets: [
      {
        label: "Model S",
        data: [35, 38, 65, 70, 24],
        backgroundColor: [
          theme.primary,
          theme.success,
          theme.danger,
          theme.warning,
          "#5b7dff"
        ]
      }
    ]
  };

  const options = { maintainAspectRatio: false };

  return (
    <Card style={{backgroundColor:theme.secondary_light}} className="mb-3">
      <CardHeader>
        <CardTitle tag="h5">균형섭취 현황</CardTitle>
      </CardHeader>
      <CardBody style={{height:"500"}}>
        <div className="chart" >
          <Polar data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default PolarChart
