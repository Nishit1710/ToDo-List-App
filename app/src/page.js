"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, googleSignIn, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {user ? (
        <div className="max-w-md w-full space-y-8">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome, {user.displayName}</h1>
        
          <p className="mt-2 text-center text-sm text-gray-600">Your email is {user.email}</p>
          <Link href="/src/shoping-list" className="text-indigo-600 hover:text-indigo-500"> 
              Visit Your Shopping List
          </Link>
          <Link href="/src/Pages" className="text-indigo-600 hover:text-indigo-500"> 
              Visit Your To Do List
          </Link>
          <button onClick={firebaseSignOut} className="text-indigo-600 hover:text-indigo-500">Sign Out</button>
        </div>
      ) : (
        <button 
          onClick={gitHubSignIn} 
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign In with GitHub
        </button>
      )}
    </div>
  );
}