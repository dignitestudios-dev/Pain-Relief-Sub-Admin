import React from "react";
import { MapImg, Profile } from "../../../../assets/export";
import { IoLocationOutline } from "react-icons/io5";
import Button from "../../../global/Button";
import { useFetchById } from "../../../../hooks/api/Get";
import { useNavigate, useParams } from "react-router";
import { getDateFormat } from "../../../../lib/helpers";
import GoogleMapComponent from "../../../global/GoogleMapComponent";

const AppoitmentDetail = () => {
  const { id } = useParams();
  const { data, loading } = useFetchById(`/admin/get-appointment/${id}`);

  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-[10px] p-4">
      <h2 className="text-[32px] font-semibold text-[#212121]">
        Appointment Detail
      </h2>

      {loading ? (
        <div className="bg-white rounded-[10px] p-4 h-28">Loading ...</div>
      ) : (
        <div className="grid grid-cols-12 gap-4 mt-4">
          {/* Left Section */}
          <div className="col-span-8 bg-[#FAFAFA] rounded-[8px] p-4 space-y-6">
            {/* Clinic Location */}
            <section>
              <h3 className="text-[24px] font-semibold text-black mb-4">
                Clinic Location
              </h3>
              <div className=" h-[254px] mt-3 rounded-md overflow-hidden">
                <GoogleMapComponent
                  coords={data?.clinicLocation}
                  address={data?.clinicAddress}
                />
              </div>
              <div className="flex justify-between mt-2 border-b pb-4">
                <div className="flex items-center gap-2 text-[14px] text-[#1F1F1F]">
                  <IoLocationOutline />
                  <span>{data?.clinicAddress}</span>
                </div>
                {/* <span className="text-[14px] text-[#1F1F1F]">
                  20 Miles Away
                </span> */}
              </div>
            </section>

            {/* Network Professional Detail */}
            <section className="border-b pb-4">
              <h3 className="text-[24px] font-semibold text-black mb-4">
                Network Professional Detail
              </h3>
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <img
                  src={data?.provider?.profilePicture ?? Profile}
                  alt="Profile"
                  className="w-[53.7px] h-[53.7px] rounded-full object-cover"
                />

                <div>
                  <h4 className="text-[14px] font-semibold text-black">
                    {data?.provider?.name}
                  </h4>
                </div>

                <div>
                  <p className="text-[14px] font-medium text-[#00000080]">
                    Email
                  </p>
                  <p className="text-[14px] font-semibold text-black">
                    {data?.provider?.email}
                  </p>
                </div>

                <div>
                  <p className="text-[14px] font-medium text-[#00000080]">
                    Phone Number
                  </p>
                  <p className="text-[14px] font-semibold text-black">
                    {data?.provider?.phone}
                  </p>
                </div>

                <div
                  onClick={() =>
                    navigate(
                      `/app/service-provider-detail/${data?.provider?._id}`
                    )
                  }
                  className="w-[150.04px]"
                >
                  <Button text="View Profile" />
                </div>
              </div>
            </section>

            {/* Appointment For */}
            <section>
              <h3 className="text-[24px] font-semibold text-black mb-4">
                Appointment For
              </h3>
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <img
                  src={data?.user?.profilePicture ?? Profile}
                  alt="Profile"
                  className="w-[53.7px] h-[53.7px] rounded-full object-cover"
                />

                <div>
                  <h4 className="text-[14px] font-semibold text-black">
                    {data?.user?.firstName} {data?.user?.lastName}
                  </h4>
                </div>

                <div>
                  <p className="text-[14px] font-medium text-[#00000080]">
                    Email
                  </p>
                  <p className="text-[14px] font-semibold text-black">
                    {data?.user?.email}
                  </p>
                </div>

                <div>
                  <p className="text-[14px] font-medium text-[#00000080]">
                    Phone Number
                  </p>
                  <p className="text-[14px] font-semibold text-black">
                    {data?.user?.phone}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Section */}
          <div className="col-span-4">
            <div className="bg-[#FAFAFA] rounded-[8px] p-4 space-y-4">
              <div className="border-b pb-3">
                <button className="bg-[#FF620014] text-[16px] font-medium text-[#FF6200] w-full rounded-[4px] h-[44px]">
                  {data?.status}
                </button>
              </div>

              <div>
                <h3 className="text-[24px] font-semibold mt-3 mb-4">
                  Appointment Detail
                </h3>

                <div className="space-y-2 text-sm text-gray-700">
                  {[
                    { label: "ID", value: data?.shortCode },
                    {
                      label: "Date",
                      value: getDateFormat(data?.appointmentDate),
                    },
                    { label: "Time", value: data?.appointmentTime },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-3"
                    >
                      <p className="font-medium text-[#00000080]">
                        {item.label}
                      </p>
                      <p className="font-semibold text-black">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppoitmentDetail;
