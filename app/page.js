import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cover" style={{backgroundImage: "url('https://cdn.vectorstock.com/i/1000v/13/40/todo-list-seamless-pattern-universal-background-vector-7561340.jpg')"}}>
      <h1 className="text-4xl font-bold text-black mb-8">Manage your tasks with your Todo List</h1>
      <div className="flex flex-col max-w-sm p-2">
        <p className="font-bold rounded-full px-8 py-3 m-2 bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <Link href="/todolist">View Your To-Do List</Link>
        </p>
      </div>
    </main>
  );
};
