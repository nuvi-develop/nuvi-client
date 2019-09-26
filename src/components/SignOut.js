import React from 'react';
import {Redirect} from 'react-router-dom';

/*
implement user signOut actions and redirections
 */
export default ({context}) => {
  context.actions.signOut()
  return (
    <Redirect to='/'/>
  )
}
