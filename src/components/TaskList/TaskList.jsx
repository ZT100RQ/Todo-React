import './TaskList.css';
import Task from '../Task/Task.jsx';

function TaskList({ tasks, handleEvents, editTitle, handleChangeInput, handleStartButton, handleStopButton }) {
  return (
    <ul className="todo-list">
      {tasks.map(({ date, ...task }) => (
        <Task
          key={date}
          {...task}
          date={date}
          handleEvents={handleEvents}
          editTitle={editTitle}
          handleChangeInput={handleChangeInput}
          handleStartButton={handleStartButton}
          handleStopButton={handleStopButton}
        />
      ))}
    </ul>
  );
}

export default TaskList;
