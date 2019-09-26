import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  CardText,
  Button,
  UncontrolledAlert,
  FormGroup,
  Form,
  Label,
  Input
} from "reactstrap";

import { MoreHorizontal,ArrowLeft } from "react-feather";
import ReplyDetail from './ReplyDetail';

export default class PostDetail extends Component {

  state ={
    post:null,
    tryDelete:false,
    replyDescription:'',
    replies:[]
  }
/**
 * get Course detail data and set state
 */
  componentDidMount(){
    const {context, match} = this.props;
    const id = match.params.id
    context.data.getOnePost(id).then(post => {
      if(post){
        if(post.description){
          post.description = post.description.split(/\n/);
        }
        this.setState({post});
      } else {
        this.props.history.push('/Page404')
      }
    }).then(()=>{
      context.data.getRepliesOfPost(id).then(replies =>{
        if(replies.length >0){
          this.setState({replies})
        }
      })
    }).catch((err)=>{
      this.props.history.push('/error')
      console.log(err.message)
    })
  }


  /*
  first click of delete
   */
  delete = () =>{
    this.state.tryDelete
    ?
    this.setState({tryDelete:false})
    :
    this.setState({tryDelete:true})
  }

  /*
  second click of delete ( implement deleting action )
   */
  deleteConfirm = () => {
    const {context, match} = this.props;
    const id = match.params.id
    const auth = context.authenticatedUser

    context.data.deletePost(id, auth).then(errors => {
      if(errors.length>0){
        const errMessages = errors.map(error=>error.message);
        this.setState({errors:errMessages})
      } else {
        this.props.history.push('/board')
      }
    })
  }

  submitReply = (e) =>{
    e.preventDefault();

    const {context,match} = this.props;
    const auth = context.authenticatedUser;
    const {replyDescription} = this.state;
    const postId = match.params.id
    const reply = {
      description:replyDescription,
      UserId:auth.id,
      User:auth,
      PostId:postId,
      createdAt: new Date()
    }

    context.data.createReply(reply).then((reply)=>{
      const newReplies = [
        {User:auth,...reply}, ...this.state.replies
      ];
      console.log(newReplies);
      this.setState({
        replies:newReplies
      })

    })

  }

  deleteReply = (id) => {
    const {context} = this.props;
    context.data.deleteReply(id).then(()=>{
      this.setState((prev)=>{
        const newReplies = prev.replies.filter(reply=>{
          return reply.id !== id
        })
        return {
          replies:newReplies
        }
      })
    })
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  /*
  rendering
   */
  render() {
    const {context, match} = this.props;
    const {post,tryDelete,replies} = this.state;
    const id = match.params.id;
    const auth = context.authenticatedUser;
    const {from} = this.props.location.state || {from:'/board'};
    let createdDate = null;
    if(post){
      const date = new Date(post.createdAt);
      createdDate = date.toLocaleDateString('ko-KR',{hour:"2-digit",minute:"2-digit"})
    }
    return (
      <div>
        <UncontrolledAlert className={tryDelete?"d-block":"d-none"} color="primary">
          <div className="alert-message">
            <h4 className="alert-heading">해당 게시물을 삭제하시겠습니까?</h4>
            <p>
              삭제후에는 복구가 불가능합니다.
            </p>
            <hr />
            <div className="btn-list">
              <Button onClick={this.deleteConfirm} color="light" className="mr-1">
                삭제
              </Button>
              <Button onClick={this.delete}color="secondary">취소</Button>
            </div>
          </div>
        </UncontrolledAlert>
        {
          post?
            (
              <Card className="detail-card-container">
                <CardHeader className="detail-header">
                  <div>
                    <h1 tag="h1" className="mb-10">
                      {post.title}
                    </h1>
                    <h5 className="mb-0 detail-time">
                      {`by ${post.User.name}    ${createdDate}`}
                    </h5>
                  </div>
                  <div className="detail-toggles-container">
                    <Link to={from}>
                      <ArrowLeft className="detail-toggles-arrow"/>
                    </Link>
                    {
                      post && auth && auth.emailAddress === post.User.emailAddress
                      ?
                      <div className="card-actions detail-toggles-dropdown">
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a">
                            <MoreHorizontal />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem><Link to={{
                              pathname:`/posts/${id}/update`,
                              state:{from:this.props.location}
                            }}>수정하기</Link></DropdownItem>
                            <DropdownItem onClick={this.delete}>삭제하기</DropdownItem>

                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      :
                      null
                    }

                  </div>
                </CardHeader>
                <hr />
                <CardBody>
                  <CardText className="detail-description">
                    {
                      post.description.map((post,i) =>(
                        <span key={i}>{post}</span>
                      ))
                    }
                  </CardText>

                </CardBody>
                <hr />

              </Card>
            )
            :
            null
          }
          <Card className="card-container">
            <Form onSubmit={this.submitReply}>
              <Label for="inputBio">댓글</Label>
              <Input
                name="replyDescription"
                type="textarea"
                rows="2"
                id="inputBio"
                placeholder="댓글을 입력하세요"
                onChange={this.change}
              />
              <Button type="submit" style={{marginTop:10,marginBottom:10}}>입력</Button>
            </Form>
            {
              replies.map((reply,i)=>{
                return (
                  <ReplyDetail
                    key={i}
                    reply={reply}
                    deleteReply={this.deleteReply}
                    context={context}/>
                )
              })
            }
          </Card>

      </div>
    )
  }
}
