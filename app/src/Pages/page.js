"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../_utils/firebase"; // Import Firebase database instance
import { useUserAuth } from "../_utils/auth-context"; // Import the custom hook for user authentication

const AddTaskForm = ({ onAddTask }) => {
  const { user } = useUserAuth(); // Get the current user from the authentication context
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [error, setError] = useState(null);

  const handleAddTask = async () => {
    if (!user) {
      setError("Please sign in to add tasks."); // Display error if user is not signed in
      return;
    }

    if (taskName.trim() === "" || taskCategory.trim() === "") {
      setError("Task name and category are required."); // Display error if task name or category is empty
      return;
    }

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
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("An error occurred while adding the task. Please try again later.");
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
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error message if there's an error */}
    </div>
  );
};

export default AddTaskForm;
