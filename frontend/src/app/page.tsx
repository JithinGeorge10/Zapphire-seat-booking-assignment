import React from 'react'
import Link from 'next/link';
function page() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br bg-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gray-800">
          Welcome to Ticket booking app 🎟️
        </h1>
       
        <div className="flex gap-6">
          <Link href="/user/login">
            <button className=" border rounded-2xl dark:border-black border-transparent transition-colors flex items-center justify-center  text-green-500 gap-2  text-sm sm:text-base h-12 px-6 sm:px-8 shadow-lg hover:shadow-xl">
              Login
            </button>
          </Link>
          <Link href="/user/signup">
            <button className="rounded-2xl border text-yellow-500  dark:border-black transition-colors flex items-center justify-center bg-transparent   gap-2   text-sm sm:text-base h-12 px-6 sm:px-8 shadow-lg hover:shadow-xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default page
