import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import React from "react";

const FetchEmpData = async () => {
  try {
    const empCollection = collection(db, "employees");
    const querySnapshot = await getDocs(empCollection);
    const employeeData = [];

    querySnapshot.forEach((doc) => {
      // Extract employee information from Firestore document
      const employeeInfo = doc.data();
      employeeData.push({
        id: doc.id,
        ...employeeInfo,
      });
    });
    // Now, you have an array of employee data to work with
    console.log("Employee Data:", employeeData);
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }

  return (
    <>
      <h1>Employees Information</h1>
      {/* <ul>
        {employeeData.map((employee, index) => {
          <li>
            EmplyeeName:{employee.name}, Email: {employee.email}
          </li>;
        })}
      </ul> */}
      
    </>
  );
};

export default FetchEmpData;


