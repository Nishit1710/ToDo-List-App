"use client";
// Import React
import { useUserAuth } from "./_utils/auth-context";
import { useEffect, useState } from "react";
import { db } from "./_utils/firebase"; // Import your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions
import Link from "next/link"; // Import the Link component from Next.js
import { getTasks, deleteTask } from "./_services/task-list-service";

// Page Component
const Page = () => {
  // Destructure user, gitHubSignIn, and firebaseSignOut from useUserAuth hook
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  // State to manage tasks
  const [tasks, setTasks] = useState([]);

  // Load tasks on user change
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  // Function to load tasks
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
    <div className="relative h-screen flex justify-center items-center bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?cs%3Dsrgb%26dl%3Dpexels-content-pixie-2736499.jpg%26fm%3Djpg')"}}>
    {user ? (
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-4">Welcome {user?.displayName}</h1>
          <p className="text-lg mb-2">Let's create your Todo Lists</p>
          <button onClick={firebaseSignOut} className="absolute top-4 right-4 border-2 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Logout
          </button>
          <div className="flex mt-4">
            <Link href="../todolist/task-list">
              <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer mr-4">
                Add Tasks
              </span>
            </Link>
            <Link href="../todolist/view-tasks">
              <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                View Tasks
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <button onClick={gitHubSignIn} className="border-2 m-2 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login with GitHub
        </button>
      )}
    </div>
  );
};

export default Page;