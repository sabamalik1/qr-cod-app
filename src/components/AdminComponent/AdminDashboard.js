import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../AuthContext";

export default function AdminDashboard() {
 const {handleSignout} = useAuth()
  return (
    <>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <nav className="bg-purple-800 w-64 py-4 px-2 space-y-4">
          <div className="flex items-center justify-between px-4">
            <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-purple-200">
                DigiAdmin
              </h1>
            </div>
            {/* <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            /> */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:bg-purple-800"
                onClick={() => {
                  // Toggle sidebar visibility for mobile
                }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/* Add your menu icon */}
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <a
              href="#"
              className="bg-purple-900 text-white px-4 py-2 rounded-md block"
            >
              Admin Dashboard
            </a>
            <Link
              to="/employees"
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              Employees
            </Link>
            <Link
              to="/qrCode"
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              QR Code
            </Link>
            <a
              href="#"
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              Profile
            </a>
            <button
              onClick={handleSignout}
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Navigation Bar */}
          <header className="bg-gray-100 shadow p-4">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </header>

          {/* Page Content */}
          <main className="py-6 px-4">
            {/* Your content goes here */}
            <div className="flex flex-row gap-8 ">
              <div className="px-4 py-4 drop-shadow-md md:drop-shadow-xl border-2 w-48 items-center justify-center rounded-md ">
                <div className="text-xl px-2 py-2 font-sans ml-6   ">
                  Total Employees
                </div>
                <div></div>
                <div className="items-center justify-center  ml-16">30</div>
              </div>
              <div className="px-4 py-4 drop-shadow-md md:drop-shadow-xl border-2 w-48 items-center justify-center rounded-md ">
                <div className="text-xl px-2 py-2 font-sans ml-6   ">
                  Total Attendance
                </div>
                <div className="items-center justify-center  ml-16">15</div>
              </div>
              <div className="px-4 py-4 drop-shadow-md md:drop-shadow-xl border-2 w-48 items-center justify-center rounded-md ">
                <div className="text-xl px-2 py-2 font-sans ml-6   ">
                  Absent Employees
                </div>
                <div className="items-center justify-center  ml-16">15</div>
              </div>
              <div className="px-4 py-4 drop-shadow-md md:drop-shadow-xl border-2 w-48 items-center justify-center rounded-md ">
                <div className="text-xl px-2 py-2 font-sans ml-6   ">
                  Employee's Leaves
                </div>
                <div className="items-center justify-center  ml-16">5</div>
              </div>
            </div>
            
          </main>
        </div>
      </div>
    </>
  );
}

// import React from 'react'

// function AdminDashboard() {
//   return (
//     <div>AdminDashboard
//       <div className="btm-nav">
//   <button>
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
//   </button>
//   <button className="active">
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//   </button>
//   <button>
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
//   </button>
// </div>
//     </div>
//   )
// }

// export default AdminDashboard
