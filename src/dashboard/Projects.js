import React from "react";
import { List as ListIcon } from 'react-feather';
import NoData from './NoData';

import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Table
} from "reactstrap";

import { MoreHorizontal } from "react-feather";
import  {
  getDataPerDate,
  getFoodAllList
  } from '../custom';

const Projects = ({supplyAndLefts , context}) => {
  const date = context.selectedDate;
  const supplyAndLefts_d = getDataPerDate(supplyAndLefts,date)
  const foodAllList = getFoodAllList(supplyAndLefts_d);
  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <Badge color="info" className="float-right">
          {`${date.getDate()}일`}
        </Badge>
        <CardTitle tag="h5" className="mb-0">
          <ListIcon className="mr-2"/> 오늘 메뉴
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex">
        {
          supplyAndLefts_d.length > 0
          ?
          <Table striped className="my-0">
            <thead>
              <tr>
                <th>학교</th>
                <th>메뉴</th>
                <th>이력</th>
                <th className="d-none d-xl-table-cell">알레르기</th>
              </tr>
            </thead>
            <tbody>
              {
                foodAllList.map((food,i)=>{
                  return(
                    <tr key={i}>
                      <td>{food.name}</td>
                      <td>{food.name}</td>
                      <td>{food.from}</td>
                      <td className="d-none d-xl-table-cell">
                        {
                          food.allergy
                          ?
                          <Badge color="danger">유발</Badge>
                          :
                          <Badge color="success">안전</Badge>
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          :
          <NoData />
        }
      </CardBody>
    </Card>
  );
}

export default Projects;
