import './TasksFilter.css';

function TasksFilter({ handleEvents, filter }) {
  return (
    <ul className="filters">
      <li>
        <button className={filter == 'all' ? 'selected' : null} onClick={() => handleEvents('ALL_TASKS')}>
          All
        </button>
      </li>
      <li>
        <button className={filter == 'active' ? 'selected' : null} onClick={() => handleEvents('ACTIVE_TASKS')}>
          Active
        </button>
      </li>
      <li>
        <button className={filter == 'done' ? 'selected' : null} onClick={() => handleEvents('DONE_TASKS')}>
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TasksFilter;
