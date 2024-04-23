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
            <ul className="space-y-4">
              <li>
                <input
                  name="name"
                  defaultValue={currentTask.name}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Task Name"
                />
              </li>
              <li>
                <textarea
                  name="description"
                  defaultValue={currentTask.description}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Task Description"
                />
              </li>
              <li>
                <select
                  name="category"
                  defaultValue={currentTask.category}
                  className="w-full border border-gray-300 p-2 rounded-md"
                >
                  <option value="Personal">Personal</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Other">Other</option>
                </select>
              </li>
            </ul>
            <div className="mt-4">
              <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>        ) : (
          <div className="flex flex-wrap justify-between max-w-6xl mx-auto">
            {tasks.map(task => (
              <div key={task.id} className="w-64 p-4 border bg-violet-300 rounded-md m-2">
                <p className="font-bold mb-2">{task.name}</p>
                <p className="mb-2">{task.description}</p>
                <p className="mb-2">{task.category}</p>
                <div>
                  <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => {
                    setCurrentTask(task);
                    setIsEditing(true);
                  }}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default viewTasks;