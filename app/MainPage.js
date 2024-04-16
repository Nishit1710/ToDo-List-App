import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const MainPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="w-96">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Your To-Do List</h2>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
