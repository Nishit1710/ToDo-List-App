"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getTasks, deleteTask, editTask } from "../_services/task-list-service";
import Link from "next/link";

const viewTasks = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  async function loadTasks() {
    try {
      const tasks = await getTasks(user.uid);
      setTasks(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      // Handle error if needed
    }
  }
  async function handleDelete(taskId) {
    try {
        await deleteTask(user.uid ,taskId);
        loadTasks(); // Refresh the tasks list after deletion
    } catch (error) {
        console.error(error);
    }
  }
  
  async function handleEdit(taskId, taskData) {
    try {
      await editTask(user.uid, taskId, taskData);
      loadTasks(); // Refresh the tasks list after editing
      setIsEditing(false); // Hide the form after editing
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/4238511/pexels-photo-4238511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"}}>
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-4 text-black">Tasks to complete</h1>
        <Link href="../todolist/task-list" className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Task
        </Link>

    {isEditing ? (
      <form onSubmit={(e) => {
        e.preventDefault();
        const newTaskName = e.target.elements.name.value;
        const newTaskDescription = e.target.elements.description.value;
        const newTaskCategory = e.target.elements.category.value;
        handleEdit(currentTask.id, { name: newTaskName, description: newTaskDescription, category: newTaskCategory });
      }}>
        <ul><li><input name="name" defaultValue={currentTask.name} /></li>
        <li><input name="description" defaultValue={currentTask.description} /></li>
        <li><select name="category" defaultValue={currentTask.category} className="ml-1 border-2 border-gray-100 p-2 rounded-md">
          <option value="Personal">Personal</option>
          <option value="Fitness">Fitness</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Other">Other</option>
        </select></li></ul>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    ) : (
      tasks.map(task => (
        <div key={task.id}>
          <p>{task.name}</p>
          <p>{task.description}</p>
          <p>{task.category}</p>
              <button onClick={() => {
                setCurrentTask(task);
                setIsEditing(true);
              }}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          ))
        )}
        </div></div>

  );
};

export default viewTasks;