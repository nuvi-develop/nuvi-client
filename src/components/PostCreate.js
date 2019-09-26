import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import DisplayErrors from './DisplayErrors';

export default class CreatePost extends Component {
  state ={
    title:'',
    description:'',
    errors:[]
  }

  /*
  change state every time imput value is updated
   */
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  /*
  create course when submitted
   */
  submit = (e) => {
    e.preventDefault();
    const {context,location} = this.props;
    const auth = context.authenticatedUser;
    const from = '/board'
    const {
      title,
      description
    } = this.state;
    const post = {
      title,
      description,
      UserId:auth.id
    }
    context.data.createPost(post,auth)
    .then(errors => {
      console.log(errors)
      if(errors.length>0){
        const errMessages = errors.map(error=>error.msg);
        this.setState({errors:errMessages})
      } else {
        context.actions.signIn(auth.emailAddress,auth.password)
        .then(()=>{
          this.props.history.push(from)
        })

      }
    }).catch(error=>{
      console.log(error)
      this.props.history.push('/error')
    })
  }

  /*
  goback to the previous location or '/'
   */
  cancel = () => {
    const {location} = this.props
    const from = '/board'
    this.props.history.push(from)
  }

  render() {
    const {
      errors
    } = this.state;
    const {context} = this.props;
    const auth = context.authenticatedUser;
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            새 글쓰기
          </CardTitle>
        </CardHeader>
        <CardBody>
          {
            errors
            ?
            <DisplayErrors errors={errors}/>
            :
            null
          }
          <Form onSubmit={this.submit}>
            <Row>
              <Col md="8">
                <FormGroup>
                  <Label for="title">제목</Label>
                  <Input name="title" onChange={this.change} type="text" id="title" placeholder="Title" />
                </FormGroup>
                <FormGroup>
                  <Label for="description">내용</Label>
                  <Input
                    name="description"
                    onChange={this.change}
                    style={{height:300}}
                    type="textarea"
                    rows="2"
                    id="description"
                    placeholder="Tell something about yourself"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button type="submit" color="primary">등록하기</Button>
            <Button onClick={this.cancel} style={{margin:10}} color="secondary">취소하기</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}
