import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import {FileText} from 'react-feather';

import Mixed from './Mixed';
import PieChart from "./PieChart";
import Polar from './Polar';

import unsplash1 from "../assets/img/photos/unsplash-1.jpg";
import school1 from '../assets/img/schools/school_1.svg';


const SchoolCard = ({theme,schoolName}) => (
  <Card >
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        <FileText />  {schoolName}
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Mixed theme={theme}/>
      <PieChart theme={theme}/>
      <Polar theme={theme}/>
    </CardBody>
  </Card>
);

export default SchoolCard;
