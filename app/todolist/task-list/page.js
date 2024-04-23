'use client';
import { useUserAuth } from "../_utils/auth-context";
import React, { useState, useEffect } from 'react';

import NewTaskForm from "./new-task.js";
import { getTasks, addTask } from '../_services/task-list-service'; 
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
    const [tasks, setTasks] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState('');
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleTaskSelect = (task) => {
        const cleanedTaskName = (task && task.name) ? 
            task.name.split(',')[0].replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, '').trim() :
            '';
        setSelectedItemName(cleanedTaskName);
    };
    
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

    async function handleAddTask(newTask) {
        const newTaskWithId = { ...newTask, id: uuidv4() };
        try {
            await addTask(user.uid, newTaskWithId);
            setTasks(prevTasks => [...prevTasks, newTaskWithId]); // Add the new task to the state
            const newItemIndex = tasks.length; // Index of the newly added task
            const newItem = document.querySelector(`.grid.grid-cols-4 > div:nth-child(${newItemIndex + 1})`); // Fix the querySelector syntax
            newItem.classList.add("bg-gray-800", "rounded-md", "p-4", "text-white", "text-center", "mb-4"); // Add the CSS classes to the newly added task element
            newItem.style.borderRadius = '10px';
            newItem.style.padding = '10px';
            newItem.style.margin = '10px';
            newItem.style.boxShadow = '0 50px 50px 0 rgba(0, 0, 0, 0.2)';
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error if needed
        }
    }
    
    return (<div style={{ backgroundImage: "url('https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/960x0.jpg?height=474&width=711&fit=bounds')", backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    
      <main>
        <h1 className='text-4xl font-bold text-black text-center m-4'>To-do List</h1>
        <div className='flex'>
          <ul>
            <NewTaskForm onAddTask={handleAddTask} className="" />
          </ul>
        </div>
        </main>
    </div>
  
      );
      
    };