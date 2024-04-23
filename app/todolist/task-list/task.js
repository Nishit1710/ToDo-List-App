import React from 'react';

const Task = ({ name, description, category, onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 rounded-md text-white text-center mb-4" 
         style={{ backgroundColor: 'hsl(0, 0%, 4%)', borderRadius: '10px', padding: '10px', margin: '10px', boxShadow: '0 50px 50px 0 rgba(0, 0, 0, 0.2)' }} 
         onClick={() => onSelect({name})}>
      <p className="text-lg font-bold">{name}</p>
      <p className="text-sm">Description: {description}</p>
      <p className="text-sm">Category: {category}</p>
    </div>
  );
};

export default Task;