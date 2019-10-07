import React from "react";
import { Container, Row, Col, Card } from "reactstrap";

import Statistics from "./Statistics";
import Mixed from './Mixed';
import PieChart from "./PieChart";
import Polar from './Polar';
import ColCard from './Card';
import AiMessage from './AiMessage'
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
          schoolName="동산초등학교"
        />
      </Col>
      <Col lg="4" className="d-flex flex-column">
        <Polar theme={theme} />
        <AiMessage theme={theme}/>
        <Satisfaction theme={theme} />
      </Col>
      <Col lg="4" className="d-flex">
        <Ranking theme={theme} />
      </Col>
    </Row>
  </Container>
);

export default Default;
