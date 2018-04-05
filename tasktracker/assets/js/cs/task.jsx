import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';


export default function Task(params) {
  let task = params.task;
  let complete;
  if (task.complete) {
    complete = "Yes";
  } else {
    complete = "No";
  }

  return (
    <div style={{padding: "1ex"}}>
      <Card>
        <CardBody>
          <CardTitle>{ task.title }</CardTitle>
          <p>Designer:  { task.designer.name }</p>
          <p>Worker:    { task.worker.name }</p>
        </CardBody>
        <CardBody>
          <CardText>{ task.description }</CardText>
        </CardBody>
        <CardBody>
          <p>Complete?: { complete }</p>
          <p>Time Spent: { task.time } minutes</p>
        </CardBody>
      </Card>
    </div>
  );
}
