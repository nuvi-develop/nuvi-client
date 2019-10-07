import React from "react";
import { Col, Card, CardBody, CardTitle, CardHeader, CardImg, Progress, Row } from "reactstrap";
import {ChevronsRight} from 'react-feather';

import highschool_img from '../assets/img/schools/highschool_1.jpg'

const Statistics = ({theme}) => (
  <Card style={{backgroundColor:theme.info}} >
  <CardImg style={{height: "100px", backgroundSize:"cover"}} top width="100%" src={highschool_img} alt="Card image cap" />
    <CardHeader>
      <CardTitle>
        2019년 10월 7일 월요일, 동산초등학교, 김철수<ChevronsRight />
      </CardTitle>
    </CardHeader>
    <CardBody>
    <div className="w-100">
      <Row>
        <Col sm="3">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-warning float-right">주의</span>
              <h5 className="card-title mb-0">잔반 습관 점수</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="8">
                  <h2 className="d-flex align-items-center mb-0 font-weight-light">
                    71점
                  </h2>
                </Col>
                <Col xs="4" className="text-right">
                  <span className="text-muted">상위 65%</span>
                </Col>
              </Row>

              <Progress
                color="primary"
                value={100-65}
                className="progress-sm shadow-sm mb-1"
              />
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
        <Card className="flex-fill">
          <CardHeader>
            <span className="badge badge-primary float-right">양호</span>
            <h5 className="card-title mb-0">식판 클리어수</h5>
          </CardHeader>
          <CardBody className="my-2">
            <Row className="d-flex align-items-center mb-4">
              <Col xs="8">
                <h2 className="d-flex align-items-center mb-0 font-weight-light">
                  21회
                </h2>
              </Col>
              <Col xs="4" className="text-right">
                <span className="text-muted">상위 12%</span>
              </Col>
            </Row>

            <Progress
              color="primary"
              value={100-12}
              className="progress-sm shadow-sm mb-1"
            />
          </CardBody>
        </Card>
        </Col>
        <Col sm="3">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-primary float-right">양호</span>
              <h5 className="card-title mb-0">개인 영양소 섭취 현황</h5>
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
