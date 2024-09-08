import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ inputValue = () => {} }) => {
  return (
    <div className="header">
      <h1>Todos</h1>
      <form
        className="new-todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          inputValue(event);
        }}
      >
        <input className="new-todo" placeholder="Task?" autoFocus name="task" autoComplete="off" />
        <input className="new-todo-form__timer" placeholder="Min" name="minutes" autoComplete="off" />
        <input className="new-todo-form__timer" placeholder="Sec" name="seconds" autoComplete="off" />
        <button type="submit"></button>
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  inputValue: PropTypes.func,
};

export default NewTaskForm;
