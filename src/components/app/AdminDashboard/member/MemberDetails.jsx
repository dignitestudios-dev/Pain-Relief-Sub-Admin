import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../../global/Button";
import ReferalTable from "./ReferalTable";
import FamilyMember from "./FamilyMember";
import BasicInfo from "./BasicInfo";
import { useFetchById } from "../../../../hooks/api/Get";
import { IoIosArrowRoundBack } from "react-icons/io";
import ServiceRequestModal from "../service/ServiceRequestModal";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import axios from "../../../../axios";
import DetailLoader from "../../../global/DetailLoader";

const MemberDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [delLoading, setDelLoading] = useState(false);
  const [disableRequestModal, setDisableRequestModal] = useState(null);
  const [enableRequestModal, setEnableRequestModal] = useState(null);

  const [update, setUpdate] = useState(false);
  const { id } = useParams();
  const { data, loading } = useFetchById(`/admin/get-member/${id}`, update);
  const { data: referralData, loading: loader } = useFetchById(
    `/admin/get-member-referral?userId=${id}`,
    update
  );

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

  const enableUser = async () => {
    try {
      setDelLoading(true);
      const response = await axios.post("admin/enable-user", {
        userId: enableRequestModal,
      });
      if (response.status === 200) {
        SuccessToast("Update Successfully");
        setEnableRequestModal(null);
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
      <div
        className="flex items-center cursor-pointer w-14 "
        onClick={() => navigate(-1)}
      >
        <IoIosArrowRoundBack size={18} />
        <p className="text-[14px] font-[600] ">Back</p>
      </div>
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Members Details
      </h2>

      {loading ? (
        <DetailLoader />
      ) : (
        <>
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
                <h3 className="text-[32px] font-[600]">
                  {data?.firstName} {data?.lastName}
                </h3>
                <p className="text-[#565656] text-[16px] font-[500] ">
                  {data?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-end">
                {/* <span className=" text-[16px] font-[500] text-[#565656] ">
                  Current Plan
                </span> */}
                <h3 className="font-[600] text-[24px] text-[#000000]">
                  {data?.isSubscribed ? "Subscribed" : "Unsubscribed"}
                </h3>
              </div>
              {!data?.isDeactivatedByAdmin ? (
                <div className="w-[184px]">
                  <Button
                    text={"Disable"}
                    type="button"
                    onClick={() => setDisableRequestModal(data?.signUpRecord)}
                  />
                </div>
              ) : (
                <div className="w-[184px]">
                  <Button
                    text={"Enable"}
                    type="button"
                    onClick={() => setEnableRequestModal(data?.signUpRecord)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 rounded-md shadow p-2 mb-6">
            {["Basic Info", "Family Members", "Referral Friends"].map((tab) => (
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

          {activeTab === "Family Members" && (
            <FamilyMember provider={data?.familyMembers} />
          )}

          {activeTab === "Referral Friends" && (
            <ReferalTable
              userId={id}
              referralData={referralData}
              loader={loader}
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
          {enableRequestModal && (
            <ServiceRequestModal
              btnText="Change Status"
              title="Change Status Request"
              content="Are you sure?"
              onClose={() => setEnableRequestModal(null)}
              handleClick={enableUser}
              delLoading={delLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MemberDetails;
