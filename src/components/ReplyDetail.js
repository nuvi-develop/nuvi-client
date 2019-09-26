import React, {Component} from 'react';
import {
  Card,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,

} from 'reactstrap';

import {MoreHorizontal } from 'react-feather';


export default class ReplyDetail extends Component {

  componentDidMount(){
    const {reply} = this.props;
    this.setState({
      replyDescription: reply.description
    })
  }

  state ={
    triedUpdate:false,
    deleted:false,
    replyDescription:'',
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]:value
    })
  }

  tryUpdate = ()=>{
    const {reply} = this.props
    this.setState({
      triedUpdate:true
    })
  }

  updateReply = (e) =>{
    e.preventDefault();
    const {replyDescription} = this.state;
    const {reply,context} = this.props;
    const id = reply.id;
    reply.description = replyDescription;

    context.data.updateReply(id,reply).then(()=>{
      this.setState({
        triedUpdate:false
      })
    });
  }

  delete = () => {
    const {reply,deleteReply} = this.props;
    const id= reply.id;
    deleteReply(id);
  }


  render(){
    const {reply} = this.props;
    const {triedUpdate,replyDescription,deleted} = this.state;
    const auth = this.props.context.authenticatedUser;
    const date = new Date(reply.createdAt);
    const newCreatedAt = date.toLocaleDateString('ko-KR',{hour:'2-digit',minute:'2-digit'});
    return (
      <React.Fragment>
        {
          deleted
          ?
          null
          :
          <Card className="">
            <CardHeader className="detail-header reply">
              <div>
                <h5 className="mb-0">
                  {reply.User.name}
                </h5>
                <h5 className="mb-0 detail-time">
                  {newCreatedAt}
                </h5>
              </div>
              <div className="detail-toggles-container">
                  <div className="card-actions">
                    {
                      auth && auth.id === reply.User.id
                      ?
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a">
                          <MoreHorizontal />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem onClick={this.tryUpdate}>수정하기</DropdownItem>
                          <DropdownItem onClick={this.delete}>삭제하기</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      :
                      null
                    }
                  </div>
              </div>
            </CardHeader>
            {
              triedUpdate
              ?
              <Form onSubmit={this.updateReply}>
                <Input
                  name="replyDescription"
                  type="textarea"
                  rows="2"
                  id="inputBio"
                  placeholder="수정할 내용을 입력하세요"
                  value={replyDescription}
                  onChange={this.change}
                />
                <Button type="submit" color="info" style={{marginTop:10,marginBottom:10}}>수정</Button>
              </Form>
              :
              <CardBody className="reply">
                <CardText className="detail-description">
                  {reply.description}
                </CardText>
              </CardBody>
            }

          </Card>
        }
      </React.Fragment>
    )
  }
}
