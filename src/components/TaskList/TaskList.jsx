import './TaskList.css';
import Task from '../Task/Task.jsx';
import PropTypes from 'prop-types';

const TaskList = ({
  handleStartButton = () => {},
  handleStopButton = () => {},
  tasks = [],
  onDeleted = () => {},
  onToggleComplete = () => {},
  editTodo = () => {},
  changeDescription = () => {},
}) => {
  const elements = tasks.map((item) => {
    const { id, timer, ...itemProps } = item;
    return (
      <Task
        key={id}
        {...itemProps}
        timer={timer}
        handleStopButton={() => handleStopButton(id)}
        handleStartButton={(event) => {
          event.stopPropagation();
          handleStartButton(id);
        }}
        onDeleted={() => onDeleted(id)}
        onToggleComplete={() => onToggleComplete(id)}
        editTodo={() => editTodo(id)}
        changeDescription={() => changeDescription(id)}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleComplete: PropTypes.func,
  editTodo: PropTypes.func,
  changeDescription: PropTypes.func,
};

export default TaskList;
