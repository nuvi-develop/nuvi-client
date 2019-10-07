import React from "react";
import { Col, Card, CardBody, CardTitle, CardHeader, CardImg, Progress, Row } from "reactstrap";
import {ChevronsRight} from 'react-feather';

import highschool_img from '../assets/img/schools/highschool_1.jpg'

const Statistics = ({theme}) => (
  <Card style={{backgroundColor:theme.info}} >
  <CardImg style={{height: "100px", backgroundSize:"cover"}} top width="100%" src={highschool_img} alt="Card image cap" />
    <CardHeader>
      <CardTitle>
        2019년 10월 7일 월요일, 동산초등학교<ChevronsRight />
      </CardTitle>
    </CardHeader>
    <CardBody>
    <div className="w-100">
      <Row>
        <Col sm="3">
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
        <Col sm="3">
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
        <Col sm="3">
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

        <Col sm="3">
          <Card className="flex-fill">
            <CardHeader>
              <h5 className="card-title mb-0">10월 첫째주 종합1위</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="8">
                  <h2 className="d-flex align-items-center mb-0 font-weight-light">
                    6학년 10반
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
