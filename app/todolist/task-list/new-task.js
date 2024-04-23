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
        <main className="flex justify-center m-4 text-black align-center">
            <div>
                <form onSubmit={handleSubmit} className="bg-gray-400 p-6 rounded-md w-full max-w-96. ">
                <div className="m-2 text-black rounded-md bg-gray-100">
                        <input required onChange={handleNameChange} value={name} type="text" placeholder="Task Name"
                            className="w-full border border-gray-300 p-5  rounded-md"
                        />
                    </div> 
                    <div className="m-2 text-black rounded-md bg-gray-100">
                        <textarea
                    name="description"
                    value= {description}
                    onChange={handleDescriptionChange}
                    className="w-full border border-gray-300 p-14 rounded-md"
                    placeholder="Task Description"
                    />

                     </div>
                    <div>
                    <select value={category} onChange={handleCategory} className="mt-1 p-2 w-full rounded-md bg-gray-100">
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