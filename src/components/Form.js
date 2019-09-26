import React from 'react';
import DisplayErrors from './DisplayErrors';


/*
have general form actions 
 */
export default (props) => {
  const {
    elements,
    submit,
    submitText,
    cancel,
    errors
  } = props

  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  return (
    <div>
      <DisplayErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">{submitText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
