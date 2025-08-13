/* eslint-disable react/prop-types */

import { CrossImag, Logo } from "../../../../assets/export";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../AdminDashboard/companyManagement/InvoicePDF";

const InvoiceModal = ({ onClose, invoiceData }) => {
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-4">
      <div className="bg-white  w-[620px] rounded-[20px] shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <img
            src={CrossImag}
            alt="close"
            onClick={onClose}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        <div className=" p-6 rounded-md w-[580px]">
          <div className="flex gap-4 items-center mb-4">
            <img src={Logo} alt="logo" className="w-14 h-14" />
            <div>
              <h2 className="text-[20px] font-[600] text-[#212121]">
                Pain Relief USA
              </h2>
              <p className="text-sm text-gray-500">
                contact email - support@painreliefusa.com
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px] font-[600] text-[#212121]">
              Invoice Detail
            </h2>
          </div>

          <div className="border-t border-[#E5E5E5] my-2"></div>

          <div className="space-y-4  text-[14px] text-[#212121] capitalize">
            <div className="flex border-b justify-between py-2">
              <span>Status:</span>
              <span className="text-[#212121] font-medium capitalize">
                {invoiceData?.status}
              </span>
            </div>
            <div className="flex border-b justify-between py-2">
              <span>Subscription Plan</span>
              <span className="text-[#212121] font-medium capitalize">
                {invoiceData?.planName}
              </span>
            </div>
            <div className="flex border-b justify-between py-2">
              <span>Plan Category</span>
              <span className="text-[#212121] font-medium">Individual</span>
            </div>
            <div className="flex border-b justify-between py-2">
              <span>Total Employees</span>
              <span className="text-[#212121] font-medium">
                {invoiceData?.employeeCount}
              </span>
            </div>
            <div className="flex border-b justify-between py-2">
              <span>Cost Per Employee</span>
              <span className="text-[#212121] font-medium">
                ${invoiceData?.amountPerEmployee}
              </span>
            </div>
            <div className="flex justify-between font-[600] py-2">
              <span>Total Amount</span>
              <span className="text-[#29ABE2] font-[600]">
                ${invoiceData?.totalTransaction}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <div className="w-[205px]">
            <PDFDownloadLink
              document={<InvoicePDF invoiceData={invoiceData} />}
              fileName="invoice.pdf"
            >
              {({ loading }) =>
                loading ? (
                  "Generating PDF..."
                ) : (
                  <button className="w-full border border-[#63CFAC] bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white rounded-lg py-2 font-medium">
                    Download Invoice
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
