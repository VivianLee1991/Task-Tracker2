import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api';
import Task from './task';

class DesignerTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false // true iff the page is going to redirect to tasks page.
    }

    this.update = this.update.bind(this);
    this.edit = this.edit.bind(this);
    this.delete_task = this.delete_task.bind(this);
    this.clear_form = this.clear_form.bind(this);
  }

  update(ev) {
    let target = $(ev.target);
    let data = {};

    data[target.attr('name')] = target.val();
    let action = {
      type: 'UPDATE_DESIGNER_FORM',
      data: data,
    };
    this.props.dispatch(action);
  }

  edit(ev) {
    let target = $(ev.target);
    let task_id = target.val();
    api.edit_task(this.props.designer_form, task_id);
  }

  delete_task(ev) {
    let target = $(ev.target);
    let task_id = target.val();
    api.delete_task(task_id);
    this.setState({
      redirect: true
    });
  }

  clear_form(ev) {
    this.props.dispatch({
      type: 'CLEAR_DESIGNER_FORM',
    });
  }

  render() {
    let task_id = this.props.task_id;
    let [task] = _.filter(this.props.tasks, (tt) => tt.id == task_id);
    let users = _.map(this.props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
    const { redirect } = this.state;

    return (
    <div style={{padding: "4ex"}}>
      <div>
        <h3>Task Details</h3>
        <Task task={task} />
      </div>
      <div>
        <h3>Edit Task</h3>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="textarea" name="title" value={this.props.designer_form.title} onChange={this.update} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" value={this.props.designer_form.description} onChange={this.update} />
        </FormGroup>
        <FormGroup>
          <Label for="worker_id">Worker</Label>
          <Input type="select" name="worker_id" value={this.props.designer_form.worker_id} onChange={this.update}>
            { users }
          </Input>
        </FormGroup>
        <Button onClick={this.edit} value={task_id} color="primary">Submit Changes</Button> &nbsp;
        <Button onClick={this.delete_task} value={task_id} color="danger">Delete</Button> &nbsp;
        <Button onClick={this.clear_form}>Clear</Button>
      </div>
      { redirect && (<Redirect to={'/tasks'} />)}
    </div>
    );
  }
}

function state2props(state) {
  return {
    users: state.users,
    tasks: state.tasks,
    designer_form: state.designer_form,
  };
}

export default connect(state2props)(DesignerTaskForm);
