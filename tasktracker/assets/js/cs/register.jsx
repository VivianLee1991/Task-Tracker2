import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export default function Register(props) {

  return (
    <div>
      Register an Account
    </div>
  );
}

/*
function state2props(state) {
  return {
    users: state.users,
  };
}

export default connect(state2props)(Register);
*/
