import './NewTaskForm.css';
import PropTypes from 'prop-types';
const NewTaskForm = ({
  addTask = () => {},
  inputTask = '',
  inputMin = '',
  inputSec = '',
  handleInputMin = () => {},
  handleInputSec = () => {},
  handleInputTask = () => {},
}) => {
  return (
    <div className="header">
      <h1>Todos</h1>
      <form
        className="new-todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          addTask(event);
        }}
      >
        <input
          className="new-todo"
          placeholder="Task?"
          value={inputTask}
          onChange={handleInputTask}
          autoFocus
          name="task"
          autoComplete="off"
        />
        <input
          className="new-todo-form__timer"
          value={inputMin}
          onChange={handleInputMin}
          placeholder="Min"
          name="minutes"
          autoComplete="off"
        />
        <input
          className="new-todo-form__timer"
          onChange={handleInputSec}
          value={inputSec}
          placeholder="Sec"
          name="seconds"
          autoComplete="off"
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  inputValue: PropTypes.func,
};

export default NewTaskForm;
