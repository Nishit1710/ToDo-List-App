import React from 'react';

const TodoItem = () => {
  return (
    <li className="border-b py-2 flex items-center justify-between">
      <span className="text-lg">Task 1</span>
      <button className="text-red-600 hover:text-red-800">Delete</button>
    </li>
  );
};

export default TodoItem;
