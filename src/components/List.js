import React, { Component } from 'react';
import ToDoListAPI from '../services/ToDoListAPI'

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class List extends Component {

  checkTask = async (task) => {
    await ToDoListAPI.fetchCheck(task);

    this.props.loadTasks();
  }

  deleteTask = async (task) => {
    if (window.confirm(`Are you sure you want to delete: "${task.title}"`)) {
      await ToDoListAPI.fetchDelete(task);

      this.props.loadTasks();
    }
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Table responsive>
              <tbody>
                {this.props.tasks.map((task, index) => {
                  return <tr key={task.id}>
                    <td className="col-md-10">{task.title}</td>
                    <td>
                      {
                        task.done === false
                          ? <a className="check" href="#">
                            <FontAwesomeIcon icon="check-circle" onClick={() => this.checkTask(task)} size='lg' />
                          </a>
                          : null
                      }
                    </td>
                    <td>
                      <a className="delete" href="#" onClick={() => this.deleteTask(task)}>
                        <FontAwesomeIcon icon="trash-alt" />
                      </a>
                    </td>
                  </tr>;
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default List;
