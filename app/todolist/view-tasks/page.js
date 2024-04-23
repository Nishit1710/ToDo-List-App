"use client";
// Import your Firebase configuration
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions
import Link from "next/link"; // Import the Link component from Next.js
import { useUserAuth } from "../_utils/auth-context";
import { getTasks , deleteTask} from "../_services/task-list-service";


const viewTasks = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
        loadTasks();
    }
}, [user ,]);

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
<div>
<h1>Tasks:</h1>
<div className="flex flex-wrap justify-center">
  {tasks.map(task => (
    <div key={task.id} className="box-border w-64 p-4 bg-gray-200 rounded-md m-4 shadow-md">
      <ul>
        <li className="font-bold">Name: {task.name}</li>
        <li>Description: {task.description}</li>
        <li>Category: {task.category}</li>
      </ul>
      <button onClick={() => deleteTask(user.uid, task.id)} className="border-2 m-2 p-1 bg-red-500 text-white rounded-md">
        Delete
      </button> 
    </div>
  ))}
</div>
</div>
)};

export default viewTasks;