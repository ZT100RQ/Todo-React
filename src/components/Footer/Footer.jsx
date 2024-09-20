import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

export default function Footer({ handleEvents, filter, taskCount }) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCount ? `${taskCount} todo left` : '0 todo left'}</span>
      <TasksFilter handleEvents={handleEvents} filter={filter} />
      <button className="clear-completed" onClick={() => handleEvents('CLEAR_TASKS')}>
        Clear completed
      </button>
    </footer>
  );
}
