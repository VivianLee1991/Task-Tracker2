import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem, Form, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => { // connect: connect state to a component's props
  function update(ev) {
    ev.preventDefault();
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    ev.preventDefault();
    api.submit_login(props.login);
  }

  return (
    <div className="navbar-text">
      <Form inline>
        <FormGroup>
          <Input type="email" name="email" placeholder="user@email.com"
                 value={props.login.email} onChange={update} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="pass" placeholder="password"
                 value={props.login.pass} onChange={update} />
        </FormGroup>
        <Button onClick={create_token} color="primary">Log In</Button>
      </Form>
    </div>
  );
});

let Session = connect(({token}) => {return {token};})((props) => { // grab the token field from the state.
  return (
    <div className="navbar-text">
      Logged in as: { props.token.user_name }
    </div>
  );
});

function Navigation(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  } else {
    session_info = <LoginForm />;
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <span className="navbar-brand">
        TaskTracker
      </span>

      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">
            Register
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/home" activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/tasks" activeClassName="active" className="nav-link">
            My Tasks
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">
            All Users
          </NavLink>
        </NavItem>
      </ul>
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Navigation);
