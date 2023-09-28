import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../AuthContext";
import {
  faUsers,
  faUserTimes,
  faUserCheck,
  faQrcode,
  faUserPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TotalEmployees from "./TotalEmployees";

export default function AdminDashboard({ totalUsers }) {
  const { handleSignout } = useAuth();
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
              <FontAwesomeIcon icon={faUsers} className="mr-2" /> Employees
            </Link>
            <Link
              to="/qrCode"
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              <FontAwesomeIcon icon={faQrcode} className="mr-2" /> QR Code
            </Link>
            <Link
              to={"/addEmployee"}
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Add
              Employee
            </Link>
            <Link
              to={"/totaluser"}
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Total Employees
            </Link>
            <button
              onClick={handleSignout}
              className="text-gray-300 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-md block"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Navigation Bar */}
          <header className="bg-gray-100 shadow p-4">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-3xl font-bold text-purple-900">Dashboard</h1>
            </div>
          </header>

          {/* Page Content */}
          <main className="py-2 px-2">
            <div className="flex flex-row  ">
              <div className="w-[420px] h-[200px] ">
                <TotalEmployees totalUsers={totalUsers} />
              </div>
              <div className="w-[420px] h-[200px] ">
                <div className="flex text-center justify-center  background px-3 py-3 ">
                  <div className=" p-5 rounded-lg shadow-lg mb-5 w-[500px] h-[200px] background bg-purple-800  ">
                    <FontAwesomeIcon
                      icon={faUserTimes}
                      className="text-3xl text-center justify-center font-extrabold text-slate-100 mt-10"
                    />
                    <p className="text-3xl  text-center justify-center font-extrabold text-slate-100  ">
                      Absent Employees: 4
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[420px] h-[200px] ">
                <div className="flex text-center justify-center  background px-3 py-3  ">
                  <div className=" p-5 rounded-lg shadow-lg mb-5 w-[500px] h-[200px] background bg-fuchsia-700  ">
                    <FontAwesomeIcon
                      icon={faUserCheck}
                      className="text-3xl text-center justify-center font-extrabold text-slate-100 mt-10"
                    />
                    <p className="text-3xl  text-center justify-center font-extrabold text-slate-100  ">
                      Total Presents: 25
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
