/* eslint-disable react/prop-types */

import { FiTrash2 } from "react-icons/fi";

const MembersPlanTable = ({
  data,
  handleViewDetail,
  setDelRequestModal,
  delLoading,
}) => {
  return (
    <div className="bg-[#FAFAFA]  rounded-md">
      <div
        className="grid grid-cols-[40px_2fr_4fr_2fr] gap-4 px-4 py-3 rounded-md text-[14px] font-[500] text-black"
        style={{
          background:
            "linear-gradient(234.85deg, rgba(41, 171, 226, 0.2) -20.45%, rgba(99, 207, 172, 0.2) 124.53%)",
        }}
      >
        <div>#</div>
        <div>Name</div>
        <div>Description</div>
        {/* <div>Membership Benefits</div>
        <div>Membership Type</div>
        <div>Price</div> */}
        <div className="flex mx-10">Action</div>
      </div>

      <div className="divide-y">
        {data.length > 0 ? (
          data.map((subscription, index) => (
            <div
              key={subscription.id}
              className="grid grid-cols-[40px_2fr_4fr_2fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
            >
              <div>{index + 1}</div>
              <div>{subscription.name}</div>
              <div>
                {subscription?.features?.length
                  ? subscription.features.join(", ").slice(0, 100) +
                    (subscription.features.join(", ").length > 100 ? "..." : "")
                  : "Not Defined By Admin"}
              </div>
              {/* <div>{subscription.benefit ?? "Not Defined By Admin"}</div>
              <div>{subscription.category}</div>
              <div>{subscription.amount}$</div> */}
              <div className="flex justify-evenly">
                <div
                  className="font-medium flex justify-end underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
                  onClick={() => handleViewDetail(subscription)}
                >
                  View Detail
                </div>

                <button
                  type="button"
                  onClick={() => setDelRequestModal(subscription?._id)}
                  disabled={delLoading}
                  className={`flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 col-span-7">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersPlanTable;
