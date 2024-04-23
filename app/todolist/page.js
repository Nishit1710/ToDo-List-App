"use client";
import { useUserAuth } from "./_utils/auth-context";
import { useEffect, useState } from "react";
import { db } from "./_utils/firebase"; // Import your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions
import Link from "next/link"; // Import the Link component from Next.js
import { getTasks , deleteTask} from "./_services/task-list-service";

const Page = () => {
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
    {user ? (
      <div className="m-40 text-center width-half rounded-md mb-4 text-blue-300 text-4x1 font-bold">
        <h1 className="font-bold">Welcome {user.Name}</h1>
        <p>Email: {user.email}</p>
        <button onClick={firebaseSignOut} className="border-2 m-2 p-1 bg-[#1da1f2] text-white rounded-md">
          Logout
        </button>
        <div>
          <h2>Tasks:</h2>
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
        <p className="mt-4">
        <Link href="../todolist/task-list">
  <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
    Go to Add List
  </span>
</Link>

        </p>
      </div>
    ) : (
      <button onClick={gitHubSignIn}>Login with GitHub</button>
    )}
  </div>
);
};

export default Page;