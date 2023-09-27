import React, { useEffect, useLayoutEffect, useState } from "react";
// import FetchEmpData from "./FetchEmpData";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const handleAddEmployeeClick = () => {
    navigate("/addEmployee"); // Navigate to the AddEmployee route
  };

  const convertTimestamp = (timestamp, option) => {
    let date;
    if (option === "firebase") {
      date = timestamp.toDate();
    } else {
      date = new Date(timestamp);
    }

    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + "/" + dd + "/" + yyyy;
    return date;
  };

  useEffect(() => {
    // Fetch employee data from Firestore
    const fetchEmployeeData = async () => {
      try {
        const employeeCollectionRef = collection(db, "users");
        const empQuerySnapshot = await getDocs(employeeCollectionRef);

        const empData = [];
        empQuerySnapshot.forEach((doc) => {
          // Extract employee information from Firestore document
          // const employeeInfo = doc.data();
          empData.push({
            ...doc.data(),
          });
        });
        // console.log("Employee Data:", empData);
        // Fetch attendance data from Firestore
        const attendanceCollectionRef = collection(db, "attendance");
        const attendanceQuerySnapshot = await getDocs(attendanceCollectionRef);

        const attendanceData = {};
        attendanceQuerySnapshot.forEach((doc) => {
          const uid = doc.id.split("_")[0];
          if (attendanceData[uid]) {
            attendanceData[uid] = {
              ...attendanceData[uid],
              dates: attendanceData[uid].dates.push(doc.data().dates),
            };
          } else {
            attendanceData[uid] = doc.data();
          }
        });

        console.log("Attendance Data:", attendanceData);
        console.log("Employee Data:", empData);

        // Combine employee data and attendance data

        // const empData = [];
        const newEmpData = empData.map((employee, index) => {
          // console.log(
          //   "employee attendance data:",
          //   attendanceData[employee.uid]
          // );
          const isPresent = attendanceData[employee.uid]?.dates.some(
            (entry) =>
              convertTimestamp(entry.date, "firebase") ===
              convertTimestamp(Date.now())
          );

          if (isPresent) {
            empData[index].isPresent = isPresent;
            console.log("Attendance for", empData);
            return empData[index];
          }

          // Filter attendance dates for the current month with status "Present"
          // const currentMonth = new Date().getMonth() + 1; // +1 because getMonth() returns a zero-based index (0 for January)
          // const presentDates = (attendance?.length || []).filter(
          //   (dateEntry) => {
          //     // console.log("date entry",dateEntry )
          //     const date = dateEntry.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
          //     // console.log("current month ", currentMonth);
          //     // console.log("date:", date);
          //     return (
          //       date.getMonth() + 1 === currentMonth &&
          //       dateEntry.status === "Present"
          //     );
          //   }
          // );

          // Calculate attendance count
          // const attendanceCount = presentDates.length;
          // console.log("Attendance count", attendanceCount);
        });
        console.log(newEmpData);
        setEmployeeData(empData);

        // Set the employee data and mark loading as false

        // setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  // useEffect(() => {
  //   console.log("employeeData Changed:", employeeData);
  // }, [employeeData]);

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex flex-row px-2 py-2 justify-between">
          <h1 className="text-2xl font-semibold mb-4">Employees Information</h1>
          <button
            type="submit"
            onClick={handleAddEmployeeClick}
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Employee
            {/* <Navigate to="/addEmployee" /> */}
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Attendance</th>
            </tr>
          </thead>
          <tbody className="gap-4  ">
            {/* <tr className="border border-gray-300 p-2">
              <td className="border border-gray-300 p-2"> saba</td>
              <td className="border border-gray-300 p-2"> saba@gmail.com</td>
            </tr> */}
            {employeeData.map((employee) => (
              <tr key={employee.id} className="border border-gray-300 gap-4 ">
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">{employee.email}</td>
                <td className="border border-gray-300 p-2">
                  {employee.attendanceCount}
                </td>

                {/* <td className="border border-gray-300 p-2">
                  <ul className="list-disc ml-4">
                    {employee.attendance.dates.map((attendanceEntry) => (
                      <li key={attendanceEntry.date} className="mb-2">
                        <span className="font-semibold">Date:</span>{" "}
                        {attendanceEntry.date},{" "}
                        <span className="font-semibold">Status:</span>{" "}
                        {attendanceEntry.status}
                      </li>
                    ))}
                  </ul>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <ul className="w-full h-full border-2  ">
        {employeeData.map((employee) => (
          <li key={employee.id} className="mb-4  ">
            
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-600">{employee.email}</p>
            <h2 className="text-lg font-semibold mt-2">Attendance</h2>
            <ul className="list-disc ml-4">
              {employee.attendance.dates.map((attendanceEntry) => (
                <li key={attendanceEntry.date} className="mb-2">
                  <span className="font-semibold">Date:</span>{" "}
                  {attendanceEntry.date}, <span className="font-semibold">Status:</span>{" "}
                  {attendanceEntry.status}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul> */}
      {/* <ul>
        {employeeData.map((employee, index) => {
          <li>
            EmplyeeName:{employee.name}, Email: {employee.email}
          </li>;
        })}
      </ul> */}
      {/* <FetchEmpData /> */}
    </>
  );
}

export default Employees;
