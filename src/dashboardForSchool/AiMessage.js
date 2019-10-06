import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap';

import {MessageCircle} from 'react-feather';

export default function AiMessage({theme}) {
  return (
    <Card style={{backgroundColor:theme.warning}} className="mb-3">
      <CardHeader>
        <CardTitle tag="h5">
          AI 코멘트
        </CardTitle>
      </CardHeader>
      <CardBody style={{height:"250px", fontSize:"20px"}}>
        <MessageCircle /> 금일은 호불호가 갈리는 메뉴로 평소보다 섭취량 편차가 크게 나타났으며, 잔반 비율이 상대적으로 많아졌습니다.
      </CardBody>
    </Card>
  )
}
