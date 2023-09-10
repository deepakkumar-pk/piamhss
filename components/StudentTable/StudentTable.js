import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getStudents } from "@/lib/helper";
import StudentRow from "./StudentRow";
import AddNewStudent from "../VoucherTable/AddNewStudent";

const StudentTable = () => {
  const filterCriteria = useSelector(
    (state) => state.app.client.defaulterDataFilter
  );
  const searchFilter = useSelector((state) => state.app.client.searchValue);
  const studentClassFilter = useSelector(
    (state) => state.app.client.studentClassFilter
  );

  const { isLoading, isError, data, error } = useQuery("students", getStudents);

  if (isLoading) return <div>Students Data Loading...</div>;
  if (isError) return <div>Got Error {error?.message}</div>;

  let filteredStudents;


if (data.length > 0) {
  // Filter the data to show only inactive students
  const inactiveStudents = data?.filter(
    (student) => student.status !== "Active"
  );

  // Filter the data based on the search filter
  const searchStudent = data.filter((student) =>
    student.name?.toLowerCase().includes(searchFilter?.toLowerCase())
  );

  // Filter the data based on the student class
  const classFilteredStudents = studentClassFilter
    ? data.filter((student) => student.studentClass === studentClassFilter)
    : [];
  
   filteredStudents = data;

  if (filterCriteria) {
    filteredStudents = inactiveStudents;
  } else if (searchFilter) {
    filteredStudents = searchStudent;
  } else if (studentClassFilter) {
    filteredStudents = classFilteredStudents;
  }
}



  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full">
          <div class="overflow-hidden">
            <table class="min-w-full relative text-center table-fixed ">
              <thead class="">
                <tr className="">
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200 ">Name</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200">{"Father's Name"}</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200">Category</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200">Class</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200">G.R</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200">Fees</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200">Status</span>
                  </th>
                  <th scope="col" className="px-6 py-2 bg-gray-800 ">
                    <span className="text-gray-200">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filteredStudents ? (
                  filteredStudents?.map((student, i) => (
                    <StudentRow key={i} {...student} />
                  ))
                ) : (
                  <AddNewStudent />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
