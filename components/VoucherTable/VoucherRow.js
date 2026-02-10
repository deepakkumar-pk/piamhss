import React, { useState, useRef } from "react";
import { RiPrinterLine } from "react-icons/ri";
import Image from "next/image";
import pic from "../../public/images/pic.svg";
import PropTypes from "prop-types";
import { useReactToPrint } from "react-to-print";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getStudents, updateStudent } from "../../lib/helper";
import PrintVoucher from "../VoucherTable/PrintVoucher/PrintVoucher";
import { generateUniqueVoucherCode } from "./GenerateVoucherCode/GenerateVoucherCode";

const VoucherRow = (props) => {
  const annualToggle = useSelector((state) => state.app.client.annualFund);
  const currentPage = useSelector((state) => state.app.client.currentPage);
  const studentsPerPage = useSelector((state) => state.app.client.studentsPerPage);
  const [newVoucherCode, setNewVoucherCode] = useState("");

  const {
    _id,
    name,
    fatherName,
    category,
    studentClass,
    SecurityFee,
    lateFees,
    StationaryFee,
    IDFee,
    MaintenanceFee,
    feesPaidMonths,
    grNo,
    fees,
    remarks,
    status,
  } = props;

  const [isHovering, setIsHovering] = useState(false);
  const voucherContentRef = useRef();
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    if (remarks) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const { data: students } = useQuery(
    ["students", currentPage, studentsPerPage],
    () => getStudents(currentPage, studentsPerPage)
  );

  const GenerateUniqueVoucherCode = generateUniqueVoucherCode(students?.students || []);

  const mutation = useMutation((newData) => updateStudent(_id, newData), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const handleGenerateVoucher = useReactToPrint({
    content: () => voucherContentRef.current,

    onBeforeGetContent: async () => {
      const currentDate = new Date();
      const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(currentDate);
      const voucherCode = await GenerateUniqueVoucherCode;
      setNewVoucherCode(voucherCode);

      if (voucherCode) {
        const existingVoucherCode =
          students?.students?.find((student) => student._id === _id)?.voucherCode || [];
        const updatedVoucherCode = [
          ...existingVoucherCode,
          { [monthName]: voucherCode },
        ];

        await mutation.mutateAsync({
          studentId: _id,
          voucherCode: updatedVoucherCode,
        });
      } else {
        console.log("Invalid Voucher");
      }
    },
  });

  return (
    <tr className="bg-gray-50 text-center">
      <td className="whitespace-nowrap pl-6 pr-16 py-2 flex flex-row items-center">
        <Image
          src={pic}
          width={100}
          height={100}
          alt="Picture of the author"
          className="rounded-full object-cover"
        />
        <span className="text-center m-3  font-semibold">{name}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <span>{fatherName}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <span>{category}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <span>{studentClass}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <span>{grNo}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <span>{fees}</span>
      </td>
      <td
        className="whitespace-nowrap px-6 py-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ position: "relative" }}>
          <button
            className="cursor"
            disabled={!remarks}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`${
                status == "Active" ? "bg-green-500" : "bg-rose-500"
              } text-white px-5 py-1 rounded-full`}
            >
              {status || "Unknown"}
            </span>
          </button>
          {isHovering && (
            <div
              className={`${
                status == "Active" ? "bg-green-500" : "bg-rose-500"
              } text-white px-5 py-2 rounded`}
              style={{
                position: "absolute",
                top: "120%",
                width: "175%",
                left: "50%",
                transform: "translate(-50%, 5px)",
                whiteSpace: "normal",
                zIndex: 1,
              }}
            >
              {remarks}
            </div>
          )}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <button
          className="bg-green-800 hover:bg-green-700 text-white px-5 py-1 rounded-full  "
          onClick={handleGenerateVoucher}
        >
          <span className="flex items-center justify-center">
            <RiPrinterLine size={16} className="mr-2" />
            Print
          </span>
        </button>
      </td>
      <td style={{ display: "none" }}>
        <div ref={voucherContentRef}>
          <PrintVoucher
            name={name}
            fatherName={fatherName}
            category={category}
            studentClass={studentClass}
            SecurityFee={SecurityFee}
            lateFees={lateFees}
            StationaryFee={StationaryFee}
            IDFee={IDFee}
            MaintenanceFee={MaintenanceFee}
            grNo={grNo}
            fees={fees}
            feesPaidMonths={feesPaidMonths}
            newVoucherCode={newVoucherCode}
            annualFund={annualToggle}
          />
        </div>
      </td>
    </tr>
  );
};

VoucherRow.propTypes = {
  name: PropTypes.string.isRequired,
  fatherName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  studentClass: PropTypes.string.isRequired,
  grNo: PropTypes.number.isRequired,
  fees: PropTypes.number.isRequired,
};

export default VoucherRow;