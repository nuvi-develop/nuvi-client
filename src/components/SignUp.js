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
  Input
} from "reactstrap";

export default class SignUp extends Component {
  state ={
    name:'',
    emailAddress:'',
    password:'',
    confirmPassword:'',
    code:'',
    errors:[]
  }

  change = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState(()=>{
      return {[name]:value}
    });
  }

  submit = (e) =>{
    e.preventDefault();
    const {
      name,
      emailAddress,
      password,
      confirmPassword,
      code
    } = this.state
    const {context} = this.props
    const user = {
      name,
      emailAddress,
      password,
      confirmPassword,
      code
    }

    context.data.createUser(user)
      .then(errors => {
        if(errors.length>0){
          const errMessages = errors.map(error=>error.message);
          this.setState({errors:errMessages})
        } else {
          context.actions.signIn(emailAddress,password).then((user)=>{
              this.props.history.push('/')
          })

        }
      }).catch(error=>{
        console.log(error);
        this.props.history.push('/error');
      })

  }

  render(){
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h1 className="h2">Get started</h1>
          <p className="lead">
            Start creating the best possible user experience for you customers.
          </p>
        </div>

        <Card>
          <CardBody>
            <div className="m-sm-4">
              <DisplayErrors errors={this.state.errors} />
              <Form onSubmit={this.submit}>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    bsSize="lg"
                    type="text"
                    placeholder="Enter your name"
                    onChange={this.change}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    name="emailAddress"
                    bsSize="lg"
                    type="email"
                    placeholder="Enter your email"
                    onChange={this.change}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    bsSize="lg"
                    type="password"
                    placeholder="Enter password"
                    onChange={this.change}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    name="confirmPassword"
                    bsSize="lg"
                    type="password"
                    placeholder="Enter password"
                    onChange={this.change}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Code</Label>
                  <Input
                    name="code"
                    bsSize="lg"
                    type="text"
                    placeholder="Enter your Code"
                    onChange={this.change}
                  />
                </FormGroup>
                <div className="text-center mt-3">
                    <Button type="submit" color="primary" size="lg">
                      Sign up
                    </Button>
                </div>
              </Form>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
