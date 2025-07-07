import { useCallback, useRef, useState } from "react";
import MemberTable from "../../../components/app/AdminDashboard/member/MemberTable";
import { useFetchData } from "../../../hooks/api/Get";
import TableLoader from "../../../components/global/TableLoader";

const Member = () => {
  const debounceRef = useRef();

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [isSubscribed, setIsSubscribed] = useState("");

  // Filter members by tab
  const handleTab = (tab) => {
    setActiveTab(tab);
    if (tab === "Unsubscribed") {
      setIsSubscribed(false);
    } else if (tab === "Subscribed") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed("");
    }
  };

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
    setTypeValue(value);
  }, []);

  const { data, loading } = useFetchData(
    `/admin/get-all-members`,
    { isSubscribed, search },
    1
  );

  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : (
        <MemberTable
          data={data}
          handleTab={handleTab}
          handleSearch={handleSearch}
          typeValue={typeValue}
          activeTab={activeTab}
        />
      )}
    </div>
  );
};

export default Member;
