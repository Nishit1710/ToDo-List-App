"use client"

import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { getTask,addTask } from '../_services/task-list-service';
export default function NewTaskForm({onAddTask}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [category, setCategory]  = useState("") 

    const handleNameChange = (event) => {
            setName(event.target.value)
    };

    const handleDescriptionChange =(event) =>
        {setDescription(event.target.value)
    };
    
    const handleCategory =(event) =>
        {setCategory(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Create the new task object
        const newTask = {
            name: name,
            description: description,
            category: category
        };
    
        try {
            // Call the addTask function to add the new task to Firestore
            // Call the onAddTask function passed as a prop to notify the parent component
            onAddTask(newTask);
            // Reset form fields
            setName("");
            setDescription("");
            setCategory(""); // Set default category or choose an appropriate default value
            await addTask(user.uid, newTask);
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error if needed
        }
    };
    
    return (
        <main className="flex m-4">
            <div>
                <form onSubmit={handleSubmit}>
                <div className="mb-4 text-black">
                        <input required onChange={handleNameChange} value={name} type="text" placeholder="Task Name"
                            className="mt-1 p-2 w-full rounded-md bg-gray-100"
                        />
                    </div>
                    <div className="flex justify-between text-black">
                        <input required onChange={handleDescriptionChange} value={description} type="text" placeholder="Description"
                            className="mt-1 p-2 block w-full rounded-md bg-gray-100"
                        />
                    <select value={category} onChange={handleCategory} className="ml-1 border-2 border-gray-100 p-2 rounded-md">
                        <option value="Personal">Personal</option>
                        <option value="fitness">Fitness</option>
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                        <option value="other">Other</option>
                    </select>
                    </div >
                    <button className="mt-4 w-full py-2 px-4 bg-sky-600 hover:bg-sky-500 rounded-md text-white"
                        type="submit">
                        Add Task 
                    </button>
                </form>
            </div>
        </main>
    )
}
