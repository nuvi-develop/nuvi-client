import React, {Component} from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();


/**
 * Make a Provider class
 * @type {Object}
 */
export class Provider extends Component {
  //by making data instance in constructor, not state, prevent abuse of rendering
  constructor(){
    super();
    this.data= new Data();
  }
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    selectedDate: new Date(),
    schoolName:null,
    grade:null,
    classNumber:null,
  }
  render() {
    const value = {
      authenticatedUser:this.state.authenticatedUser,
      data: this.data,
      selectedDate: this.state.selectedDate,
      schoolName:this.state.schoolName,
      grade:this.state.grade,
      classNumber:this.state.classNumber,
      actions:{
        selectDate:this.selectDate,
        setFiltering:this.setFiltering,
        signIn:this.signIn,
        signOut:this.signOut
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  setFiltering =(name,value) => {
    if(value!=="all"){
      this.setState({
        [name]:value
      })
    } else {
      this.setState({
        [name]:null
      })
    }

  }

  selectDate = (date) => {
    this.setState({
      selectedDate:date
    })
  };

  signIn = async (emailAddress,password) => {
    const user = await this.data.getUser(emailAddress,password)
    this.setState({
      authenticatedUser:user
    })
    Cookies.set('authenticatedUser',user);
    return user
  }

  signOut = () => {
    this.setState({
      authenticatedUser:null
    })
    Cookies.remove('authenticatedUser');
  }


}

export const Consumer = Context.Consumer

/**
 * HOC for consumer components
 * @param  {[type]} Component consumes state values
 * @return {[type]}           can use props & context values
 */
export const withContext = (Component) => {
  return function ContextComponent(props) {
    return(
      <Context.Consumer>
        {context => <Component {...props} context={context}/>}
      </Context.Consumer>
    )
  }


}
