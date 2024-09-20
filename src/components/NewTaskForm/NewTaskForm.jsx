import './NewTaskForm.css';

function NewTaskForm({ handleFormTask, handleFormInputs, title, sec, min }) {
  const handleTimerInputs = (event) => {
    if (!Number.isInteger(Number(event.target.value))) {
      return;
    }
    handleFormInputs(event);
  };

  return (
    <div className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={(event) => handleFormTask(event)}>
        <input
          value={title}
          className="new-todo"
          autoComplete="off"
          placeholder="Task?"
          name="title"
          onChange={(event) => handleFormInputs(event)}
        />
        <input
          className="new-todo-form__timer"
          autoComplete="off"
          placeholder="Min"
          name="min"
          value={min}
          onChange={(event) => handleTimerInputs(event)}
        />
        <input
          className="new-todo-form__timer"
          autoComplete="off"
          placeholder="Sec"
          name="sec"
          value={sec}
          onChange={(event) => handleTimerInputs(event)}
        />
        <button type="submit" />
      </form>
    </div>
  );
}
export default NewTaskForm;
