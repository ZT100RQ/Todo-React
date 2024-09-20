import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import './Task.css';
import { useEffect, useRef } from 'react';

function secondsTimer(timer) {
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

function Task({
  title,
  date,
  active,
  isEdit,
  timer,
  isTimerOn,
  handleEvents,
  editTitle,
  handleChangeInput,
  handleStartButton,
  handleStopButton,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    isEdit && inputRef.current.focus();
    return;
  }, [isEdit]);

  return (
    <li className={isEdit ? 'editing' : null}>
      <div className={isEdit ? 'view' : active ? null : 'completed'}>
        <input
          checked={!active}
          className="toggle"
          type="checkbox"
          onChange={() => handleEvents('TASK_COMPLETE', date)}
          autoFocus
        />
        <label htmlFor="stop">
          <span className="title" onClick={() => handleEvents('TASK_COMPLETE', date)}>
            {title}
          </span>
          <span className="description">
            <button
              className="icon icon-play"
              disabled={active ? isTimerOn : !isTimerOn}
              onClick={() => handleStartButton(date)}
            ></button>
            <button
              className="icon icon-pause"
              disabled={!isTimerOn}
              onClick={() => handleStopButton(date)}
              name="stop"
            ></button>
            {secondsTimer(timer)}
          </span>
          <span className="description">{formatDistanceToNow(date, { includeSeconds: true })} ago</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            handleEvents('EDIT_TASK', date);
          }}
        />
        <button className="icon icon-destroy" onClick={() => handleEvents('DELETE_TASK', date)} />
      </div>
      <input
        autoFocus
        ref={inputRef}
        className="edit"
        type="text"
        name="change"
        value={editTitle}
        onChange={handleChangeInput}
        onKeyDown={(event) => {
          if (event.key == 'Escape') {
            handleEvents('ABORT_NEW_TITLE', date);
          }
        }}
        onKeyUp={(event) => {
          if (event.key == 'Enter' && event.target.value.trim()) handleEvents('ACCEPT_NEW_TITLE', date);
        }}
        onBlur={() => {
          handleEvents('ABORT_NEW_TITLE', date);
        }}
      />
    </li>
  );
}

export default Task;
