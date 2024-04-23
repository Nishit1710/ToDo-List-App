import Link from 'next/link'

export default function Page() {
  return (
    <main className=' flex flex-col items-center justify-center text-center min-h-screen '>
      <h1 className=' text-center width-half rounded-md mb-4 text-blue-300 text-4x1 font-bold'>CPRG-306: Web-Dev Final Assignment</h1>
      <div className ='flex-col max-w-sm p-2'>
        <p className='font-bold font-bold rounded-full px-24 py-1 m-1 hover:bg-teal-200 hover:text-black'><Link href="todolist">View Our To-Do List</Link></p>
      </div>
    </main>
  );
};