import React from 'react';

const TodoForm = () => {
  return (
    <div className="mb-4">
      <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Add a new task"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
