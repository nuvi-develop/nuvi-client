import React,{Component} from "react";
import { Container, Row, Col } from "reactstrap";

import Statistics from "./Statistics";
import LineChart from "./LineChart";
import Feed from "./Feed";
import Calendar from "./Calendar";
import PieChart from "./PieChart";
import Projects from "./Projects";
import BarChart from "./BarChart";
import SelectForm from './SelectForm';

import theme from "../theme";

export default class DashBoard extends Component  {
  state = {
    supplyAndLefts:[]
  }

  getDates = () => {
    const {context} = this.props
    let dates = [];
    let j = 0
    for(let i = 0; j<12; i++){
      const date = (new Date(context.selectedDate - i*(24*60*60*1000)))
      const day = date.getDay()
      if(day !== 0 && day !== 6){
        dates.push(date);
        j++
      }
    }
    return dates;
  }

  isSameDate = (date1,date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  getSupplyLeftData = () => {
    const {context} = this.props;
    const dates = this.getDates();
    const {schoolName, grade, classNumber} = context

    context.data.getSupplyAndLeft().then(supplyAndLefts => {

      supplyAndLefts = supplyAndLefts.filter(d=>{
        return (dates.filter(date=>{
          return this.isSameDate(date,new Date(d.date)).length>0
        } ))
      })

      if(schoolName!==null){
        supplyAndLefts = supplyAndLefts.filter(d=>{
          return (d.Student.School.schoolName === schoolName)
        })
      }

      if(grade!==null){
        supplyAndLefts = supplyAndLefts.filter(d=>d.Student.School.grade === grade)
      }

      if(classNumber!==null){
        supplyAndLefts = supplyAndLefts.filter(d=>d.Student.School.classNumber === classNumber)
      }

      this.setState({
        supplyAndLefts:supplyAndLefts
      })
    }).catch(err=>{
      this.props.history.push('/error');
    });
  }

  componentDidMount() {
    this.getSupplyLeftData();
  }

  //only update when prevProps are different with current props
  componentDidUpdate(prevProps,prevState) {
    if(prevProps.context !== this.props.context){
      this.getSupplyLeftData();
    }
  }


  render(){
    const {context} = this.props
    const {supplyAndLefts} = this.state
    return (
      <Container fluid className="p-0">
        <Row>
          <Col lg="12" className="d-flex">
            <SelectForm context={context} getSupplyLeftData={this.getSupplyLeftData}/>
          </Col>
        </Row>
        <Row>
          <Col lg="8" xl="8" className="d-flex">
            <LineChart theme={theme} context={context} supplyAndLefts={supplyAndLefts}/>
          </Col>
          <Col lg="4" xl="4" className="d-flex">
            <Calendar context={context} supplyAndLefts={supplyAndLefts}/>
          </Col>
        </Row>
        <Row>
          <Col lg="6" xl="4" className="d-flex">
            <BarChart theme={theme} context={context} supplyAndLefts={supplyAndLefts}/>
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <PieChart theme={theme} context={context} supplyAndLefts={supplyAndLefts}/>
          </Col>
          <Col lg="4" className="d-flex">
            <Feed context={context} supplyAndLefts={supplyAndLefts} history={this.props.history}/>
          </Col>
        </Row>
        <Row>
          <Col lg="12" xl="12" className="d-flex">
            <Projects context={context} supplyAndLefts={supplyAndLefts}/>
          </Col>

        </Row>
      </Container>
    );
  }
}
