import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If you are using React Router for routing
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

function EmpAttendance() {
  //   const { uid } = useParams(); // Get the UID from the route params (if you're using React Router)
  const [attendanceData, setAttendanceData] = useState([]);
  const uid = "JCoBPCpBlqcjX0OLAu6bHp8fmhq2";
  useEffect(() => {
    // Fetch employee's attendance data from Firestore
    const fetchData = async () => {
      try {
        // const employeeCollectionRef = collection(db, "users");
        // const empQuerySnapshot = await getDocs(employeeCollectionRef);

        // const empData = [];
        // empQuerySnapshot.forEach((doc) => {
        //   // Extract employee information from Firestore document
        //   // const employeeInfo = doc.data();
        //   empData.push({
        //     ...doc.data(),
        //   });
        // });

        const attendanceRef = collection(db, "attendance");
        console.log("attendance", attendanceRef);
        const querySnapshot = await getDocs(attendanceRef);
        console.log("query", querySnapshot);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setAttendanceData(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching attendance data: ", error);
      }
    };

    fetchData();
  }, [uid]);

  return (
    <div>
      <h1>Employee Attendance</h1>
      <ul>
        {attendanceData.map((entry) => (
          <li key={entry.date}>
            <p>Date: {entry.date}</p>
            <p>In-Time: {entry.in}</p>
            {/* <p>Out-Time: {entry.out}</p> */}
            <p>Status: {entry.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmpAttendance;



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // If you are using React Router for routing
// import { db } from "../../firebase";
// import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

// function EmpAttendance() {
// //   const { uid } = useParams(); // Get the UID from the route params (if you're using React Router)
//   const [attendanceData, setAttendanceData] = useState([]);
// const uid = "JCoBPCpBlqcjX0OLAu6bHp8fmhq2"
//   useEffect(() => {
//     // Fetch employee's attendance data from Firestore
//     const fetchData = async () => {
//       try {
//         const attendanceRef = collection(db, "attendance");
//         const q = query(attendanceRef, where("uid", "==", uid), orderBy("date", "desc"));
//         const querySnapshot = await getDocs(q);
//         const data = [];

//         querySnapshot.forEach((doc) => {
//           const attendance = doc.data();
//           // Convert Firestore timestamp to JavaScript Date
//           const timestamp = attendance.date;
//           const date = timestamp.toDate();
//           console.log("data",data)
//           const formattedDate = date.toLocaleDateString(); // Format date as needed

//           data.push({
//             date: formattedDate,
//             in: attendance.in,
//             // Add other properties here if needed
//           });
//         });

//         setAttendanceData(data);
//       } catch (error) {
//         console.error("Error fetching attendance data: ", error);
//       }
//     };

//     fetchData();
//   }, [uid]);

//   return (
//     <div>
//       <h1>Employee Attendance</h1>
//       <ul>
//         {attendanceData.map((entry, index) => (
//           <li key={index}>
//             <p>Date: {entry.date}</p>
//             <p>In-Time: {entry.in}</p>
//             {/* Add other properties here if needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default EmpAttendance;
