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

export default class UpdatePost extends Component {
  state ={
    title:'',
    description:'',
    errors:[]
  }

  /*
  load course data to be updated and set state
   */
  componentDidMount(){
    const {context,match} = this.props;
    const {id} = match.params

    context.data.getOnePost(id).then(post =>{
      if(post){
        if(this.checkAuthority()){
          this.setState({
            title:post.title,
            description:post.description
          });
        } else {
          this.props.history.push('/forbidden')
        }
      }else {
        this.props.history.push('/page404')
      }
    }).catch((err)=>{
      this.props.history.push('/error')
      console.log(err.message)
    })
  }

  /*
  checing authority function
   */
  checkAuthority = () => {
    const {match,context} = this.props; //get post id trying to access
    const {id} = match.params;
    const auth =context.authenticatedUser;
    if(auth){
      const authPosts = auth.Posts; //get current auth user's Posts list
      return authPosts.find(post =>{
        const postId = String(post.id);
        return postId === id //check this current auth user has this course
      })
    }
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  submit = (e) => {
    e.preventDefault();
    const {context, match} = this.props;
    const auth = context.authenticatedUser;
    const {
      title,
      description,
    } = this.state;
    const post = {
      title,
      description,
      UserId:auth.id
    }
    const {id} = match.params
    const from = `/posts/${id}`;

    context.data.updatePost(id, post,auth)
    .then(errors => {
      if(errors.length>0){
        const errMessages = errors.map(error=>error.msg);
        this.setState({errors:errMessages})
      } else {
        context.actions.signIn(auth.emailAddress,auth.password)
        this.props.history.push(from)
      }
    }).catch((err)=>{
      this.props.history.push('/error')
      console.log(err.message)
    })
  }

  /*
  go back to previous location or course detail page
   */
  cancel = () => {
    const {id} = this.props.match.params;
    const from = `/posts/${id}`;
    this.props.history.push(from)
  }

  /*
  rendering
   */
  render() {
    const {
      title,
      description,
      errors
    } = this.state;
    const {context} = this.props;
    const auth = context.authenticatedUser;
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            수정하기
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
                  <Input
                    name="title"
                    onChange={this.change}
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={title}
                  />
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
                    value={description}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button type="submit" color="primary">수정하기</Button>
            <Button onClick={this.cancel} style={{margin:10}} color="secondary">취소하기</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}
