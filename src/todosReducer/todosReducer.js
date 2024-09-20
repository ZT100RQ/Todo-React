export const INITIAL_STATE = {
  title: '',
  min: '',
  sec: '',
  editTitle: '',
  tasks: [],
  filter: 'all',
};

export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            title: state.title.trim(),
            timer: Number(state.min) * 60 + Number(state.sec),
            min: state.min,
            sec: state.sec,
            date: Date.now(),
            active: true,
            isTimerOn: false,
            isEdit: false,
            idTimer: null,
          },
        ],
        title: '',
        min: '',
        sec: '',
      };
    }
    case 'FORM_INPUTS': {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case 'DELETE_TASK': {
      const editId = state.tasks.findIndex((task) => task.date == Number(action.id));
      const oldItem = state.tasks[editId];
      clearInterval(oldItem.idTimer);
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.date !== Number(action.id))],
      };
    }
    case 'TASK_COMPLETE': {
      const completedId = state.tasks.findIndex((task) => task.date == Number(action.id));
      const oldItem = state.tasks[completedId];
      clearInterval(oldItem.idTimer);
      const newItem = {
        ...oldItem,
        active: !oldItem.active,
        isTimerOn: false,
        timer: oldItem.timer,
      };
      const newTasks = state.tasks.with(completedId, newItem);
      return {
        ...state,
        tasks: [...newTasks],
      };
    }
    case 'EDIT_TASK': {
      const editId = state.tasks.findIndex((task) => task.date == Number(action.id));
      const oldItem = state.tasks[editId];
      const newItem = {
        ...oldItem,
        isEdit: true,
        isTimerOn: false,
      };
      clearInterval(oldItem.idTimer);
      const newTasks = state.tasks.with(editId, newItem);
      return {
        ...state,
        editTitle: newItem.title,
        tasks: [...newTasks],
      };
    }
    case 'CHANGE_INPUT': {
      return {
        ...state,
        editTitle: action.value,
      };
    }
    case 'ACCEPT_NEW_TITLE': {
      const editId = state.tasks.findIndex((task) => task.date == Number(action.id));
      const oldItem = state.tasks[editId];
      const newItem = {
        ...oldItem,
        title: state.editTitle,
        isEdit: false,
      };
      const newTasks = state.tasks.with(editId, newItem);
      return {
        ...state,
        tasks: [...newTasks],
        editTitle: '',
      };
    }
    case 'ABORT_NEW_TITLE': {
      const editId = state.tasks.findIndex((task) => task.date == Number(action.id));
      const oldItem = state.tasks[editId];
      const newItem = {
        ...oldItem,
        isEdit: false,
      };
      const newTasks = state.tasks.with(editId, newItem);
      return {
        ...state,
        tasks: [...newTasks],
        editTitle: '',
      };
    }
    case 'TIMER_DECREASE': {
      const editId = state.tasks.findIndex((task) => task.date == Number(action.id));
      const oldItem = state.tasks[editId];
      if (oldItem.timer == 0) {
        clearInterval(oldItem.idTimer);
        const newItem = {
          ...oldItem,
          isTimerOn: false,
          timer: oldItem.timer,
          idTimer: null,
        };
        const newTasks = state.tasks.with(editId, newItem);
        return {
          ...state,
          tasks: [...newTasks],
        };
      }
      const newItem = {
        ...oldItem,
        isTimerOn: true,
        timer: oldItem.timer - 1,
        idTimer: action.idTimer,
      };
      const newTasks = state.tasks.with(editId, newItem);
      return {
        ...state,
        tasks: [...newTasks],
      };
    }
    case 'TIMER_STOP': {
      const editId = state.tasks.findIndex((task) => task.date == Number(action.id));
      const oldItem = state.tasks[editId];
      const newItem = {
        ...oldItem,
        isTimerOn: false,
        timer: oldItem.timer,
        idTimer: null,
      };
      clearInterval(oldItem.idTimer);
      const newTasks = state.tasks.with(editId, newItem);
      return {
        ...state,
        tasks: [...newTasks],
      };
    }
    case 'CLEAR_TASKS': {
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.active)],
      };
    }
    case 'ALL_TASKS': {
      return {
        ...state,
        filter: 'all',
      };
    }
    case 'ACTIVE_TASKS': {
      return {
        ...state,
        filter: 'active',
      };
    }
    case 'DONE_TASKS': {
      return {
        ...state,
        filter: 'done',
      };
    }
  }
};
