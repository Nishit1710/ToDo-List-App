import React from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <ul>
        <TodoItem />
        {/* Additional TodoItem components can be added here */}
      </ul>
    </div>
  );
};

export default TodoList;
