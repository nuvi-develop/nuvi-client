import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal, Calendar as CalendarIcon } from "react-feather";

import DateTime from "react-datetime";

const Calendar = ({context}) => (
  <Card className="flex-fill w-100">
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        <CalendarIcon className="mr-2"/> 날짜
      </CardTitle>
    </CardHeader>
    <CardBody className="d-flex">
      <div className="align-self-center w-100">
        <DateTime
          input={false}
          defaultValue={context.selectedDate?context.selectedDate:DateTime.moment()}
          dateFormat="L"
          timeFormat={false}
          onChange={(moment)=>{
            const selectedDate = new Date(moment._d);
            context.actions.selectDate(selectedDate);
          }}
        />
      </div>
    </CardBody>
  </Card>
);

export default Calendar;
