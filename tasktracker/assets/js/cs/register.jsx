import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function Register(props) {

  function updateRegister(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function register(ev) {
    api.submit_register(props.register);
  }

  return (
    <div className="center-block" style={{padding: "4ex"}}>
      <h2>Register New Account</h2>
      <FormGroup>
        <Label for="name">Username:</Label>
        <Input type="text" name="name" placeholder="username" value={props.register.name} onChange={updateRegister} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input type="email" name="email" placeholder="user@email.com" value={props.register.email} onChange={updateRegister} />
      </FormGroup>
      <FormGroup>
        <Label for="password1">Password:</Label>
        <Input type="password" name="password1" value={props.register.password1} onChange={updateRegister} />
      </FormGroup>
      <FormGroup>
        <Label for="password2">Enter password again:</Label>
        <Input type="password" name="password2" value={props.register.password2} onChange={updateRegister} />
      </FormGroup>
      <div class="text-center">
        <Button onClick={register} class="center-block" color="primary">Register</Button>
      </div>
    </div>
  );
}


function state2props(state) {
  return {
    register: state.register,
  };
}

export default connect(state2props)(Register);
