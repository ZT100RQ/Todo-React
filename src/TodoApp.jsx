import { Component } from 'react';
import './TodoApp.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import Footer from './components/Footer/Footer.jsx';

class TodoApp extends Component {
  maxId = 100;
  state = {
    filter: 'all',
    tasks: [],
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
      return { tasks: newArray };
    });
  };

  addItem = (text) => {
    const newItem = {
      description: text,
      id: this.maxId++,
      completed: false,
      classNames: '',
      checked: false,
      active: true,
      edit: '',
      view: '',
      date: Date.now(),
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
    if (event.code === 'Enter') {
      this.addItem(event.target.value);
      event.target.value = '';
    }
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

      const newItem = { ...oldItem, edit: 'editing', view: 'view' };

      const newArray = tasks.with(idx, newItem);
      return { tasks: newArray };
    });
  };

  changeDescription = (id) => {
    if (event.code == 'Enter' && event.target.value.trim()) {
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
