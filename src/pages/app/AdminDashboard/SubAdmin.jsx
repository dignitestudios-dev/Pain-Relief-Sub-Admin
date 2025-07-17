import { useCallback, useRef, useState } from "react";
import SubAdminTable from "../../../components/app/AdminDashboard/subadmin/SubAdminTable";
import CreateSubAdminModal from "../../../components/app/AdminDashboard/subadmin/CreateSubAdminModal";
import { useFetchData } from "../../../hooks/api/Get";
import TableLoader from "../../../components/global/TableLoader";
import Button from "../../../components/global/Button";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Pagination from "../../../components/global/Pagination";
import axios from "../../../axios";
import { CreateSubAdminSchema } from "../../../schema/editForm/editFormSchema";
import { useFormik } from "formik";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import ServiceRequestModal from "../../../components/app/AdminDashboard/service/ServiceRequestModal";

const SubAdmin = () => {
  const debounceRef = useRef();

  const [subAdminModal, setSubAdminModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [delRequestModal, setDelRequestModal] = useState(null);

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  }, []);

  const { data, loading, pagination } = useFetchData(
    `admin/get-sub-admins`,
    { search },
    page,
    update
  );

  const handlePageChange = (page) => {
    setPage(page);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        // lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: CreateSubAdminSchema,
      onSubmit: async (values, { resetForm }) => {
        const payload = {
          firstName: values.firstName,
          // lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
        };

        try {
          setBtnLoading(true);
          await axios.post("/admin/create-subAdmin", payload);
          // 🔁 Optional: show success toast, close modal, etc.
          resetForm();
          setSubAdminModal(false);
          setUpdate((prev) => !prev);
          SuccessToast("Added Successfully");
        } catch (error) {
          ErrorToast(error?.response?.data?.message);
          console.error(
            "Error creating sub admin:",
            error?.response?.data?.message
          );
        } finally {
          setBtnLoading(false);
        }
      },
    });

  const deleteSubAdmin = async () => {
    try {
      setDelLoading(true);
      const response = await axios.post("/admin/delete-sub-admin", {
        subAdminId: delRequestModal,
      });
      if (response.status === 200) {
        SuccessToast("Delete Successfully");
        setDelRequestModal(null);
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setDelLoading(false);
    }
  };

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
        <>
          <SubAdminTable
            setSubAdminModal={setSubAdminModal}
            data={data}
            delLoading={delLoading}
            setDelRequestModal={setDelRequestModal}
          />
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
      {subAdminModal && (
        <CreateSubAdminModal
          onCLose={() => setSubAdminModal(false)}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          btnLoading={btnLoading}
        />
      )}
      {delRequestModal && (
        <ServiceRequestModal
          btnText="Delete"
          title="Delete Request"
          content="Are you sure?"
          onClose={() => setDelRequestModal(null)}
          handleClick={deleteSubAdmin}
          delLoading={delLoading}
        />
      )}
    </div>
  );
};

export default SubAdmin;
