import React from "react";

const Task = ({ task }) => {
  return (
    <div>
      <h2>Task Details:</h2>
      <p><strong>Name:</strong> {task.name}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Category:</strong> {task.category}</p>
    </div>
  );
};

export default Task;
