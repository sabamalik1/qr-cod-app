import React, { useState } from "react";
import QrReader from "react-qr-scanner";

function Test() {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h2>
        {window.innerWidth} x {window.innerHeight}
      </h2>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          video: { facingMode: "environment" },
        }}
      />
      <p>{result}</p>
    </div>
  );
}

export default Test;
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

{
  /* <div className="px-4 py-4 drop-shadow-md md:drop-shadow-xl border-2 w-48 items-center justify-center rounded-md ">
                <div className="text-xl px-2 py-2 font-sans ml-6   ">
                  Total Attendance
                </div>
                <div className="items-center justify-center  ml-16">15</div>
              </div>
              <div className="px-4 py-4 drop-shadow-md md:drop-shadow-xl border-2 w-48 items-center justify-center rounded-md ">
                <div className="text-xl px-2 py-2 font-sans ml-6   ">
                  Absent Employees
                </div>
                <div className="items-center justify-center  ml-16">15</div>
              </div>
              <div className="px-4 py-4 drop-shadow-md md:drop-shadow-xl border-2 w-48 items-center justify-center rounded-md ">
                <div className="text-xl px-2 py-2 font-sans ml-6   ">
                  Employee's Leaves
                </div>
                <div className="items-center justify-center  ml-16">5</div>
              </div> */
}
