export default function Page() {
    return(
      <main className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center text-black" style={{ backgroundColor: '#FDF5E6'}}>
        <div className="grid grid-cols-1 items-start text-center mt-20">
          <h1 className="text-4xl font-extrabold mb-3" style={{ backgroundColor: '#ADD8E6' }}> CPRG-306- Final Project</h1>
          
          <li className="text-black hover:text-purple-400 hover:underline mb-3" style={{ backgroundColor: '#ADD8E6', borderRadius: '10px', padding: '10px', boxShadow: '0 50px 50px 0 rgba(0, 0, 0, 0.2)' }}>
            <a href="/src">Visit Our Assignment</a>
          </li>
        </div>
      </main>
    );
  };