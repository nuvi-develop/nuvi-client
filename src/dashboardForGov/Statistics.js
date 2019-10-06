import React from "react";
import { Col, Card, CardBody, CardTitle, CardHeader, Progress, Row } from "reactstrap";
import {ChevronsRight} from 'react-feather';

const Statistics = ({theme}) => (
  <Card style={{backgroundColor:theme.info}} >
    <CardHeader>
      <CardTitle>
        2019년 10월 7일 월요일<ChevronsRight />
      </CardTitle>
    </CardHeader>
    <CardBody>
    <div className="w-100">
      <Row>
        <Col sm="4">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-warning float-right">주의</span>
              <h5 className="card-title mb-0">잔반 목표 대비 초과량</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="8">
                  <h2 className="d-flex align-items-center mb-0 font-weight-light">
                    200L
                  </h2>
                  <p> 목표량:1000L</p>
                </Col>
                <Col xs="4" className="text-right">
                  <span className="text-muted">20%</span>
                </Col>
              </Row>

              <Progress
                color="primary"
                value={20}
                className="progress-sm shadow-sm mb-1"
              />
            </CardBody>
          </Card>
        </Col>
        <Col sm="4">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-warning float-right">주의</span>
              <h5 className="card-title mb-0">잔반 재화 가치</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="8">
                  <h2 className="d-flex align-items-center mb-0 font-weight-light">
                    203 만원
                  </h2>
                  <p>누적 1098만원</p>
                </Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
        <Col sm="4">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-primary float-right">양호</span>
              <h5 className="card-title mb-0">전체 영양소 섭취 현황</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="8">
                  <h2 className="d-flex align-items-center mb-0 font-weight-light">
                    양호
                  </h2>
                </Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </CardBody>
  </Card>

);

export default Statistics;
