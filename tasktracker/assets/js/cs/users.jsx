import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return (
    <p>{params.user.name} - {params.user.email} - <Link to={"/users/" + params.user.id}>Related tasks</Link></p>
  );
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return (
    <div style={{padding: "4ex"}}>
      <h2>All Users</h2>
      { users }
    </div>
  );
}
