import { useState } from "react";
import Button from "../../../global/Button";
import BasicInfo from "./BasicInfo";
import MedicalLicense from "./MedicalLicense";
import { useNavigate, useParams } from "react-router";
import { useFetchById } from "../../../../hooks/api/Get";
import { IoIosArrowRoundBack } from "react-icons/io";
import DetailLoader from "../../../global/DetailLoader";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import { RiLoader5Line } from "react-icons/ri";
import axios from "../../../../axios";
import ServiceRequestModal from "./ServiceRequestModal";

const DetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const { id } = useParams();
  const [btnLoading, setBtnLoading] = useState(null);
  const [update, setUpdate] = useState(false);
  const [serviceRequestModal, setServiceRequestModal] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [disableRequestModal, setDisableRequestModal] = useState(null);

  const { data, loading } = useFetchById(`/admin/get-provider/${id}`, update);

  const handleRequest = async (status) => {
    try {
      setBtnLoading(status);
      const response = await axios.post("/admin/update-provider-status", {
        providerId: id,
        status,
        isPainReliefCoach: data?.painReliefCoachRequested ? true : false,
      });
      if (response.status === 200) {
        SuccessToast("Status Updated");
        setUpdate((prev) => !prev);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setBtnLoading(null);
    }
  };

  const disableUser = async () => {
    try {
      setDelLoading(true);
      const response = await axios.post("admin/disable-user", {
        userId: disableRequestModal,
      });
      if (response.status === 200) {
        SuccessToast("Update Successfully");
        setDisableRequestModal(null);
        setUpdate((prev) => !prev);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      {loading ? (
        <DetailLoader />
      ) : (
        <>
          <div
            className="flex items-center cursor-pointer "
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack size={18} />
            <p className="text-[14px] font-[600] ">Back</p>
          </div>
          <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
            Service Provider Details
          </h2>

          <div className="flex justify-between items-center  rounded-lg shadow-sm mb-10  bg-[#FAFAFA] p-4">
            <div className="flex items-center  mb-4">
              <img
                src={
                  data?.profilePicture ??
                  "https://placeholder.vn/placeholder/300x200?bg=cccccc&color=333333&text=No+Image"
                }
                alt="avatar"
                className="w-[116px] h-[116px] rounded-full border border-[#63CFAC] mr-6 p-0.5"
              />
              <div>
                <h3 className="text-[32px] font-[600]">{data.name}</h3>
                <p className="text-[#565656] text-[16px] font-[500] ">
                  {data.email}
                </p>
              </div>
            </div>
            {data?.painReliefCoachRequested &&
              data?.isPainReliefCoach === false && (
                <div className="flex items-center gap-4">
                  <div>
                    <button
                      onClick={() => handleRequest("rejected")}
                      className="border rounded-[8px] font-[500]  border-[#C31736] text-[#C31736]  w-[184px] h-[49px] "
                    >
                      <div className="flex justify-center items-center">
                        <span className="mr-1">Reject</span>
                        {btnLoading === "rejected" && (
                          <RiLoader5Line className="animate-spin text-lg" />
                        )}
                      </div>
                    </button>
                  </div>
                  <div className="w-[184px]">
                    <Button
                      loading={btnLoading === "approved"}
                      onClick={() => handleRequest("approved")}
                      text={"Accept"}
                      type="button"
                    />
                  </div>
                </div>
              )}
            {data?.profileStatus === "pending" && (
              <div className="flex items-center gap-4">
                <div>
                  <button
                    onClick={() => handleRequest("rejected")}
                    className="border rounded-[8px] font-[500]  border-[#C31736] text-[#C31736]  w-[184px] h-[49px] "
                  >
                    <div className="flex justify-center items-center">
                      <span className="mr-1">Reject</span>
                      {btnLoading === "rejected" && (
                        <RiLoader5Line className="animate-spin text-lg" />
                      )}
                    </div>
                  </button>
                </div>
                <div className="w-[184px]">
                  <Button
                    loading={btnLoading === "approved"}
                    onClick={() => handleRequest("approved")}
                    text={"Accept"}
                    type="button"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 rounded-md shadow p-2 mb-6">
            {["Basic Info", "Medical License"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2 h-[50px] rounded-md text-[18px] font-[500]  ${
                  activeTab === tab
                    ? "bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] text-white "
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Basic Info" && <BasicInfo provider={data} />}
          {activeTab === "Medical License" && (
            <MedicalLicense provider={data} />
          )}

          {/* {activeTab === "Family Members" && <FamilyMember />}

      {activeTab === "Referral Friends" && <ReferalTable />} */}
        </>
      )}

      {serviceRequestModal && (
        <ServiceRequestModal
          onClose={() => setServiceRequestModal(false)}
          handleClick={() => {
            setServiceRequestModal(false);
          }}
        />
      )}

      {disableRequestModal && (
        <ServiceRequestModal
          btnText="Change Status"
          title="Change Status Request"
          content="Are you sure?"
          onClose={() => setDisableRequestModal(null)}
          handleClick={disableUser}
          delLoading={delLoading}
        />
      )}
    </div>
  );
};

export default DetailPage;
