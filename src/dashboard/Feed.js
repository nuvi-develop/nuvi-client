import React, {Component} from "react";
import { MessageSquare } from 'react-feather';
import {Link} from 'react-router-dom';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Media
} from "reactstrap";

import avatar1 from "./../assets/img/avatars/avatar.jpg";
import avatar4 from "./../assets/img/avatars/avatar-4.jpg";
import avatar5 from "./../assets/img/avatars/avatar-5.jpg";

export default class Feed extends Component {
  state ={
    feedData:[],

  }

  getPostData = (pageNum,contentPerPage) => {
    const {context} = this.props;
    context.data.getPosts(pageNum,contentPerPage).then(posts=>{
      const data = posts.rows.map(post=>{
        return {
          id:post.id,
          title:post.title,
          name:post.User.name,
          createdAt:post.createdAt,
          Replies:post.Replies,
        }
      });
      const count = posts.count;
      this.setState({
        feedData:data,
      })
    })
  }

  clickRow =(data)=>{
    this.props.history.push(`/posts/${data.id}`)
  }

  componentDidMount(){
    this.getPostData(1,5)
  }
  render(){
    const {feedData} = this.state;
    return(
      <Card className="flex-fill w-100">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            <MessageSquare className="mr-2"/> 게시판
          </CardTitle>
        </CardHeader>
        <CardBody>
          {
            feedData.map((data,i)=>{
              const date = new Date (data.createdAt);
              const localDate = date.toLocaleDateString('ko-KR',{hour:"2-digit",minute:"2-digit"})
              return (
                <Media
                  className="feed-row"
                  body
                  onClick={()=>this.clickRow(data)}
                  key={i}
                >
                  <strong>{data.title}</strong>
                  <br />
                  <small className="text-muted">{localDate}</small>
                  <br />
                </Media>
              )
            })
          }

          <hr />
          <Link to ='/board'>
            <Button color="primary" block>
              Load more
            </Button>
          </Link>

        </CardBody>
      </Card>
    )
  }
}
