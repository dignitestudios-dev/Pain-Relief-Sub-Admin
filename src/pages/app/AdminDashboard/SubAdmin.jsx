import { useCallback, useRef, useState } from "react";
import SubAdminTable from "../../../components/app/AdminDashboard/subadmin/SubAdminTable";
import CreateSubAdminModal from "../../../components/app/AdminDashboard/subadmin/CreateSubAdminModal";
import { useFetchData } from "../../../hooks/api/Get";
import TableLoader from "../../../components/global/TableLoader";
import Button from "../../../components/global/Button";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const SubAdmin = () => {
  const debounceRef = useRef();

  const [subAdminModal, setSubAdminModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  }, []);

  const { data, loading } = useFetchData(`admin/get-sub-admins`, { search }, 1);
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Sub Admin
          </h1>

          <nav className="flex gap-6 text-sm font-medium text-gray-600"></nav>
        </div>
        {/* Search */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[49px] shadow-sm">
            <IoSearch className="text-gray-400 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="w-[61px]">
            <Button text={<FaPlus />} onClick={() => setSubAdminModal(true)} />
          </div>
        </div>
      </div>
      {loading ? (
        <TableLoader />
      ) : (
        <SubAdminTable setSubAdminModal={setSubAdminModal} data={data} />
      )}
      {subAdminModal && (
        <CreateSubAdminModal onCLose={() => setSubAdminModal(false)} />
      )}
    </div>
  );
};

export default SubAdmin;
