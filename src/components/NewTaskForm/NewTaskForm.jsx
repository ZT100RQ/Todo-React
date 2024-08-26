import React from 'react';
import "./NewTaskForm.css";
import PropTypes from 'prop-types';

const NewTaskForm = ({inputValue = () => {}}) => {
  


  return (
    <div className="header">
      <h1>Todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={(event) => inputValue(event)}
      />
    </div>
  );
};

NewTaskForm.propTypes = {
  inputValue: PropTypes.func,
}

export default NewTaskForm;
