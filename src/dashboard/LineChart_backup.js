import React from "react";
import { Line } from "react-chartjs-2";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { CheckCircle } from 'react-feather';

import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";


const LineChart = ({ theme, supplyAndLefts, context }) => {
  //get dates we are interested In(selected day ~ 12days before)
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
  //make dates to label
  const getlabels = () => {
    const dates = getDates();
    const labels= dates.map(date=>{
      const dateLetter = date.getDate();
      const day = getDayLong(date);
      return `${dateLetter}(${day})`
    });
    return labels.reverse();
  };

  //check is same date, ignore daytime
  const isSameDate = (date1,date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  let step = 100;

  const getTotalSupplies = async () => {
    const {schoolName,grade,classNumber} = context;
    const dates = getDates();

    const totalSupplies = dates.map(date=>{
      const dateMatching = supplyAndLefts.filter(supplyAndleft =>{
        const supplyAndLeftDate = new Date(supplyAndleft.date)

        return isSameDate(supplyAndLeftDate,date)
      })
      const supply = dateMatching.reduce((total,supplyAndleft)=>{
          total += supplyAndleft[`food_supply`];
        return total
      },0)
      return supply
    })
    step = stepSize(totalSupplies);
    return totalSupplies.reverse()
  }

  const getTotalLefts = async () => {
    const {schoolName,grade,classNumber} = context;
    const dates = getDates();

    const totalLefts = dates.map(date=>{
      const dateMatching = supplyAndLefts.filter(supplyAndleft =>{
        const supplyAndLeftDate = new Date(supplyAndleft.date)
        return isSameDate(supplyAndLeftDate.date,date)
      })
      const left = dateMatching.reduce((total,supplyAndleft)=>{
        for(let i =1; i<7; i++){
          total += supplyAndleft[`food_left`];
        }
        return total
      },0)
      return left
    })
    return totalLefts.reverse()
  }

  //get appropriate stepSize
  const stepSize = (totalSupplies) => {
    const topValue = totalSupplies.reduce((top,supply)=>{
      return (top>supply ? top : supply)
    })
    return Math.ceil(topValue/10/100)*100
  }

  const labels = getlabels()
  const totalSupplies = getTotalSupplies();
  const totalLefts = getTotalLefts();




  const data = {
    labels: labels,
    datasets: [
      {
        label: "총 제공량 (ml)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.primary,
        data: totalSupplies
      },
      {
        label: "총 잔반량 (ml)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.secondary,
        borderDash: [1, 4],
        data: totalLefts
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
            stepSize: 100
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
