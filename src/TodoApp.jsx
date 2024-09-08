import { Component } from 'react';
import './TodoApp.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import Footer from './components/Footer/Footer.jsx';

class TodoApp extends Component {
  state = {
    filter: 'all',
    tasks: [],
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
    this.setState(() => {
      if (window.localStorage.getItem('tasks').length == 0 || !window.localStorage.getItem('tasks')) {
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
          disabled: true,
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
        disabled: false,
        timerId: null,
      };
      const newArray = tasks.with(idx, newItem);
      return { tasks: newArray };
    });
  };

  addItem = (task, seconds) => {
    const newItem = {
      description: task,
      id: Date.now(),
      completed: false,
      classNames: '',
      checked: false,
      active: true,
      edit: '',
      view: '',
      date: Date.now(),
      timer: seconds,
      timerStarted: false,
      disabled: false,
    };
    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem];
      return { tasks: newArray };
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
        checked: !oldItem.checked,
        active: !oldItem.active,
      };

      const newArray = tasks.with(idx, newItem);
      return { tasks: newArray };
    });
  };

  inputValue = (event) => {
    if (!event.target[0].value.trim()) {
      alert('Mandatory field: "Task"');
      return;
    }
    if (!Number.isInteger(Number(event.target[1].value)) || !Number.isInteger(Number(event.target[2].value))) {
      alert('Wrong Min/Sec! Example: Min: 12 Sec: 10');
      return;
    }
    const test = new FormData(event.target);
    const seconds = Number(test.get('minutes')) * 60 + Number(test.get('seconds'));
    this.addItem(test.get('task'), seconds);
    event.target[0].value = '';
    event.target[1].value = '';
    event.target[2].value = '';
  };

  changeFilter = (key) => {
    this.setState({ filter: key });
  };

  sortedTasks = (key) => {
    if (key == 'completed') {
      return this.state.tasks.filter((task) => task.completed);
    }
    if (key == 'active') {
      return this.state.tasks.filter((task) => task.active);
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
          checked: false,
          active: true,
          completed: false,
        };
        const newArray = tasks.with(idx, newItem);
        return { tasks: newArray };
      });
    }
  };

  render() {
    const { filter, tasks } = this.state;
    const todos = this.sortedTasks(filter);
    const todoLeft = tasks.filter((task) => task.active);
    return (
      <section className="todo-app">
        <NewTaskForm inputValue={this.inputValue} />
        <section className="main">
          <TaskList
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
