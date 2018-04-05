import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api';
import Task from './task';

class WorkerTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false // true iff the page is going to redirect to tasks page.
    }

    this.update = this.update.bind(this);
    this.edit = this.edit.bind(this);
    this.clear_form = this.clear_form.bind(this);
  }

  update(ev) {
    let target = $(ev.target);
    let data = {};
    if (target.attr('name') == "complete") {
      if ($(target).is(':checked')) {
        data[target.attr('name')] = true;
      } else {
        data[target.attr('name')] = false;
      }
    }
    else {
      data[target.attr('name')] = target.val();
    }

    let action = {
      type: 'UPDATE_WORKER_FORM',
      data: data,
    };
    this.props.dispatch(action);
  }

  edit(ev) {
    let target = $(ev.target);
    let task_id = target.val();
    api.edit_task(this.props.worker_form, task_id);
  }

  clear_form(ev) {
    this.props.dispatch({
      type: 'CLEAR_WORKER_FORM',
    });
  }

  render() {
    let task_id = this.props.task_id;
    let [task] = _.filter(this.props.tasks, (tt) => tt.id == task_id);
    console.log(task);
    return (
    <div style={{padding: "4ex"}}>
      <div>
        <h3>Task Details</h3>
        <Task task={task} />
      </div>
      <div>
        <h3>Edit Task</h3>
        <FormGroup>
          <Label for="time">Time (minitues)</Label>
          <Input type="number" name="time" step="15" min="0" placeholder="0, 15, 30, 45 ..."
                 value={this.props.worker_form.time} onChange={this.update} />
        </FormGroup>
        <FormGroup>
          <Label for="complete">Complete?</Label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input type="checkbox" name="complete" value={this.props.worker_form.complete} onChange={this.update} />
        </FormGroup>
        <Button onClick={this.edit} value={task_id} color="primary">Submit Changes</Button> &nbsp;
        <Button onClick={this.clear_form}>Clear</Button>
      </div>
    </div>
    );
  }
}

function state2props(state) {
  return {
    tasks: state.tasks,
    worker_form: state.worker_form,
  };
}

export default connect(state2props)(WorkerTaskForm);
