import React, {Component} from "react";
import { Card, CardBody, CardHeader, CardTitle, Container,Table,Button } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { MinusCircle, PlusCircle, MessageSquare } from "react-feather";

import {Link} from 'react-router-dom';

import Pagination from './Pagination';
const tableColumns = [
  {
    dataField: "title",
    text: "Title",
    sort: true
  },
  {
    dataField: "name",
    text: "Name",
    sort: true
  },
  {
    dataField: "createdAt",
    text: "created",
    sort: true
  }
];

class PaginationTable extends Component{
  state = {
    tableData:[],
    totalCount:0,
    currentPage:1,
    contentPerPage:10,
  }

  getPostData = (pageNum,contentPerPage) => {
    const {context} = this.props;
    context.data.getPosts(pageNum,contentPerPage).then(posts=>{
      const data = posts.rows.map(post=>{
        return {
          id:post.id,
          title:post.title,
          name:post.User ? post.User.name : null,
          createdAt:post.createdAt,
          Replies:post.Replies,
        }
      });
      const count = posts.count;
      this.setState({
        tableData:data,
        totalCount:count,
        currentPage:pageNum
      })
    })
  }

  componentDidMount(){
    const {currentPage, contentPerPage} = this.state;
    this.getPostData(currentPage, contentPerPage);


  }

  componentDidUpdate(prevProps,prevState){

  }

  componentWillUnmount(){
    this.setState({
      tableData:[]
    })
  }

  clickRow =(e,data)=>{
    this.props.history.push(`/posts/${data.id}`)
  }

  clickNewPost = () => {
    this.props.history.push('/posts/create')
  }

  clickPage = (i) => {
    const pageNum = i;
    const {contentPerPage} = this.state;
    this.getPostData(pageNum, contentPerPage);
  }

  render(){
    const {
      tableData,
      totalCount,
      contentPerPage,
      currentPage
    } = this.state

    return (
      <Card>
        <CardBody className="board-container">
          <div className="text-left mb-3">
            <Button onClick={this.clickNewPost} color="primary" size="lg">
              New Post
            </Button>
          </div>
          <Table hover className="my-0">
            <colgroup>
              <col width="60%"></col>
              <col width="10%"></col>
              <col width="30%"></col>
            </colgroup>
            <thead>
              <tr>
                <th>제목</th>
                <th>이름</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((data,i)=>{
                  const date = new Date (data.createdAt);
                  const localDate = date.toLocaleDateString('ko-KR',{hour:"2-digit",minute:"2-digit"})
                  const numberOfReply = data.Replies.length>0 ? `(${data.Replies.length})` : "" ;
                  return(
                      <tr key={i} onClick={(e)=>this.clickRow(e,data)}>
                        <td >{`${data.title} ${numberOfReply}`}</td>
                        <td>{data.name}</td>
                        <td>{localDate}</td>
                      </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <Pagination
            clickPage={this.clickPage}
            totalCount={totalCount}
            contentPerPage={contentPerPage}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    );
  }
};

const Tables = (props) => {
  const {context} = props
  return (
    <Container fluid className="p-0">
      <MessageSquare className="m-2"/><h1 className="h3 mb-3 d-inline"> 게시판</h1>

      <PaginationTable context={context} history={props.history}/>
    </Container>
  );
}

export default Tables;
