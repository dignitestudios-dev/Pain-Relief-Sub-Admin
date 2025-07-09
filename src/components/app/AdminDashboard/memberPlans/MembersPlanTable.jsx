/* eslint-disable react/prop-types */

const MembersPlanTable = ({ data, handleViewDetail }) => {
  return (
    <div className="bg-[#FAFAFA]  rounded-md">
      <div
        className="grid grid-cols-[40px_1.2fr_2fr_2fr_1fr_1fr_1fr] gap-4 px-4 py-3 rounded-md text-[14px] font-[500] text-black"
        style={{
          background:
            "linear-gradient(234.85deg, rgba(41, 171, 226, 0.2) -20.45%, rgba(99, 207, 172, 0.2) 124.53%)",
        }}
      >
        <div>#</div>
        <div>Name</div>
        <div>Description</div>
        <div>Membership Benefits</div>
        <div>Membership Type</div>
        <div>Price</div>
        <div>Action</div>
      </div>

      <div className="divide-y">
        {data.length > 0 ? (
          data.map((subscription, index) => (
            <div
              key={subscription.id}
              className="grid grid-cols-[40px_1.2fr_2fr_2fr_1fr_1fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
            >
              <div>{index + 1}</div>
              <div>{subscription.planName}</div>
              <div>{subscription.description ?? "Not Defined By Admin"}</div>
              <div>{subscription.benefit ?? "Not Defined By Admin"}</div>
              <div>{subscription.category}</div>
              <div>{subscription.amount}$</div>
              <div
                className="font-medium underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
                onClick={() => handleViewDetail(subscription)}
              >
                View Detail
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
