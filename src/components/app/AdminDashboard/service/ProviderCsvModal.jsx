/* eslint-disable react/prop-types */
import axios from "../../../../axios";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import { useState } from "react";

const ProviderCsvModal = ({ onClose, data, csvUploadFile, setUpdate }) => {
  const [uploading, setUploading] = useState(false);

  const handleCsvUpload = async () => {
    try {
      const formData = new FormData();

      formData.append("csvFile", csvUploadFile);
      setUploading(true);

      const response = await axios.post(
        "admin/upload-provider-from-csv",
        formData
      );
      if (response.status === 200) {
        SuccessToast("Csv Uploaded");
        setUpdate((prev) => !prev);
        onClose();
      }
    } catch (err) {
      ErrorToast(err.response.data.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-[20px] shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-[600] text-[#212121]">
            Provider(s) Data
          </h2>
          <img
            src={CrossImag}
            alt="close"
            onClick={onClose}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left text-[14px] text-gray-700">
            <thead>
              <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-[14px] capitalize font-[400] tracking-wide text-gray-700">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Email Address</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((employee, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{index + 1}</td>

                  <td className="py-3 px-4">{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-[234px] mt-4">
          <Button
            loading={uploading}
            onClick={handleCsvUpload}
            type="submit"
            text={"Upload Csv"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderCsvModal;
