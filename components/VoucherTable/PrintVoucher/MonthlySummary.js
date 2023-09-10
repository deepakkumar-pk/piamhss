import React from "react";
import Image from "next/image";
import schoolLogo from "../../../public/images/logo1.png";

const MonthlySummary = ({ students }) => {
  const currentMonthIndex = new Date().getMonth();
  const mapToYearMonth = (monthIndex) => (monthIndex + 9) % 12;
  const currentYearMonth = mapToYearMonth(currentMonthIndex);

  const currentMonthsList = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  const getRemainingAmount = (student) => {
    let lateFeesAmount = parseFloat(student.lateFees) || 0;
    const currentFees = parseFloat(student.fees) || 0;
    const monthsChecked = student.feesPaidMonths.length || 0;
    const totalMonths = currentYearMonth;
    const remainingAmount = (
      currentFees *
        (monthsChecked > totalMonths ? 0 : totalMonths - monthsChecked) +
      lateFeesAmount
    ).toFixed(2);

    return remainingAmount;
  };

  const getUnpaidMonths = (student) => {
    const unpaidMonths = currentMonthsList.filter((month, index) => {
      return (
        index < currentYearMonth && !student.feesPaidMonths.includes(month)
      );
    });

    if (unpaidMonths.length > 0) {
      return unpaidMonths.join(", ");
    } else {
      return "-";
    }
  };

  const getTotalFees = (students) => {
    let totalFees = 0;
    students?.forEach((student) => {
      let currentRemainingAmount = parseFloat(getRemainingAmount(student)) || 0;
      let feesAmount = parseFloat(student.fees) || 0;

      totalFees += (currentRemainingAmount>0?0: feesAmount) + currentRemainingAmount;
    });
    return totalFees;
  };

  const getTotalPaidFees = (students) => {
    let totalPaidFees = 0;
    students?.forEach((student) => {
      let currentRemainingAmount = parseFloat(getRemainingAmount(student));

      let lateFeesAmount = parseFloat(student.lateFees) || 0;
      let feesAmount = parseFloat(student.fees) || 0;

      totalPaidFees += 
        feesAmount + lateFeesAmount - getRemainingAmount(student);
    });
    return totalPaidFees>0?totalPaidFees:0;
  };

  const getRemainingFees = (students) => {
    let remainingFees = 0;
    students?.forEach((student) => {
      let currentRemainingAmount = parseFloat(getRemainingAmount(student)) || 0;
      remainingFees += currentRemainingAmount;
    });
    return remainingFees;
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-center">
        <div className="mr-4">
          <Image src={schoolLogo} width={75} height={75} alt="School Logo" />
        </div>
        <h1 className="text-2xl md:text-3xl text-green-800 font-bold">
          PIA Model Higher Secondary School
        </h1>
      </div>
      <div className="text-center">
        <h5 className="text-lg md:text-2xl text-green-800 font-bold pb-3 ">
          {`Monthly Summary of ${
            currentMonthsList[currentYearMonth - 1]
          }, ${new Date().getFullYear()}`}
        </h5>
      </div>

      <table className="min-w-full mb-6 table-auto  ">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">Name</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">{"Father's Name"}</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">Category</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">Class</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">G.R No</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">Status</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">Unpaid Months</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">Late Fees</span>
            </th>
            <th className="px-2 py-1">
              <span className="text-gray-900 text-sm">Remaining Amount</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr
              key={student._id}
              className="text-center border-solid border-b-2"
            >
              <td className="px-2 py-1 font-semibold">
                <span className="text-sm">{student.name}</span>
              </td>
              <td className="px-2 py-1">
                <span className="text-sm">{student.fatherName}</span>
              </td>
              <td className="px-2 py-1">
                <span className="text-sm">{student.category}</span>
              </td>
              <td className="px-2 py-1">
                <span className="text-sm">{student.studentClass}</span>
              </td>
              <td className="px-2 py-1">
                <span className="text-sm">{student.grNo}</span>
              </td>

              <td className="px-2 py-1">
                <span className="text-sm">{student.status}</span>
              </td>
              <td className="px-2 py-1">
                <span className="text-sm">{getUnpaidMonths(student)}</span>
              </td>
              <td className="px-2 py-1">
                <span className="text-sm">
                  {student.lateFees > 0 ? student.lateFees : "-"}
                </span>
              </td>
              <td className="px-2 py-1">
                <span className="text-sm">{getRemainingAmount(student)}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 ">
            <td className="px-2 py-1" colSpan={999}>
              <div className="flex justify-around">
                <span className="text-gray-900 text-base font-semibold">
                  Total Fees: Rs {getTotalFees(students)}
                </span>
                <span className="text-gray-900 text-base font-semibold">
                  Total Paid Fees: {getTotalPaidFees(students)}
                </span>
                <span className="text-gray-900 text-base font-semibold">
                  Total Remaining Fees: {getRemainingFees(students)}
                </span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MonthlySummary;
