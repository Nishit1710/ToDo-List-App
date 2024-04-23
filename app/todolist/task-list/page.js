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
        setTasks(prevTasks => {
            const Tasks = Array.isArray(prevTasks) ? prevTasks : [];
            return [...prevTasks, newTaskWithId];
        });
        try {
            await addTask(user.uid, newTaskWithId);
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error if needed
        }
    }

    return (
        user ? (
            <main>
                <h1 className='text-4xl font-bold text-center m-4'>Todo List</h1>
                <div className='flex flex-row'>
                    <ul>
                        <NewTaskForm onAddTask={handleAddTask} className="" />
                        
                    </ul>
                </div> 
                <div>
          <h2>Tasks:</h2>
          <div className="flex flex-wrap justify-center">
            {tasks.map(task => (
              <div key={task.id} className="box-border w-64 p-4 bg-gray-200 text-blue-900 rounded-md m-4 shadow-md">
                <ul>
                  <li className="font-bold">Name: {task.name}</li>
                  <li className="text-blue-900 ">Description: {task.description}</li>
                  <li>Category: {task.category}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
  
            </main>
        ) : (
            <p>Sign in to view your todo list.</p>
        )   
    ); 
}
