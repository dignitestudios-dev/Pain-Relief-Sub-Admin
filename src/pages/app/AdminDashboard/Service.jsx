import { useCallback, useRef, useState } from "react";

import { IoSearch } from "react-icons/io5";

import ServiceList from "../../../components/app/AdminDashboard/service/ServiceList";
import PainReleifList from "../../../components/app/AdminDashboard/service/PainReleifList";
import CreateModal from "../../../components/app/AdminDashboard/service/CreateModal";
import { useFetchData } from "../../../hooks/api/Get";
import TableLoader from "../../../components/global/TableLoader";
import Pagination from "../../../components/global/Pagination";
const Service = () => {
  const debounceRef = useRef();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("network");
  const [isPainRelief, setIsPainRelief] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  }, []);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const { data, loading, pagination } = useFetchData(
    `admin/get-providers`,
    { isPainReliefCoach: isPainRelief, status: status, search },
    page
  );

  return (
    <div>
      <div className="flex  justify-between items-center mb-4">
        <div className="flex items-center gap-6">
          <h2 className="text-[32px] font-[600] ml-2">Service Provider</h2>
        </div>
        <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[39px] shadow-sm">
          <IoSearch className="text-gray-400 mr-2 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-md py-1 gap-2 w-[400px] h-[39px] shadow-sm">
          <button
            onClick={() => {
              setActiveTab("network");
              setIsPainRelief(false);
            }}
            className={`rounded-[8px] w-full font-[500] text-[16px] h-[39px] transition-all duration-200
      ${
        activeTab === "network"
          ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white"
          : "bg-transparent text-[#212121] "
      }`}
          >
            Network Provider
          </button>

          <button
            onClick={() => {
              setActiveTab("coach");
              setIsPainRelief(true);
            }}
            className={`rounded-[8px] w-full font-[500] text-[16px] h-[39px] transition-all duration-200
      ${
        activeTab === "coach"
          ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white"
          : "bg-transparent text-[#212121] "
      }`}
          >
            Pain Relief Coach
          </button>
        </div>
        {/* <div className="flex items-center gap-8 ">
          <div className="w-[122px]">
            <Button text={"CSV Import"} />
          </div>
          <div className="w-[61px]">
            <Button text={<FaPlus />} onClick={() => setCreateModal(true)} />
          </div>
        </div> */}
      </div>
      <div>
        <div className="flex ml-5  gap-4 mt-2">
          <button
            onClick={() => setStatus("")}
            className={`${
              status === ""
                ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-transparent"
                : "text-[#565656]"
            }  bg-clip-text  font-[500]`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("pending")}
            className={`${
              status === "pending"
                ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-transparent"
                : "text-[#565656]"
            }  bg-clip-text  font-[500]`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatus("approved")}
            className={`${
              status === "approved"
                ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-transparent"
                : "text-[#565656]"
            }  bg-clip-text  font-[500]`}
          >
            Approved
          </button>
          {activeTab === "network" && (
            <button
              onClick={() => setStatus("rejected")}
              className={`${
                status === "rejected"
                  ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-transparent"
                  : "text-[#565656]"
              }  bg-clip-text  font-[500]`}
            >
              Rejected
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <TableLoader />
      ) : (
        <>
          {activeTab === "network" && (
            <>
              <ServiceList data={data} />
              <div className="flex justify-end">
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={handlePageChange}
                  setCurrentPage={page}
                />
              </div>
            </>
          )}

          {activeTab === "coach" && (
            <>
              {" "}
              <PainReleifList data={data} />{" "}
              <div className="flex justify-end">
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={handlePageChange}
                  setCurrentPage={page}
                />
              </div>{" "}
            </>
          )}
          {createModal && <CreateModal onCLose={() => setCreateModal(false)} />}
        </>
      )}
    </div>
  );
};

export default Service;
