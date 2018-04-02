import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function TaskForm(props) {

  function update(ev) {
    let target = $(ev.target);
    let data = {};

    data[target.attr('name')] = target.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_task(props.form);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return (
    <div style={{padding: "4ex"}}>
      <h2>New Task</h2>
      
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="textarea" name="title" value={props.form.title} onChange={update} />
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" value={props.form.description} onChange={update} />
      </FormGroup>

      <FormGroup>
        <Label for="worker_id">Worker</Label>
        <Input type="select" name="worker_id" value={props.form.worker_id} onChange={update}>
          { users }
        </Input>
      </FormGroup>

      <Button onClick={submit} color="primary">Submit</Button> &nbsp;
      <Button onClick={clear}>Clear</Button>
    </div>
  );
}

function state2props(state) {
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(TaskForm);
