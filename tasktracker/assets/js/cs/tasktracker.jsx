import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Navigation from './navigation';
import Users from './users';
import Tasks from './tasks';
import TaskForm from './taskform';

export default function tasktracker_init(store) {
  let root = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker state={store.getState()} />
    </Provider>,
    root
  );
}

let Tasktracker = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Navigation />
        <Route path="/" exact={true} render={ () =>
          <div>
            <TaskForm />
            <Tasks tasks={props.tasks} />
          </div>
        } />
        <Route path="/users" exact={true} render={ () =>
          <Users users={props.users} />
        } />
        <Route path="/users/:user_id" render={ ({match}) =>
          <div>
            <h2>
            {_.map(_.filter(props.users, (user) =>
             match.params.user_id == user.id), (uu) => uu.name)}
            </h2>
            <div>
              <h3>Tasks Assigned</h3>
              <Tasks tasks={_.filter( props.tasks, (task) =>
                match.params.user_id == task.designer.id )
              } />
            </div>
            <div>
              <h3>Tasks To Do</h3>
              <Tasks tasks={_.filter( props.tasks, (task) =>
                match.params.user_id == task.worker.id )
              } />
            </div>
          </div>
        } />
      </div>
    </Router>
  );
});
