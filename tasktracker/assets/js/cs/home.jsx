import React from 'react';
import Task from './task';


export default function Home(params) {
  let tasks = _.map(params.tasks, (tt) =>
    <Task key={tt.id} task={tt} />);

  return (
    <div style={{padding: "4ex"}}>
      <h2>All Tasks</h2>
      { tasks }
    </div>
  );
}
