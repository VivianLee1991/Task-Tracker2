import React from 'react';
import { Link } from 'react-router-dom';

function DesignerTask(params) {
  //console.log(params.task);
  return <p>{params.task.title} - <Link to={"/tasks/" + params.task.id}>Details</Link></p>;
}

export default function DesignerTasks(params) {
  let current_user = 0;
  if (params.token) {
    current_user = params.token.user_id;
  }
  //console.log(current_user);

  let tasks_designed = _.filter(params.tasks, (tt) => tt.designer.id == current_user);
  //console.log(tasks_designed);
  let tasks_display = _.map(tasks_designed, (tt) => <DesignerTask key={tt.id} task={tt} />);

  return (
    <div style={{padding: "4ex"}}>
      <h3>Tasks Designed</h3>
      { tasks_display }
    </div>
  );
}
