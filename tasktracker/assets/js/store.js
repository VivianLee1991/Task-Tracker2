import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
app's state {
  tasks: []
  users: []
  form: {
    title: ""
    description: ""
    worker_id: ""
    token: ""
  }
  token: {
    user_id:
    user_name:
    token:
  }
  login: {
    name:
    pass:
  }
  register: {
    username:
    email:
    password1:
    password2:
  }
  error: {
    msg: String
  }
  designer_form: {
    title:
    description:
    worker_id:
  }
}
*/
function tasks(state = [], action) {
  switch(action.type) {
    case 'TASKS_LIST':
      return [...action.tasks];
    case 'ADD_TASK':
      return [action.task, ...state];
    case 'EDIT_TASK':
      return _.map(state, (tt) => {
          if (tt.id == action.task_id) {
            return action.task;
          } else {
            return tt;
          }
        });
    case 'DELETE_TASK':
      return _.filter(state, (tt) => {tt.id != action.task_id;});
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
    case 'ADD_USER':
      return [action.user, ...state];
    default:
      return state;
  }
}

let empty_form = {
  title: "",
  description: "",
  worker_id: "",
  token: ""
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data); // merge objects
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    case 'DELETE_TOKEN':
      return empty_form;
    default:
      return state;
  }
}

let empty_designer_form = {
  title: "",
  description: "",
  worker_id: "",
};

function designer_form(state = empty_designer_form, action) {
  switch (action.type) {
    case 'UPDATE_DESIGNER_FORM':
      return Object.assign({}, state, action.data); // merge objects
    case 'CLEAR_DESIGNER_FORM':
      return empty_designer_form;
    default:
      return state;
  }
}

let empty_worker_form = {
  time: "",
  complete: "",
};

function worker_form(state = empty_worker_form, action) {
  switch (action.type) {
    case 'UPDATE_WORKER_FORM':
      return Object.assign({}, state, action.data); // merge objects
    case 'CLEAR_WORKER_FORM':
      return empty_worker_form;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'DELETE_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'DELETE_TOKEN':
      return empty_login;
    default:
      return state;
  }
}

let empty_error = {
  msg: "",
};

function error(state = empty_error, action) {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return Object.assign({}, state, action.msg);
    default:
      return state;
  }
}

let empty_register = {
  name: "",
  email: "",
  password1: "",
  password2: "",
};

function register(state = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_REG_FORM':
      return empty_register;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({tasks, users, form, token, login, register, error, designer_form, worker_form});
  let state1 = reducer(state0, action);
  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
