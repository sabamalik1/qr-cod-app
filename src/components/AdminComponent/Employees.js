import React, { useEffect, useState } from "react";
// import FetchEmpData from "./FetchEmpData";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

function Employees() {
  const [employeeData, setEmployeeData] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch employee data from Firestore
    const fetchEmployeeData = async () => {
      try {
        const employeeCollectionRef = collection(db, "employees");
        const empQuerySnapshot = await getDocs(employeeCollectionRef);

        const empData = [];
        empQuerySnapshot.forEach((doc) => {
          // Extract employee information from Firestore document
          // const employeeInfo = doc.data();
          empData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("Employee Data:", empData);
        // Fetch attendance data from Firestore
        const attendanceCollectionRef = collection(db, "attendance");
        const attendanceQuerySnapshot = await getDocs(attendanceCollectionRef);

        const attendanceData = [];
        attendanceQuerySnapshot.forEach((doc) => {
          attendanceData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        console.log("Attendance Data:", attendanceData);

        // Combine employee data and attendance data

        const combinedData = employeeData.map((employee) => {
          const attendance = attendanceData.find(
            (entry) => entry.employeeId === employee.id
          );
          return {
            ...employee,
            attendance: attendance || { dates: [] }, // Default to an empty array if no attendance data found
          };
        });

        setEmployeeData(combinedData);

        // Set the employee data and mark loading as false

        // setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);
  return (
    <>
      <h1>Employees Information</h1>
      <ul>
        {employeeData.map((employee) => (
          <li key={employee.id}>
            <h2> {employee.name} </h2>
            <p> {employee.email} </p>
            console.log(employee.name, employee.email)
            <h2> Attendance </h2>
            <ul>
              {employee.attendance.dates.map((attendanceEntry) => (
                <li key={attendanceEntry.date}>
                  Date: {attendanceEntry.date}, In Time:{" "}
                  {attendanceEntry.inTime}, Status: {attendanceEntry.status}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

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
