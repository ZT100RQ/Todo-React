import { useReducer } from 'react';
import './TodoApp.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import Footer from './components/Footer/Footer.jsx';
import { INITIAL_STATE, todosReducer } from './todosReducer/todosReducer.js';

function TodoApp() {
  const [state, dispatch] = useReducer(todosReducer, INITIAL_STATE);

  const handleFormTask = (event) => {
    event.preventDefault();
    if (!event.target[0].value.trim()) return;
    dispatch({
      type: 'ADD_TASK',
    });
  };

  const handleFormInputs = (event) => {
    dispatch({
      type: 'FORM_INPUTS',
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleEvents = (typeOfEvent, taskId) => {
    if (!taskId) {
      dispatch({
        type: typeOfEvent,
      });
      return;
    }
    dispatch({
      type: typeOfEvent,
      id: taskId,
    });
  };

  const handleChangeInput = (event) => {
    dispatch({
      type: 'CHANGE_INPUT',
      value: event.target.value,
    });
  };

  const handleStartButton = (taskId) => {
    const timerId = setInterval(() => {
      dispatch({
        type: 'TIMER_DECREASE',
        id: taskId,
        idTimer: timerId,
      });
    }, 1000);
  };

  const handleStopButton = (taskId) => {
    dispatch({
      type: 'TIMER_STOP',
      id: taskId,
    });
  };

  const sortedTasks = (key) => {
    if (key == 'active') {
      return state.tasks.filter((task) => task.active);
    }
    if (key == 'done') {
      return state.tasks.filter((task) => !task.active);
    }
    if (key == 'all') {
      return state.tasks;
    }
  };
  const numberOfActiveTasks = state.tasks.filter((task) => task.active).length;
  const tasksData = sortedTasks(state.filter);
  return (
    <>
      <section className="todo-app">
        <NewTaskForm
          handleFormTask={handleFormTask}
          handleFormInputs={handleFormInputs}
          title={state.title}
          min={state.min}
          sec={state.sec}
        />
        <section className="main">
          <TaskList
            tasks={tasksData}
            handleEvents={handleEvents}
            editTitle={state.editTitle}
            handleStopButton={handleStopButton}
            handleChangeInput={handleChangeInput}
            handleStartButton={handleStartButton}
          />
          <Footer handleEvents={handleEvents} filter={state.filter} taskCount={numberOfActiveTasks} />
        </section>
      </section>
    </>
  );
}

export default TodoApp;
