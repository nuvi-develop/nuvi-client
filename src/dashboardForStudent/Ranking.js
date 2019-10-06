import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap';

import BarChart from './Bar';

export default function Ranking({theme}) {
  return (
    <Card style={{backgroundColor:theme.tertiary}} className="mb-3">
      <CardHeader>
        <CardTitle tag="h5">
          반별 점수 랭킹
        </CardTitle>
      </CardHeader>
      <CardBody style={{height:"250px"}}>
        <BarChart theme={theme} />
      </CardBody>
    </Card>
  )
}
