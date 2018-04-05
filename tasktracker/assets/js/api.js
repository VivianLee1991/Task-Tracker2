import store from './store';

class TheServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data, token: data.token }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
        console.log("Posted");
      },
      error: (resp) => {
        console.log(resp);
      }
    });
  }

  edit_task(data, task_id) {
    $.ajax("/api/v1/tasks/" + task_id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'EDIT_TASK',
          task: resp.data,
          task_id: task_id,
        });
      },
    });
  }

  delete_task(task_id) {
    $.ajax("/api/v1/tasks/" + task_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          task_id: task_id,
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data:JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (msg) => {
        store.dispatch({
          type: 'LOGIN_ERROR',
          msg: msg,
        });
      },
    });
  }

  submit_register(data) {
    let pass1 = data.password1;
    let pass2 = data.password2;

    if (pass1 === pass2) {
      $.ajax("/api/v1/users", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ user: {name: data.name, email: data.email, password: pass1, password_hash: ""} }),
        success: (resp) => {
          store.dispatch({
            type: 'ADD_USER',
            user: resp.data,
          });
          store.dispatch({
            type: 'CLEAR_REG_FORM',
          });
        },
        error: (resp) => {
          console.log(resp);
        }
      });
    } else {
      // re-enter password
      console.log("Re-enter password.");
    }

  }
}

export default new TheServer();
