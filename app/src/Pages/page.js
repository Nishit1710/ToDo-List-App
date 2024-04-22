"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../_utils/firebase"; // Import Firebase database instance

const AddTaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");

  const handleAddTask = async () => {
    if (taskName.trim() === "" || taskCategory.trim() === "") return;

    const newTask = {
      name: taskName.trim(),
      description: taskDescription.trim(),
      category: taskCategory.trim(),
    };

    try {
      // Add the new task to the "tasks" collection in Firestore
      const docRef = await addDoc(collection(db, "tasks"), newTask); // Use "tasks" collection based on your Firestore rules
      // Pass the new task to the parent component
      onAddTask(newTask);
      console.log("Document written with ID: ", docRef.id);
      
      // Reset form fields
      setTaskName("");
      setTaskDescription("");
      setTaskCategory("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
