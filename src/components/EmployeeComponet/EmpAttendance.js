import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If you are using React Router for routing
import { auth, db } from "../../firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

function EmpAttendance() {
  const [userData, setUserData] = useState({});
  //   const { uid } = useParams(); // Get the UID from the route params (if you're using React Router)
  const [attendanceData, setAttendanceData] = useState([]);
  // const uid = "JCoBPCpBlqcjX0OLAu6bHp8fmhq2";
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = auth.currentUser.uid;
    console.log("User UID:", uid);

    if (uid) {
      // Reference to the specific user's document within the "users" collection
      const userDocRef = doc(db, "users", uid);

      getDoc(userDocRef).then((userDoc) => {
        console.log("document exist", userDocRef);
        if (userDoc.exists()) {
          console.log("userdoc existu", userDoc);
          const userData = userDoc.data();
          console.log("User Data:", userData);
          // Update the state with the user data
        } else {
          console.log("User document does not exist.");
        }
      });
      // Now, let's query all user documents in the 'users' collection where the 'uid' field matches the current user's UID
      const usersCollectionRef = collection(db, "users");
      const userQuery = query(usersCollectionRef, where("uid", "==", uid));

      getDocs(userQuery)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("User document with matching UID:", doc.data());
            setUserData(doc.data());
            // Handle the user documents that match the UID here
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.log("User is not authenticated.");
    }

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
        // const attendanceRef = collection(db, "attendance");
        // console.log("attendance", attendanceRef);
        // const querySnapshot = await getDocs(attendanceRef);
        // console.log("query", querySnapshot);
        // const data = querySnapshot.docs.map((doc) => doc.data());
        // setAttendanceData(data);
        // console.log("data", data);
      } catch (error) {
        console.error("Error fetching attendance data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Employee Attendance</h1>

      <div>
        
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div>
        <div className="flex text-center justify-center  background px-3 py-3  ">
          <div className=" p-5 rounded-lg shadow-lg mb-5 w-[600px] h-[350px] background bg-purple-700 mt-32  ">
            
          <h1 className="text-3xl  text-center justify-center font-extrabold text-slate-100 mt-16 ">Welcome, {userData.name}</h1>
            <p className="text-2xl  text-center justify-center font-bold text-slate-100 mt-4 ">
            Email: {userData.email}
            </p>
            <p className="text-2xl  text-center justify-center font-bold text-slate-100 mt-4 ">
            salary: {userData.salary}
            </p>
            <p className="text-2xl  text-center justify-center font-bold text-slate-100 mt-4 ">
            job type: {userData.jobType}
            </p>
           
  
          </div>
        </div>
      </div>

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
