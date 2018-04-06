import React from 'react';
import { Link } from 'react-router-dom';

function WorkerTask(params) {
  //console.log(params.task);
  return <p>{params.task.title} - <Link to={"/tasks/" + params.task.id + "/working"}>Details</Link></p>;
}

export default function WorkerTasks(params) {
  let current_user = 0;
  if (params.token) {
    current_user = params.token.user_id;
  }
  //console.log(current_user);

  let tasks_working = _.filter(params.tasks, (tt) => tt.worker.id == current_user);
  //console.log(tasks_working);
  let tasks_display = _.map(tasks_working, (tt) => <WorkerTask key={tt.id} task={tt} />);

  return (
    <div style={{padding: "4ex"}}>
      <h3>Tasks To Do</h3>
      { tasks_display }
    </div>
  );
}
