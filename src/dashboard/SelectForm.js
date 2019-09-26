import React from "react";
import InputMask from "react-input-mask";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";


export default class ReactSelect extends React.Component {
  state={

    schoolNameList:null,
    gradeList:null,
    classNumberList:null

  }

  change = (e) => {
    const {context} = this.props;

    const {setFiltering} =context.actions;

    if(e.value!=="all"){
      setFiltering(e.name,e.value)
    } else {
      setFiltering(e.name,e.value)
    }
  };

  componentDidMount(){
    const {context} = this.props
    const {schoolName,grade,classNumber,data} = context

    //get option list
    const optionList = ["schoolName","grade","classNumber"];
    const options = optionList.reduce(async (acc,cur)=>{
      const list = await data.getSchool(cur).then(colList =>{
        return colList.map(ele =>{
          return {
            value:ele[cur],
            label:ele[cur],
            name: cur
          }
        });
      }).catch(err=>{
        this.props.history.push('/error');
      })

      acc[cur] = [
        { value:"all",
        label: "all",
        name:cur},
        ...list
      ]
      this.setState({
        [`${cur}List`]:acc[cur]
      })
      return acc;
    },{})
  }

  render() {
    const {
      schoolNameList,
      gradeList,
      classNumberList
    } = this.state
    const {
      schoolName,
      grade,
      classNumber
    } = this.props.context

    const selectedValue =(value,name)=>{
      return {
        value:value,
        label:value,
        name:name
      }
    }
    return (
      <Container fluid className="p-0">
        <Card>
          <CardBody>
            <Row>
              <Col lg="4">
                <FormGroup>
                  <Label>학교</Label>
                  <Select
                    name="school"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={schoolNameList}
                    placeholder="all"
                    onChange={this.change}
                    value={schoolName?selectedValue(schoolName,"schoolName"):selectedValue("all","schoolName")}

                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <Label>학년</Label>
                  <Select
                    name="grade"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={gradeList}
                    placeholder="all"
                    onChange={this.change}
                    value={grade?selectedValue(grade,"grade"):selectedValue("all","grade")}
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <Label>학급</Label>
                  <Select
                    name="classNumber"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={classNumberList}
                    placeholder="all"
                    onChange={this.change}
                    value={classNumber?selectedValue(classNumber,"classNumber"):selectedValue("all","classNumber")}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
