import { Component } from 'react';
import './TodoApp.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import Footer from './components/Footer/Footer.jsx';

class TodoApp extends Component {
  state = {
    filter: 'all',
    tasks: [],
    inputTask: '',
    inputMin: '',
    inputSec: '',
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      clearInterval(tasks[idx].timerId);
      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
      return { tasks: newArray };
    });
  };
  componentDidMount() {
    if (window.localStorage.getItem('tasks') == null) {
      return;
    }
    this.setState(() => {
      if (window.localStorage.getItem('tasks').length == 0) {
        return;
      }
      const taskStorage = JSON.parse(window.localStorage.getItem('tasks'));
      return {
        tasks: taskStorage,
      };
    });
  }
  componentDidUpdate() {
    this.setState(({ tasks }) => {
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  handleStartButton = (id) => {
    let currentTimerId = setInterval(() => {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);
        const oldItem = tasks[idx];
        if (oldItem.timer == 0) {
          clearInterval(currentTimerId);
          const newItem = {
            ...oldItem,
            timer: 0,
            timerStarted: false,
          };
          const newArray = tasks.with(idx, newItem);
          return { tasks: newArray };
        }
        const newItem = {
          ...oldItem,
          timer: oldItem.timer - 1,
          timerStarted: true,
          timerId: currentTimerId,
        };
        const newArray = tasks.with(idx, newItem);
        return { tasks: newArray };
      });
    }, 1000);
  };

  handleStopButton = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      if (oldItem.timerStarted) {
        clearInterval(oldItem.timerId);
      }
      const newItem = {
        ...oldItem,
        timer: oldItem.timer,
        timerStarted: false,
        timerId: null,
      };
      const newArray = tasks.with(idx, newItem);
      return { tasks: newArray };
    });
  };

  handleInputTask = (event) => {
    this.setState(() => {
      return { inputTask: event.target.value };
    });
  };
  handleInputMin = (event) => {
    if (!Number.isInteger(Number(event.target.value))) {
      return;
    }
    this.setState({ inputMin: event.target.value });
  };
  handleInputSec = (event) => {
    if (!Number.isInteger(Number(event.target.value))) {
      return;
    }
    this.setState({ inputSec: event.target.value });
  };

  addTask = () => {
    if (!this.state.inputTask.trim() || (!this.state.inputSec && !this.state.inputMin)) {
      return;
    }
    const newTask = {
      description: this.state.inputTask,
      id: Date.now(),
      completed: false,
      classNames: '',
      edit: '',
      view: '',
      date: Date.now(),
      timer: Number(this.state.inputMin) * 60 + Number(this.state.inputSec),
      timerStarted: false,
    };
    this.setState((state) => {
      return {
        tasks: [...state.tasks, newTask],
        inputTask: '',
        inputMin: '',
        inputSec: '',
      };
    });
  };

  onToggleComplete = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      clearInterval(oldItem.timerId);
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
        classNames: oldItem.completed ? null : 'completed',
      };

      const newArray = tasks.with(idx, newItem);
      return { tasks: newArray };
    });
  };

  changeFilter = (key) => {
    this.setState({ filter: key });
  };

  sortedTasks = (key) => {
    if (key == 'completed') {
      return this.state.tasks.filter((task) => task.completed);
    }
    if (key == 'active') {
      return this.state.tasks.filter((task) => !task.completed);
    }
    if (key == 'all') {
      return this.state.tasks;
    }
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const withoutCompleted = tasks.filter((task) => !task.completed);
      return { tasks: withoutCompleted };
    });
  };

  editTodo = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      clearInterval(oldItem.timerId);
      const newItem = { ...oldItem, edit: 'editing', view: 'view' };
      const newArray = tasks.with(idx, newItem);
      return { tasks: newArray };
    });
  };

  changeDescription = (id) => {
    if (event.key == 'Enter' && event.target.value.trim()) {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);
        const oldItem = tasks[idx];
        const newItem = {
          ...oldItem,
          description: event.target.value,
          edit: '',
          view: '',
          classNames: '',
          completed: false,
        };
        const newArray = tasks.with(idx, newItem);
        return { tasks: newArray };
      });
    }
  };
  cancelEditing = (id) => {
    if (event.key == 'Escape' || event.type == 'focusout') {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);
        const oldItem = tasks[idx];
        const newItem = {
          ...oldItem,
          edit: '',
          view: '',
          classNames: '',
          completed: false,
        };
        const newArray = tasks.with(idx, newItem);
        return { tasks: newArray };
      });
    }
  };

  render() {
    const { filter, tasks, inputTask, inputMin, inputSec } = this.state;
    const todos = this.sortedTasks(filter);
    const todoLeft = tasks.filter((task) => !task.completed);
    return (
      <section className="todo-app">
        <NewTaskForm
          addTask={this.addTask}
          inputTask={inputTask}
          inputMin={inputMin}
          inputSec={inputSec}
          handleInputTask={this.handleInputTask}
          handleInputSec={this.handleInputSec}
          handleInputMin={this.handleInputMin}
        />
        <section className="main">
          <TaskList
            cancelEditing={this.cancelEditing}
            handleStartButton={this.handleStartButton}
            handleStopButton={this.handleStopButton}
            tasks={todos}
            onDeleted={this.deleteItem}
            onToggleComplete={this.onToggleComplete}
            editTodo={this.editTodo}
            changeDescription={this.changeDescription}
          />
          <Footer activeTodos={todoLeft.length} changeFilter={this.changeFilter} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    );
  }
}

export default TodoApp;
