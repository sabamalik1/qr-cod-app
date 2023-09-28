import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

function QRCodeGenerate() {
  const [qrCodeContent, setQRCodeContent] = useState("");
 
  useEffect(() => {
    
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

  const generateUniqueToken = () => {
    const timestamp = Date.now();
    return `${auth.currentUser.uid}:${timestamp}`;
  };
  

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-serif " >QR Code Display</h1>
      <QRCode value={qrCodeContent} size={300} className="my-16  " />
      {/* <p>Current Token: {qrCodeContent}</p> */}
      {/* <Link to="/generateQR">QRCode Generate</Link> */}
    </div>
    </>
    
  );
}

export default QRCodeGenerate;


