import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Task from './task';

function DesignerTaskForm(props) {

  function update(ev) {
    let target = $(ev.target);
    let data = {};

    data[target.attr('name')] = target.val();
    let action = {
      type: 'UPDATE_DESIGNER_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function edit(ev) {
    let target = $(ev.target);
    let task_id = target.val();
    api.edit_task(props.designer_form, task_id);
  }

  function delete_task(ev) {
    let target = $(ev.target);
    let task_id = target.val();
    api.delete_task(task_id);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_DESIGNER_FORM',
    });
  }

  if (props.token == null) {
    return <p></p>;
  }

  let current_user = props.token.user_id;
  let tasks_designed = _.filter(props.tasks, (tt) => {tt.designer_id == current_user;});

  // worker options:
  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);

  let tasks_display = _.map(tasks_designed, (task) =>
    <div style={{padding: "4ex"}}>
      <Task task={task} />
      <h3>Edit Task</h3>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="textarea" name="title" value={props.designer_form.title} onChange={update} />
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" value={props.designer_form.description} onChange={update} />
      </FormGroup>

      <FormGroup>
        <Label for="worker_id">Worker</Label>
        <Input type="select" name="worker_id" value={props.designer_form.worker_id} onChange={update}>
          { users }
        </Input>
      </FormGroup>

      <Button onClick={edit} value={task.id} color="primary">Submit</Button> &nbsp;
      <Button onClick={delete_task} value={task.id} color="danger">Delete</Button> &nbsp;
      <Button onClick={clear}>Clear</Button>
    </div>);

  return <div>{ tasks_display }</div>;
}

function state2props(state) {
  return {
    users: state.users,
    tasks: state.tasks,
    token: state.token,
    designer_form: state.designer_form,
  };
}

export default connect(state2props)(DesignerTaskForm);
