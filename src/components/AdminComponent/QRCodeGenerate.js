import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

function QRCodeGenerate() {
  const [qrCodeContent, setQRCodeContent] = useState("");
  // const [uid, setUID] = useState("");
  // const [dbRef, setDBRef] = useState(null);

  useEffect(() => {
    // Initialize the database reference when the component mounts
    //  const database = getDatabase(app); // Get the Firebase database instance
    //  const databaseRef = ref(database, "tokens") // Replace with your database path
    //  setDBRef(databaseRef); // Set the database reference
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        updateUserToken(); // Initial Call
      }
    });
    const interval = setInterval(() => {
      updateUserToken(); // Update token every 10 seconds
    }, 10000);

    return () => {
      clearInterval(interval);
      unSubscribe();
    };
  }, []);

  const updateUserToken = async () => {
    if (auth.currentUser) {
      const code = generateUniqueToken();
      // const collectionRef = collection(db, "code"); // Reference to the "code" collection

      try {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "code", "generatedQrCode"), { code });
        setQRCodeContent(code);
      } catch (error) {
        console.error("Error adding document to Firestore:", error);
      }
    } else {
      console.error("User not authenticated.");
    }
  };

  // const updateUserToken = async () => {
  //   if (auth.currentUser) {
  //     const code = generateUniqueToken();
  //     const collectionRef = collection(db, "code"); // Reference to the "code" collection
  //     const docRef = doc(collectionRef, auth.currentUser.uid); // Reference to the document with the user's UID

  //     try {
  //       // Add the document with the generated code
  //       await setDoc(docRef, { code });
  //       setQRCodeContent(code);
  //       console.log("Document added to Firestore", docRef.id);
  //     } catch (error) {
  //       console.error("Error adding document to Firestore:", error);
  //     }
  //   } else {
  //     console.error("User not authenticated.");
  //   }
  // };

  // throgh this code implimentation dynamic qr code generate but not store in firestore bcz of setDoc
  // const updateUserToken = async () => {
  //   if (auth.currentUser) {
  //     const code = generateUniqueToken();
  //     await setDoc(doc(db, "code", auth.currentUser.uid), { code }); // Set the data in Firestore
  //     setQRCodeContent(code);
  //     console.log()
  //   } else {
  //     console.error("User not authenticated.");
  //   }
  // };

  // const updateUserToken = async () => {
  //   if (dbRef) {
  //     const code = generateUniqueToken();
  //     await set(dbRef, { [uid]: code }); // Set the data in the Realtime Database
  //     setQRCodeContent(code);
  //   } else {
  //     console.error("Database reference (dbRef) is null.");
  //   }
  // };
  const generateUniqueToken = () => {
    const timestamp = Date.now();
    return `${auth.currentUser.uid}:${timestamp}`;
  };
  //   useEffect(() => {

  //     const initializeFirebase = async () => {
  //       await app.auth().signInAnonymously();
  //       const authUser = app.auth().currentUser;
  //       if (authUser) {
  //         setUID(authUser.uid);
  //         setDBRef(app.database().ref("code"));
  //         updateUserToken(); // Initial token generation and update
  //       }
  //     };

  //     initializeFirebase();

  //   }, [uid, dbRef]);

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-serif " >QR Code Display</h1>
      <QRCode value={qrCodeContent} size={300} className="my-16  " />
      <p>Current Token: {qrCodeContent}</p>
      {/* <Link to="/generateQR">QRCode Generate</Link> */}
    </div>
    </>
    
  );
}

export default QRCodeGenerate;

// import React, { useState } from "react";
// import { app, dbRef } from "./firebase"; // Import the dbRef from your firebase.js

// function QRCodeGenerate() {
//   const [newData, setNewData] = useState("");

//   const handleAddData = () => {
//     // Adding new data to the database
//     set(dbRef.child("data").push(), {
//       value: newData,
//     })
//       .then(() => {
//         console.log("Data added successfully");
//       })
//       .catch((error) => {
//         console.error("Error adding data:", error);
//       });
//   };

//   return (
//     <div>
//       <h1>Data Storage Example</h1>
//       <input
//         type="text"
//         placeholder="Enter data"
//         value={newData}
//         onChange={(e) => setNewData(e.target.value)}
//       />
//       <button onClick={handleAddData}>Add Data</button>
//     </div>
//   );
// }

// export default QRCodeGenerate;
