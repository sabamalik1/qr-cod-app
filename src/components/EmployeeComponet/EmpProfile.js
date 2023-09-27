import React from "react";

function EmpProfile({ date, inTime, outTime, status, name, email }) {
  return (
    <div className="flex flex-col text-center justify-center  background px-8 py-8 ">
      <div className="bg-white p-5 rounded-lg shadow-lg mb-5 w-[500px] h-[200px] ">
        <div className="text-center font-semibold mb-3">{date}</div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-semibold">In-Time:</div>
          <div className="text-sm">{inTime}</div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-semibold">Out-Time:</div>
          <div className="text-sm">{outTime}</div>
        </div>
        <div className="text-center font-semibold mt-2">{status}</div>
      </div>
      <div className=" p-5 rounded-lg shadow-lg mb-5 w-[500px] h-[200px] mt-44 bg-purple-600 ">
        <div className="flex items-center mb-2">
          {/* <img
          src="@drawable/profile"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        /> */}
          <div className="ml-3">
          <div className="text-sm font-semibold">name:</div>
            <div className="text-lg font-semibold text-indigo-800">{name}</div>
          </div>
          <div/>
        </div>
        <div className="text-sm font-semibold">email:</div>
        <div className="text-indigo-600">{email}</div>
        <div/>
      </div>
    </div>
  );
}

export default EmpProfile;
