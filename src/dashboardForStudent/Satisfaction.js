import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap';

import LineChart from './Line';

export default function Satisfaction({theme}) {
  return (
    <Card style={{backgroundColor:theme.tertiary}} className="mb-3">
      <CardHeader>
        <CardTitle tag="h5">
          만족도
          <span className="badge badge-primary float-right">양호</span>
        </CardTitle>
      </CardHeader>
      <CardBody style={{height:"250px"}}>
        <LineChart theme={theme}/>
      </CardBody>
    </Card>
  )
}
