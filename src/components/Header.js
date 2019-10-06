import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

/*
Header component. change contents with authentification
 */
export default class Header extends Component {
  state = {
    expanded:false
  }
  expand = ()=> {
    this.setState({
      expanded: true
    })
  }
  unExpand = ()=> {
    this.setState({
      expanded: false
    })
  }
  toggle = () =>{
    this.setState((prev)=>{
      if(prev.expanded){
        return{
          expanded:false
        }
      } else {
        return{
          expanded:true
        }
      }
    })
  }
  render() {
    const {expanded} = this.state;
    const {context} = this.props;
    const {authenticatedUser} = context
    return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top" expanded={expanded} onToggle={()=>{}}>
      <Navbar.Brand>NUVI LAB</Navbar.Brand>
      <Navbar.Toggle onClick={this.toggle} aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" onClick={this.unExpand}>
          <Nav.Link as={Link} className="header-nav-item" to="/">DashBoard</Nav.Link>
          <Nav.Link as={Link} className="header-nav-item" to="/gov">교육청 관계자 </Nav.Link>
          <Nav.Link as={Link} className="header-nav-item" to="/school">학교 관계자</Nav.Link>
          <Nav.Link as={Link} className="header-nav-item" to="/student">학생</Nav.Link>
          <Nav.Link as={Link} className="header-nav-item" to="/board">Board</Nav.Link>
        </Nav>
        <Nav className="ml-auto" onClick={this.unExpand}>
          {
            authenticatedUser
            ?
            <React.Fragment>
              <Nav.Link as={Link} className="header-nav-item" to="/">Welcome! {authenticatedUser.name}</Nav.Link>
              <Nav.Link as={Link} className="header-nav-item" to="/signout">Sign Out</Nav.Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Nav.Link as={Link} className="header-nav-item" to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} className="header-nav-item" to="/signin">Sign In</Nav.Link>
            </React.Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }

}
