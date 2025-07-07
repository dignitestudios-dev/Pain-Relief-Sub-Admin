import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { Brochure } from "../../../assets/export";
import Button from "../../global/Button";

const BrochureSection = ({ referralCode }) => {
  const canvasRef = useRef(null);
  const captureRef = useRef(null); // 📌 for capturing the DOM

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        referralCode?.referralLink || "https://example.com", // fallback
        { width: 100 },
        function (error) {
          if (error) console.error(error);
        }
      );
    }
  }, [referralCode]);

  // 📥 Download handler
  const handleDownload = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const link = document.createElement("a");
      link.download = "brochure.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div>
      <div ref={captureRef} className="relative inline-block">
        {/* Brochure Image */}
        <img src={Brochure} alt="Brochure" className="w-full" />

        {/* QR Code overlaid */}
        <div className="absolute top-[302px] left-[265px] ">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-4">
        <Button text={"Download Brochure"} onClick={handleDownload} />
      </div>
    </div>
  );
};

export default BrochureSection;
