import React from 'react';

const Task = ({ name, description, category, onSelect }) => {
  return (
    <div className="text-white p-2 bg-auto m-4 max-w-sm rounded-md bg-gray-400" onClick={() => onSelect({name})}>
      <p className="text-lg font-bold">{name}</p>
      <p className="text-sm">Description: {description}</p>
      <p className="text-sm">Category: {category}</p>
    </div>
  );
};

export default Task;