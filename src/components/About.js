import React from "react";
import { Link } from "react-router-dom";


import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from "reactstrap";

import avatar from "../assets/img/avatars/avatar.jpg";

const SignIn = () => (
  <React.Fragment>
    <div className="text-left mt-4">
      <h2>About Nuvi Lab</h2>
      <p className="lead">blabla</p>
    </div>

    <Card>
      <CardBody>
        <CardTitle tag="h5" className="mb-0">
         Small title
        </CardTitle>
        <p>contents</p>
      </CardBody>
    </Card>
  </React.Fragment>
);

export default SignIn;
