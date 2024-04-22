"use client";
import React, { useState } from "react";

const AddTaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(), // Using timestamp as a unique ID
      name: taskName.trim(),
    };

    onAddTask(newTask); // Pass the new task to the parent component
    setTaskName(""); // Clear the input field
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
