import React,{Component} from "react";
import { Link } from "react-router-dom";
import DisplayErrors from './DisplayErrors';

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from "reactstrap";

import avatar from "../assets/img/avatars/avatar.jpg";

export default class SignIn extends Component{

  state ={
    emailAddress:'',
    password:'',
    errors:[]
  }
  /*
  change state everytime the input values changes
   */
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  /*
  User sigin in actions
   */
  submit = (e) =>{
    e.preventDefault();
    const {context} = this.props;
    const{
      emailAddress,
      password
    } = this.state
    const {from} = this.props.location.state || {from:'/'};
    context.actions.signIn(emailAddress,password).then(user=>{
      if(user){
        this.props.history.push(from)
      } else {
        this.setState({errors:["Sign in failed"]})
      }
    }).catch(error => {
      console.log(error)
      this.props.history.push('/error')
    })
  }

  render(){
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h2>Welcome!</h2>
          <p className="lead">Sign in to your account to continue</p>
        </div>

        <Card>
          <CardBody>
            <div className="m-sm-4">
              <DisplayErrors errors={this.state.errors}/>
              <Form onSubmit={this.submit}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    bsSize="lg"
                    type="email"
                    name="emailAddress"
                    placeholder="Enter your email"
                    onChange={this.change}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={this.change}
                  />
                  <small>
                    <Link to="/auth/reset-password">Forgot password?</Link>
                  </small>
                </FormGroup>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="rememberMe"
                    label="Remember me next time"
                    defaultChecked
                  />
                </div>
                <div className="text-center mt-3">
                    <Button type="submit" color="primary" size="lg">
                      Sign in
                    </Button>
                </div>
              </Form>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
