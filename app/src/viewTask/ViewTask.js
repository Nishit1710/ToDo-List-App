import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import Task from "./task";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Task Page</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskPage;
