import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './navigation';
import Users from './users';
import Tasks from './tasks';
import TaskForm from './taskform';

export default function tasktracker_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Tasktracker />, root);
}

class Tasktracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      users: [],
    };

    this.request_tasks();
    this.request_users();
  }

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState( _.extend(this.state, { tasks: resp.data }));
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState( _.extend(this.state, { users: resp.data }));
      },
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route path="/" exact={true} render={ () =>
            <div>
              <TaskForm users={this.state.users} />
              <Tasks tasks={this.state.tasks} />
            </div>
          } />
          <Route path="/users" exact={true} render={ () =>
            <Users users={this.state.users} />
          } />
          <Route path="/users/:user_id" render={ ({match}) =>
            <div>
              <div>
                <h3>Tasks Assigned</h3>
                <Tasks tasks={_.filter( this.state.tasks, (task) =>
                  match.params.user_id == task.designer.id )
                } />
              </div>
              <div>
                <h3>Tasks To Do</h3>
                <Tasks tasks={_.filter( this.state.tasks, (task) =>
                  match.params.user_id == task.worker.id )
                } />
              </div>
            </div>
          } />
        </div>
      </Router>
    );
  }
}
