import { async } from "q";

class ToDoListAPI {
  static fetchTasks = async () => {
    try {
      let response = await fetch(`http://localhost:3001/tasks`);
      return response.json();
    }
    catch (err) { console.error(err) };
  };

  static fetchCreate = async (title) => {
    await fetch(`http://localhost:3001/tasks`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: { title: title, done: false }
        })
      }
    )
  };

  static fetchCheck = async (task) => {
    try {
      await fetch(`http://localhost:3001/tasks/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            task: { done: true }
          })
        }
      )
    }
    catch (err) { console.error(err) };
  };

  static fetchDelete = async (task) => {
    try {
      await fetch(`http://localhost:3001/tasks/${task.id}`, { method: 'DELETE' });
    }
    catch (err) { console.error(err) }
  };

  static fetchDeleteAll = async (tasks_id) => {
    tasks_id.forEach(async (id) => {
      await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' });
    });
  }
};

export default ToDoListAPI;
