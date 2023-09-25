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
  // const [delay, setDelay] = useState(100);
  // const [result, setResult] = useState("No Result");
  // const [isCameraOpen, setIsCameraOpen] = useState(false);
  // const [qrCodeContent, setQRCodeContent] = useState("");
  // const [currentUser, setCurrentUser] = useState(null);
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
    const email = user.email;
    
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

      const isMarked = attendanceData.dates.some((date) => {
        const dateFromDB = new Date(date.seconds * 1000)
          .toISOString()
          .split("T")[0];
        const currentDateISO = currentDate.toISOString().split("T")[0];

        return dateFromDB === currentDateISO ? true : false;
      });

      if (!isMarked) {
        attendanceData.dates.push({
          date: currentDate,
            inTime: currentDate,
            status: "Present",
        });

        // const inTime = currentDate.toISOString()
        // const status = "Present"
        // data.dates.push({
        //   date: currentDate,
        //   inTime: inTime,
        //   status: status,
        // });

        // data.dates.push({date: currentDate , inTime:"" , outTime:"", status: "present"})
        await setDoc(docRef, attendanceData, { merge: true });
        alert("Attendance marked successfully");
      } else {
        alert("Already marked for today");
      }
      // To-Do Update the existing document
      // Push the data in existing dates array and set it
    } else {
      // To-Do let create a new document
      const formattedDate = currentDate.toLocaleDateString(); // Format the date
      const formattedTime = currentDate.toLocaleTimeString(); // Format the time
      const newAttendanceData = {
        userName, // Use userName instead of UserName
        email,    // Use email instead of email
        dates: [
          {
            date: formattedDate,
            inTime: formattedTime,
            status: "Present",
          },
        ],
      };
      
      // const data = { dates: [currentDate] };
      // const inTime = currentDate.toISOString(); // Store the current timestamp as inTime
      // const status = "Present";

      // const data = { dates: [{
      //   date: currentDate,
      //   inTime: inTime,
      //   status: status,
      // }] };
      // Create an array of dates and push the data in it and set it
      // await setDoc(docRef, data, { merge: true });
      // alert("Month not exist");
      // // docSnap.data() will be undefined in this case
      // return false;
      await setDoc(docRef, newAttendanceData)
      alert("Attendance marked")
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
      <h1 className=" mb-16 ">QR Code Scanner</h1>
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

    // <div>
    //   <h1>QRCodeScanner</h1>
    //   <button className="w-[200px] h-[40px]"
    //   onClick={toggleCamera}>
    //     {isCameraOpen ? "Close Camera" : "Off Camera"}
    //   </button>
    //   {isCameraOpen && (
    //     <QrReader>
    //       delay={delay}
    //       onScan={handleScan}
    //       onError={handleError}
    //       constraints={{
    //       video: { facingMode: "environment" },
    //     }}
    //       {/* style={{ width: 320, height: 420 }} */}
    //       {/* style={{ width: previewStyle.width, height: previewStyle.height }} */}
    //     </QrReader>
    //   )}

    //   <p>{result}</p>
    // </div>
  );
}

export default QRCodeScanner;



// const validateQRCode = (code) => {
  //   if (currentUser) {
  //     // Extract UID and timestamp from the QR code
  //     const [uid, timestamp] = code.split(":");

  //     // Perform Firebase database operations to validate and mark attendance
  //     const db = app.database();
  //     const date = new Date().toLocaleDateString();
  //     const time = new Date().toLocaleTimeString();

  //     // Check if the code is valid and mark attendance
  //     db.ref(`code/${uid}`).once("value", (snapshot) => {
  //       const savedCode = snapshot.val();

  //       if (code === savedCode) {
  //         const attendanceRef = db.ref(`employee/${currentUser.uid}/attendance/${date}`);

  //         attendanceRef.once("value", (attendanceSnapshot) => {
  //           const attendance = attendanceSnapshot.val();

  //           if (!attendance) {
  //             const newAttendance = {
  //               in: time,
  //               status: "present",
  //             };

  //             attendanceRef.set(newAttendance);
  //             console.log("In Time marked");
  //           } else if (!attendance.out && attendance.status !== "leave") {
  //             attendance.out = time;
  //             attendanceRef.update(attendance);
  //             console.log("Out Time marked");
  //           } else {
  //             console.log("Already Marked Attendance");
  //           }
  //         });
  //       } else {
  //         console.log("Invalid QR Code");
  //       }
  //     });
  //   } else {
  //     console.error("User not authenticated.");
  //   }
  // };


  
  // const handleScan = (data) => {
  //   setResult(data);
  // };
  // const handleError = (err) => {
  //   console.error(err);
  // };
  // // const previewStyle = {
  // //   height: 240,
  // //   width: 320,
  // // };
  // const toggleCamera = () => {
  //   setIsCameraOpen(!isCameraOpen);
  // };