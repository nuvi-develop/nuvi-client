import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardImg
} from 'reactstrap';

import {MessageCircle} from 'react-feather';
import before from '../assets/img/foods/before.jpg'
import after from '../assets/img/foods/after.jpg'

export default function FoodPhoto({theme, title, photo}) {
  return (
    <Card style={{backgroundColor:theme.warning}} className="mb-3">
      <CardHeader>
        <CardTitle tag="h5">
          {title}
        </CardTitle>
      </CardHeader>
      <CardImg bottom width="100%" src={photo=="before"?before:after} alt="Card image cap" />
    </Card>
  )
}
