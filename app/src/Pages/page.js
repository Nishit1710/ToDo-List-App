"use client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Assuming you're using React Router for navigation

const AddTaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() === "" || taskCategory.trim() === "") return;

    const newTask = {
      id: Date.now(), 
      name: taskName.trim(),
      description: taskDescription.trim(),
      category: taskCategory.trim(),
    };

    // Pass the new task to the parent component
    onAddTask(newTask);

    // Navigate to the TaskView page
    history.push("/taskview");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Category"
        value={taskCategory}
        onChange={(e) => setTaskCategory(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
