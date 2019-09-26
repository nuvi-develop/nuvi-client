import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { CheckCircle } from 'react-feather';
import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import  { isSameDate, stepSize } from '../custom';

const LineChart = ({ theme,supplyAndLefts,context }) => {
  const getDates = () => {
    let dates = [];
    let j = 0
    for(let i = 0; j<12; i++){
      const date = (new Date(context.selectedDate - i*(24*60*60*1000)))
      const day = date.getDay()
      if(day !== 0 && day !== 6){
        dates.push(date);
        j++
      }
    }
    return dates;
  }
  //get day string
  const getDayLong = (date) => {
    const day = date.getDay()
    switch (day) {
      case 0:
      return "일"
      case 1:
      return "월"
      case 2:
      return "화"
      case 3:
      return "수"
      case 4:
      return "목"
      case 5:
      return "금"
      case 6:
      return "토"
      default:
      return""
    }
  }
  const dates = getDates();
  //make dates to label
  const getlabels = (dates) => {
    const labels= dates.map(date=>{
      const dateLetter = date.getDate();
      const day = getDayLong(date);
      return `${dateLetter}(${day})`
    });
    return labels.reverse();
  };

  const getSupplyLeftperDate = (supplyAndLefts,dates) => {
    const supplyLefts = dates.reduce((total,date)=>{
      const sl = supplyAndLefts.reduce((total,supplyAndLeft)=>{
        if(isSameDate(date,new Date(supplyAndLeft.date))){
          total.supply += supplyAndLeft.food_supply;
          total.left += supplyAndLeft.food_left;
        }
        return total;
      },{supply:0,left:0})
      total.supply.push(sl.supply);
      total.left.push(sl.left);
      return total
    },{supply:[],left:[]});
    supplyLefts.supply = supplyLefts.supply.reverse()
    supplyLefts.left = supplyLefts.left.reverse()
    return supplyLefts;
  }

  const supplyLefts = getSupplyLeftperDate(supplyAndLefts,dates)


  const step = stepSize(supplyLefts.supply)
  const labels = getlabels(dates)

  const data = {
    labels: labels,
    datasets: [
      {
        label: "총 제공량 (ml)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.primary,
        data: supplyLefts.supply
      },
      {
        label: "Orders",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.tertiary,
        borderDash: [4, 4],
        data: supplyLefts.left
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            stepSize: step
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }
      ]
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <Badge color="info" className="float-right">
          {`${labels[0]}~${labels[11]}`}
        </Badge>
        <CardTitle tag="h5" className="mb-0">
          <CheckCircle className="mr-2" /> 잔반 그래프
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart chart-lg">
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default LineChart;
