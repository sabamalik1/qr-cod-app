// TotalEmployeesStats.js

import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

function TotalEmployeesStats() {
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);

  useEffect(() => {
    // Fetch attendance data from Firestore
    const fetchAttendanceData = async () => {
      try {
        const attendanceCollectionRef = collection(db, "attendance");
        const attendanceQuerySnapshot = await getDocs(attendanceCollectionRef);

        let absentCount = 0;
        let presentCount = 0;

        attendanceQuerySnapshot.forEach((doc) => {
          const attendanceData = doc.data();
          // Check if attendance is marked for today
          if (attendanceData.dates.some((entry) => isToday(entry.date))) {
            if (attendanceData.status === "absent") {
              absentCount++;
            } else if (attendanceData.status === "present") {
              presentCount++;
            }
          }
        });

        setTotalAbsent(absentCount);
        setTotalPresent(presentCount);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Function to check if a given date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div>
      <p>Total Absent Employees: {totalAbsent}</p>
      <p>Total Present Employees: {totalPresent}</p>
    </div>
  );
}

export default TotalEmployeesStats;
