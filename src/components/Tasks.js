import React, { Component } from 'react';
import ToDoListAPI from '../services/ToDoListAPI';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateTask from './CreateTask';
import Button from 'react-bootstrap/Button';

import List from './List';

class Tasks extends Component {
  state = {
    tasks: []
  };

  loadTasks = async () => {
    const tasks = await ToDoListAPI.fetchTasks();
    this.setState({ tasks });
  }

  async componentDidMount() {
    this.loadTasks();
  };

  removeAllTasks = async () => {
    window.confirm('Are you sure you want to remove all tasks?');

    const tasks_id = [];

    this.state.tasks.forEach(async (task) => {
      if (task.done === true) tasks_id.push(task.id);
    });

    await ToDoListAPI.fetchDeleteAll(tasks_id);

    this.loadTasks();
  };

  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="tasks-list">
          <p className="title">To-do</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done !== true)} />
          <CreateTask loadTasks={this.loadTasks} />
        </Col>
        <Col xs={{ span: 8, offset: 2 }} className="tasks-list">
          <p className="title">Done</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done === true)} />
          <Button
            variant="danger"
            className="float-right remove-task-btn"
            onClick={this.removeAllTasks}>Remove all tasks
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Tasks;
