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
