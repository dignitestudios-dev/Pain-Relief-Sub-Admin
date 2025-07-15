import { IoIosArrowRoundBack } from "react-icons/io";

const DetailLoader = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto animate-pulse">
      {/* Back Button */}
      <div className="flex items-center cursor-pointer mb-4">
        <IoIosArrowRoundBack size={18} />
        <div className="ml-2 w-20 h-4 bg-gray-200 rounded" />
      </div>

      {/* Heading */}
      <div className="w-72 h-8 bg-gray-200 rounded mb-6"></div>

      {/* Profile + Action Buttons */}
      <div className="flex justify-between items-center rounded-lg shadow-sm mb-10 bg-[#FAFAFA] p-4">
        {/* Profile Section */}
        <div className="flex items-center">
          <div className="w-[116px] h-[116px] rounded-full bg-gray-300 border border-[#63CFAC] mr-6"></div>
          <div>
            <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
            <div className="w-60 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <div className="w-[184px] h-[49px] bg-gray-200 rounded"></div>
          <div className="w-[184px] h-[49px] bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-4 rounded-md shadow p-2 mb-6">
        {[1, 2].map((_, idx) => (
          <div key={idx} className="w-40 h-10 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default DetailLoader;
