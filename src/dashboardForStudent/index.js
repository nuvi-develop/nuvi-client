import React from "react";
import { Container, Row, Col, Card } from "reactstrap";

import Statistics from "./Statistics";
import Mixed from './Mixed';
import PieChart from "./PieChart";
import Polar from './Polar';
import ColCard from './Card';
import FoodPhoto from './FoodPhoto'
import Satisfaction from './Satisfaction'
import Ranking from './Ranking';

import theme from "../theme";

const Default = () => (
  <Container fluid className="p-0">
    <Statistics theme={theme}/>
    <Row>
      <Col lg="4" className="d-flex">
        <ColCard
          theme={theme}
          schoolName="동산초등학교, 김철수"
        />
      </Col>
      <Col lg="4" className="d-flex flex-column">
        <Polar theme={theme} />
        <FoodPhoto title="식사 전 사진" theme={theme} photo="before"/>
        <FoodPhoto title="식사 후 사진" theme={theme} photo="after"/>
      </Col>
      <Col lg="4" className="d-flex">
        <Ranking theme={theme} />
      </Col>
    </Row>
  </Container>
);

export default Default;
