import React, { useState, useRef, useEffect } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import Image from "next/image";
import pic from "../../public/images/pic.svg";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { useReactToPrint } from "react-to-print";
import { getStudents, updateStudent } from "../../lib/helper";

import {
  toggleChangeAction,
  updateAction,
  deleteAction,
  monthlySummary,
} from "../../redux/reducer";
import MonthlySummary from "../../components/VoucherTable/PrintVoucher/MonthlySummary";

const StudentRow = (props) => {
  const {
    _id,
    name,
    fatherName,
    category,
    studentClass,
    grNo,
    fees,
    remarks,
    status,
  } = props;
  const visible = useSelector((state) => state.app.client.toggleForm);
  const handleMonthlySummary = useSelector(
    (state) => state.app.client.monthlySummary
  );
  const { data: students } = useQuery("students", getStudents);

  const currentDate = new Date();
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(currentDate);

  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseEnter = () => {
    if (remarks) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  const handleGenerateMonthlySummary = useReactToPrint({
    content: () => allStudentsRef.current,
    onBeforeGetContent: async () => {
      allStudentsRef.current.style.display = "block";
    },
    onAfterPrint: () => {
      allStudentsRef.current.style.display = "none";
    },
  });

  // Reference to the container holding all students' fee receipts
  const allStudentsRef = useRef();

  if (handleMonthlySummary) {
    handleGenerateMonthlySummary();
    dispatch(monthlySummary(false));
  }

  return (
    <tr class="bg-gray-50 text-center">
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
      <td className="whitespace-nowrap px-6 py-2 space-x-2">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
      <td>
        <div style={{ display: "none" }}>
          <div ref={allStudentsRef}>
            <MonthlySummary students={students} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
