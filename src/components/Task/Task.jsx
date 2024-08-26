import { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Task.css';
import PropTypes from 'prop-types';

class Task extends Component {
  render() {
    const {
      description = 'Новая задача',
      onDeleted = () => {},
      onToggleComplete = () => {},
      classNames = '',
      checked = false,
      edit = '',
      view = '',
      editTodo = () => {},
      changeDescription = () => {},
      date = Date.now(),
    } = this.props;

    return (
      <li className={edit}>
        <div className={`${classNames} ${view}`}>
          <input onChange={onToggleComplete} className="toggle" type="checkbox" checked={checked} />
          <label>
            <span className="description" onClick={onToggleComplete}>
              {description}
            </span>
            <span className="created">{formatDistanceToNow(date, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit" onClick={editTodo}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue={description} onKeyDown={changeDescription} />
      </li>
    );
  }
}

Task.propTypes = {
  description: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleComplete: PropTypes.func,
  editTodo: PropTypes.func,
  changeDescription: PropTypes.func,
  classNames: PropTypes.string,
  checked: PropTypes.bool,
  edit: PropTypes.string,
  view: PropTypes.string,
  date: PropTypes.number,
};

export default Task;
