import React from 'react';
import Task from './task';


export default function Home(params) {
  let user_id = 0;
  if (params.token) {
    user_id = params.token.user_id;  // current user
  }

  let tasks = _.map(params.tasks, (tt) =>
    (<Task key={tt.id} task={tt} user_id={user_id}/>));

  return (
    <div>
      { tasks }
    </div>
  );
}
