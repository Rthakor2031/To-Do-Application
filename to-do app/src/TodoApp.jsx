import React, { useState } from 'react';
import './App.css';  // Import the CSS file

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (isEditing) {
        const updatedTasks = tasks.map((t, index) =>
          index === currentTaskIndex ? task : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, task]);
      }
      setTask('');
    }
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const deletedTask = tasks[index];
    setTasks(updatedTasks);
    setDeletedTasks([...deletedTasks, deletedTask]);
  };

  return (
    <div className="todo-container">
      <h3>Todo Application / Task Management</h3>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deletedTasks.length > 0 && (
        <table className="deleted-todo-table">
          <thead>
            <tr>
              <th>Deleted Task</th>
            </tr>
          </thead>
          <tbody>
            {deletedTasks.map((task, index) => (
              <tr key={index}>
                <td>{task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoApp;
