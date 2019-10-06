import React from "react";
import { Container, Row, Col, Card } from "reactstrap";

import Statistics from "./Statistics";
import Mixed from './Mixed';
import PieChart from "./PieChart";
import Polar from './Polar';
import SchoolCard from './Card';

import theme from "../theme";

const Default = () => (
  <Container fluid className="p-0">
    <Statistics theme={theme}/>
    <Row>
      <Col lg="4" className="d-flex">
        <SchoolCard
          theme={theme}
          schoolName="동산초등학교"
        />
      </Col>
      <Col lg="4" className="d-flex">
        <SchoolCard
          theme={theme}
          schoolName="방교중학교"
        />
      </Col>
      <Col lg="4" className="d-flex">
        <SchoolCard
          theme={theme}
          schoolName="충훈고등학교"
        />
      </Col>
    </Row>
  </Container>
);

export default Default;
