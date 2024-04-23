import React from 'react';
import Task from './task';

const TaskList = ({ tasks, onItemSelect }) => {
  return (
    <main>
      <div>
        <ul>
          {tasks.map((task, index) => (
            <Task key={index} {...task} onSelect={onItemSelect} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default TaskList;
