import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getStudents } from "@/lib/helper";
import StudentRow from "./StudentRow";
import AddNewStudent from "../VoucherTable/AddNewStudent";
import Pagination from "../../components/Pagination";

const StudentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const filterCriteria = useSelector(
    (state) => state.app.client.defaulterDataFilter
  );
  const searchFilter = useSelector((state) => state.app.client.searchValue);
  const studentClassFilter = useSelector(
    (state) => state.app.client.studentClassFilter
  );

  // Build query params
  const queryParams = {
    page: currentPage,
    limit: 20,
    ...(studentClassFilter && { studentClass: studentClassFilter }),
    ...(filterCriteria && { status: 'defaulter' }),
    ...(searchFilter && { search: searchFilter }),
  };

  const { isLoading, isError, data, error } = useQuery(
    ["students", queryParams],
    () => getStudents(queryParams),
    {
      keepPreviousData: true,
    }
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCriteria, searchFilter, studentClassFilter]);

  if (isLoading) return <div>Students Data Loading...</div>;
  if (isError) return <div>Got Error {error?.message}</div>;

  const students = data?.students || [];
  const pagination = data?.pagination || { total: 0, page: 1, totalPages: 1 };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full relative text-center table-fixed">
              <thead className="">
                <tr className="">
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">Name</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">{"Father's Name"}</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">Category</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">Class</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">G.R</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">Fees</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">Status</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800">
                    <span className="text-gray-200">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {students.length > 0 ? (
                  students.map((student, i) => (
                    <StudentRow key={student._id} {...student} />
                  ))
                ) : (
                  <AddNewStudent />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default StudentTable;