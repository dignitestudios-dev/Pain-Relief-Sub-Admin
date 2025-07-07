import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const QrCode = ({ referralCode }) => {
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && referralCode?.referralLink) {
      QRCode.toCanvas(
        canvasRef.current,
        referralCode?.referralLink,

        function (error) {
          if (error) console.error(error);
        }
      );
    }
  }, [referralCode]);

  const handleCopyLink = async () => {
    if (referralCode?.referralLink) {
      try {
        await navigator.clipboard.writeText(referralCode.referralLink);
        // SuccessToast("Link copied to clipboard!");
        setCopied(true);
      } catch (err) {
        console.error("Failed to copy link: ", err);
      }
    }
  };

  return (
    <div>
      <div className="bg-qr flex items-center justify-center">
        <canvas ref={canvasRef} />
      </div>
      <div className="flex justify-between gap-2 mt-3">
        {copied ? (
          <p className="mt-4 text-center text-sm font-medium text-green-600">
            Copied to clipboard!
          </p>
        ) : (
          <button
            onClick={handleCopyLink}
            className="border rounded-[8px] border-[#63CFAC] h-[49px] w-full text-[#63CFAC]"
          >
            Copy Link
          </button>
        )}
      </div>
    </div>
  );
};

export default QrCode;
