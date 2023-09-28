import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
// import app from "../../firebase";
import app, { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

import { onAuthStateChanged } from "firebase/auth";

function QRCodeScanner() {
  
  const [validating, setValidating] = useState(false);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //     } else {
  //       setCurrentUser(false);
  //     }
  //   });
  // }, []);

  const handleScan = async (data) => {
    if (data) {
      // alert(data?.text);
      // Handle the scanned QR code data
      // setQRCodeContent(JSON.stringify(data?.text));

      // Validate and process the QR code data
      setValidating(true);
      if (await validateQRCode(data?.text)) {
        markAttendance();
      } else {
        // Show notfication
        alert("Attendance not marked Try Again");
      }

      setValidating(false);
      // saveMonthlyAttendance(JSON.stringify(data?.text));
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const markAttendance = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = auth.currentUser.uid;
    const userName = user.displayName;
    // const email = user.email;

    // Fetch the user data based on UID
    // const user = await getUser(auth, uid);

    // Create date and time objects using the Date constructor
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const docRef = doc(db, "attendance", `${uid}_${month}_${year}`);

    const docSnap = await getDoc(docRef);
    // const date = new Date(data.dates[0].seconds * 1000); // That how we deal with firestore timestamp

    if (docSnap.exists()) {
      const attendanceData = docSnap.data();

      const isMarked = attendanceData.dates.some((dateObj) => {
        // alert(JSON.stringify(dateObj));
        const dateFromDB = new Date(dateObj.date.seconds * 1000)
          .toISOString()
          .split("T")[0];
        const currentDateISO = currentDate.toISOString().split("T")[0];

        return dateFromDB === currentDateISO ? true : false;
      });

      if (!isMarked) {
        attendanceData.dates.push({
          date: currentDate,
          status: "Present",
        });

        await setDoc(docRef, attendanceData, { merge: true });
        alert("Attendance marked successfully");
      } else {
        alert("Already marked for today");
      }
      //  Update the existing document
      // Push the data in existing dates array and set it
    } else {
      //  let create a new document
      const newAttendanceData = {
        userName, // Use userName instead of UserName
        // email, 
        dates: [
          {
            date: currentDate,
            // inTime: formattedTime,
            status: "Present",
          },
        ],
      };

      // const data = { dates: [currentDate] };
     
      // Create an array of dates and push the data in it and set it
      // await setDoc(docRef, data, { merge: true });
      // alert("Month not exist");
      // // docSnap.data() will be undefined in this case
      // return false;
      await setDoc(docRef, newAttendanceData);
      alert("Attendance marked");
    }
    
  };


  const validateQRCode = async (scannedCode) => {
    // if (currentUser) {
    // Extract UID and timestamp from the QR code
    // const [uid, timestamp] = code.split(":");

    const uid = auth.currentUser.uid;
    try {
      const docRef = doc(db, "code", "generatedQrCode");

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.code === scannedCode ? true : false;
        // console.log("Document data:", docSnap.data());
        // alert(JSON.stringify({ isSame: data.code === "scannedCode" }));
      } else {
        // docSnap.data() will be undefined in this case
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
    // } else {
    //   console.error("User not authenticated.");
    // }
  };

  return (
    <div>
      <h1 className=" mb-16 text-center text-2xl font-bold justify-center ">QR Code Scanner</h1>
      {!validating && (
        <QrReader
          delay={1500}
          onError={handleError}
          onScan={handleScan}
          constraints={{
            video: { facingMode: "environment" },
          }}
        />
      )}
      {/* <p>Current QR Code Content: {qrCodeContent}</p> */}
    </div>  
  );
}

export default QRCodeScanner;

