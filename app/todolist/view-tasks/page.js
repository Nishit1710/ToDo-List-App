"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getTasks, deleteTask } from "../_services/task-list-service";
import Link from "next/link";

const viewTasks = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/4238511/pexels-photo-4238511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"}}>
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-4 text-black">Tasks to complete</h1>
        <div className="flex flex-wrap justify-center">
          {tasks.map((task) => (
            <div key={task.id} className="box-border w-64 p-4 bg-gray-200 rounded-md m-4 shadow-md">
              <ul>
                <li className="font-bold">Name: {task.name}</li>
                <li>Description: {task.description}</li>
                <li>Category: {task.category}</li>
              </ul>
              <button onClick={() => deleteTask(user.uid, task.id)} className="border-2 m-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default viewTasks;