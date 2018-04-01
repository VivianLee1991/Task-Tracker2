import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export default function TaskForm(params) {
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return (
    <div style={{padding: "4ex"}}>
      <h2>New Task</h2>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="textarea" name="title" />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" />
      </FormGroup>
      <FormGroup>
        <Label for="worker_id">Worker</Label>
        <Input type="select" name="worker_id">
          { users }
        </Input>
      </FormGroup>
      <Button onClick={() => alert("Submit a new task")}>Submit</Button>
    </div>
  );
}
