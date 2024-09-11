import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Task.css';
import PropTypes from 'prop-types';

class Task extends Component {
  constructor(props) {
    super(props);
    this.inputEditRef = React.createRef();
  }

  secondsTimer(timer) {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer - hours * 3600) / 60);
    let seconds = timer - hours * 3600 - minutes * 60;
    let time = '';

    if (hours != 0) {
      time = hours + ':';
    }
    if (minutes != 0 || time !== '') {
      minutes = minutes < 10 && time !== '' ? '0' + minutes : String(minutes);
      time += minutes + ':';
    }
    if (time === '') {
      time = seconds + 's';
    } else {
      time += seconds < 10 ? '0' + seconds : String(seconds);
    }
    return time;
  }

  componentDidUpdate() {
    if (this.props.edit == 'editing') {
      this.inputEditRef.current.focus();
    }
  }
  render() {
    const {
      description = 'Новая задача',
      onDeleted = () => {},
      onToggleComplete = () => {},
      classNames = '',
      completed = false,
      edit = '',
      view = '',
      editTodo = () => {},
      changeDescription = () => {},
      date = Date.now(),
      timer = 0,
      handleStartButton = () => {},
      timerStarted = false,
      handleStopButton = () => {},
      cancelEditing = () => {},
    } = this.props;

    return (
      <li className={edit}>
        <div className={`${classNames} ${view}`}>
          <input onChange={onToggleComplete} className="toggle" type="checkbox" checked={completed} />
          <label htmlFor="stop">
            <span className="title" onClick={onToggleComplete}>
              {description}
            </span>
            <span className="description">
              <button
                className="icon icon-play"
                disabled={classNames ? !timerStarted : timerStarted}
                name="start"
                onClick={handleStartButton}
              ></button>
              <button
                className="icon icon-pause"
                disabled={!timerStarted}
                name="stop"
                onClick={handleStopButton}
              ></button>
              {this.secondsTimer(timer)}
            </span>
            <span className="description">{formatDistanceToNow(date, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit" onClick={editTodo}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input
          ref={this.inputEditRef}
          name="change"
          type="text"
          className="edit"
          defaultValue={description}
          onKeyUp={changeDescription}
          onKeyDown={cancelEditing}
          onBlur={cancelEditing}
        />
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
