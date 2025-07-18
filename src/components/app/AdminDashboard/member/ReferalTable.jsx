/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "../../../../axios";
import { ErrorToast } from "../../../global/Toaster";

const ReferalTable = ({ referralData, userId }) => {
  const [csvLoading, setCsvLoading] = useState(false);
  const handleCsv = async () => {
    try {
      setCsvLoading(true);
      const response = await axios.get(
        `/admin/download-referrals?userId=${userId}`,
        {
          responseType: "blob", // 👈 Required for binary files like .xlsx
        }
      );

      // Create a blob URL from the response
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // 👈 MIME type for .xlsx
        })
      );

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "referrals.xlsx"); // 👈 Updated file name
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      ErrorToast("Downloading Fail");

      console.log("🚀 ~ handleXlsxDownload ~ error:", error);
    } finally {
      setCsvLoading(false);
    }
  };
  return (
    <div className="p-3 bg-[#FAFAFA] rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[24px] font-[500] ">
          Referral Friend ({referralData?.length}){" "}
        </h2>
        {referralData?.length > 0 && (
          <button
            onClick={handleCsv}
            disabled={csvLoading}
            className="text-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent text-[14px] font-[500] text-end">
              {csvLoading ? "Exporting..." : "Export CSV"}
            </p>
          </button>
        )}
      </div>
      {referralData?.length > 0 ? (
        <div className="bg-[#FAFAFA] p-2 rounded-md">
          {/* Header */}
          <div className="grid grid-cols-[40px_1.2fr_1.5fr_1.5fr_1.3fr_1fr] gap-4 px-4 py-3 text-sm font-semibold text-black rounded-md bg-[linear-gradient(234.85deg,rgba(41,171,226,0.2)_-20.45%,rgba(99,207,172,0.2)_124.53%)]">
            <div>#</div>
            <div>Referral ID</div>
            <div>Referred Member</div>
            <div>Referred Email</div>
            <div>Signup Date</div>
            <div>Status</div>
          </div>

          {/* Static rows */}
          {referralData?.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-[40px_1.2fr_1.5fr_1.5fr_1.3fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50 border-b last:border-none"
            >
              <div>{index + 1}</div>
              <div>{user?.referId}</div>
              <div className="flex items-center gap-2">
                <img
                  src={
                    user?.profilePicture ||
                    "https://placeholder.vn/placeholder/300x200?bg=cccccc&color=333333&text=No+Image"
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span>{user?.name}</span>
              </div>
              <div>{user.email}</div>
              <div>
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="capitalize">
                {user.isSubscribed ? "Subscribed" : "Unsubscribed"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No record found</div>
      )}
    </div>
  );
};

export default ReferalTable;
