// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";
// import React from "react";
// import { getAuth } from "firebase/auth";

// const FetchEmpData = async () => {
//   try {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     const uid = auth.currentUser.uid;
//     console.log("User UID:", uid);
//     const empCollection = collection(db, "users");
//     const querySnapshot = await getDocs(empCollection);
//     const employeeData = [];

//     querySnapshot.forEach((doc) => {
//       // Extract employee information from Firestore document
//       const employeeInfo = doc.data();
//       employeeData.push({
//         id: doc.id,
//         ...employeeInfo,
//       });
//     });
//     // Now, you have an array of employee data to work with
//     console.log("Employee Data:", employeeData);
//   } catch (error) {
//     console.error("Error fetching employee data:", error);
//   }

//   return (
//     <>
//       <h1>Employees Information</h1>
//       {/* <ul>
//         {employeeData.map((employee, index) => {
//           <li>
//             EmplyeeName:{employee.name}, Email: {employee.email}
//           </li>;
//         })}
//       </ul> */}
      
//     </>
//   );
// };

// export default FetchEmpData;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function FetchEmpData() {
  const [userData, setUserData] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const { uid } = useParams(); // Get the UID from the route params (if you're using React Router)

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userUid = auth.currentUser.uid;
    console.log("uid",userUid)
    
    const userName = user.displayName;
    const email = user.email;
    
    if (userUid) {
      // Reference to the specific user's document within the "users" collection
      const userDocRef = doc(db, "users", userUid);
      console.log()
    
      getDoc(userDocRef)
        .then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData); // Update the state with the user data
          } else {
            console.log("User document does not exist.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Reference to the "attendance" collection
      const attendanceRef = collection(db, "attendance");

      // Query attendance data for the specific user
      getDocs(attendanceRef)
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            const attendance = doc.data();
            if (attendance.uid === userUid) {
              data.push({
                date: attendance.date,
                in: attendance.in,
                status: attendance.status,
                // Add other properties here if needed
              });
            }
          });
          setAttendanceData(data);
        })
        .catch((error) => {
          console.error("Error fetching attendance data:", error);
        });
    } else {
      console.log("User is not authenticated.");
    }
  }, [uid]);

  return (
    <div>
      <h1>Employee Attendance</h1>
      {userData ? (
        <div>
          <h1>Welcome, {userData.userName}</h1>
          <p>Email: {userData.email}</p>
          {/* Render other user data as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <ul>
        {attendanceData.map((entry, index) => (
          <li key={index}>
            <p>Date: {entry.date}</p>
            <p>In-Time: {entry.in}</p>
            <p>Status: {entry.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchEmpData;
