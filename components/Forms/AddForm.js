"use client";
import { useState, useRef } from "react";
import { BiPlus, BiReceipt } from "react-icons/bi";
import Success from "../Alerts/Success";
import Bug from "../Alerts/Bug";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { addStudent, getStudents } from "../../lib/helper";
import { toggleChangeAction } from "../../redux/reducer";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { generateUniqueVoucherCode } from "../VoucherTable/GenerateVoucherCode/GenerateVoucherCode";
import PrintVoucher from "../VoucherTable/PrintVoucher/PrintVoucher";

export default function AddUserForm({ formData, setFormData }) {
  let {
    name,
    fatherName,
    category,
    studentClass,
    AdmissionDate,
    grNo,
    fees,
    SecurityFee,
    StationaryFee,
    IDFee,
    lateFees,
    feesPaidMonths,
    MaintenanceFee,
    admissionFees,
    contactNo,
    remarks,
    status,
  } = formData;

  const [newVoucherCode, setNewVoucherCode] = useState("");
  const [printButton, setprintButton] = useState(false);
  const [printVoucher, setPrintVoucher] = useState(false);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const addMutation = useMutation(addStudent, {
    onSuccess: () => {
      queryClient.prefetchQuery("students", getStudents);
      setTimeout(() => {
        dispatch(toggleChangeAction()); // Toggle off the form after 3 seconds
      }, 1500);
    },
  });
  const { data: students, refetch } = useQuery("students", getStudents);

  const admissionVoucherRef = useRef();

  const printAdmissionVoucher = useReactToPrint({
    content: () => admissionVoucherRef.current,
    onBeforeGetContent: async () => {},
  });

  const handleGenerateVoucher = async () => {
    setprintButton(true);
    const voucherCode = await generateUniqueVoucherCode(students);
    setNewVoucherCode(voucherCode);
    setPrintVoucher(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (printVoucher === true) {
      await printAdmissionVoucher();
      setprintButton(false);
      setPrintVoucher(false);
    }

    if (Object.keys(formData).length === 0) {
      console.log("Don't have any data");
    }
    const currentDate = new Date();
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(currentDate);

    const model = {
      name,
      fatherName,
      category,
      studentClass,
      AdmissionDate,
      grNo,
      fees,
      SecurityFee,
      StationaryFee,
      IDFee,
      feesPaidMonths: feesPaidMonths ?? [],
      MaintenanceFee,
      admissionFees,
      contactNo,
      remarks,
      status: status ?? "Active",
      voucherCode: { [monthName]: newVoucherCode },
    };

    console.log(model);
    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError) return <Bug message={addMutation.error.message} />;
  if (addMutation.isSuccess)
    return <Success message={"Added Successfully"}></Success>;

  return (
    <>
      <form
        className="grid lg:grid-cols-2 gap-4 px-10 "
        onSubmit={handleSubmit}
      >
        <div className="input-type">
          <input
            type="text"
            name="name"
            required
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Full Name"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="fatherName"
            required
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Father's Name"
          />
        </div>
        <div className="input-type">
          <select
            name="category"
            required
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Category"
          >
            <option value="">Select Category</option>
            <option value="Daily wages">Daily wages</option>
            <option value="Retired">Retired</option>
            <option value="Contract">Contract</option>
            <option value="Deceased">Deceased</option>
            <option value="VSS">VSS</option>
            <option value="Terminated">Terminated</option>
            <option value="Outsider">Outsider</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        <div className="input-type">
          <select
            name="studentClass"
            required
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Class"
          >
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="Prep-1">Class Prep-1</option>
            <option value="Prep-2">Class Prep-2</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </div>
        <div className="input-type">
          <input
            type="text"
            name="grNo"
            required
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="G.R No"
          />
        </div>
        <div className="input-type flex items-center">
          <span className="pr-1 w-1/8">Fees: </span>
          <input
            type="text"
            name="fees"
            required
            onChange={setFormData}
            className="border w-1/4 ml-1 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Monthly"
          />
          <input
            type="text"
            name="SecurityFee"
            required
            onChange={setFormData}
            className="border ml-1 w-1/4 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Security"
          />
          <input
            type="text"
            name="StationaryFee"
            required
            onChange={setFormData}
            className="border ml-1 w-1/4 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Stationary"
          />
          <input
            type="text"
            name="IDFee"
            required
            onChange={setFormData}
            className="border ml-1 w-1/4 px-5 py-3 focus:outline-none rounded-md"
            placeholder="ID Card"
          />
          <input
            type="text"
            name="MaintenanceFee"
            required
            onChange={setFormData}
            className="border w-1/4 ml-1 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Maintenance"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="contactNo"
            required
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Contact Number"
          />
        </div>

        <div className="input-type ">
          <span className="px-1">Admission Date: </span>
          <input
            type="date"
            name="AdmissionDate"
            required
            onChange={setFormData}
            className="border px-5 py-3 focus:outline-none rounded-md"
            placeholder="Admission Date"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="remarks"
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Remarks"
          />
        </div>

        <div className="flex items-center">
          <span className="px-1">Status: </span>

          <div className="px-2 form-check">
            <input
              type="radio"
              value="Active"
              id="radioDefault1"
              onChange={setFormData}
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block text-gray-800"
            >
              Active
            </label>
          </div>
          <div className=" form-check">
            <input
              type="radio"
              value="Inactive"
              id="radioDefault2"
              name="status"
              onChange={setFormData}
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-rose-500 checked:border-rose-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-800"
            >
              Inactive
            </label>
          </div>
        </div>
        <div className="input-type flex items-center">
          <input
            type="text"
            name="admissionFees"
            onChange={setFormData}
            className="border w-1/4 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Admission Fees"
          />
          <input
            type="text"
            name="voucherCode"
            className="border w-1/4 ml-2 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Voucher Code"
            value={newVoucherCode}
            disabled
          />
          <button
            type="button"
            onClick={handleGenerateVoucher}
            className={`flex justify-center text-md w-1/4 ml-3 bg-green-800 text-white px-4 py-2 border rounded-md transition duration-300  ${
              printButton === false ? " hover:bg-green-700" : "opacity-50 "
            } `}
            disabled={printButton === true}
          >
            {`${printButton === false ? "Generate Code" : "Ready to Print"}`}
            <span className="px-1">
              <BiReceipt size={24} />
            </span>
          </button>
        </div>

        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
          Add
          <span className="px-1">
            <BiPlus size={24} />
          </span>
        </button>
      </form>

      <div style={{ display: "none" }}>
        <div ref={admissionVoucherRef}>
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
            admissionFees={admissionFees}
            feesPaidMonths={feesPaidMonths}
            grNo={grNo}
            fees={fees}
            newVoucherCode={newVoucherCode}
          />
        </div>
      </div>
    </>
  );
}
