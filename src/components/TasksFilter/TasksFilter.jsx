import { Component } from 'react';
import './TasksFilter.css';
import PropTypes from 'prop-types';

class TasksFilter extends Component {
  static defaultProps = {
    changeFilter: () => {},
  };

  state = {
    all: 'selected',
    active: null,
    completed: null,
  };

  selectAll = () => {
    this.setState({ all: 'selected', active: null, completed: null });
  };

  selectActive = () => {
    this.setState({ all: null, active: 'selected', completed: null });
  };

  selectCompleted = () => {
    this.setState({ all: null, active: null, completed: 'selected' });
  };

  render() {
    const { changeFilter = () => {} } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            className={this.state.all}
            onClick={() => {
              this.selectAll();
              changeFilter('all');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={this.state.active}
            onClick={() => {
              this.selectActive();
              changeFilter('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.state.completed}
            onClick={() => {
              this.selectCompleted();
              changeFilter('completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  changeFilter: PropTypes.func,
};
export default TasksFilter;
