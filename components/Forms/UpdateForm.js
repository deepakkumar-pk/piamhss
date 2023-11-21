import { useState, useEffect } from "react";
import { BiBrush } from "react-icons/bi";
import Success from "../Alerts/Success";
import Bug from "../Alerts/Bug";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addStudent, getStudent, getStudents, updateStudent } from "../../lib/helper";
import { toggleChangeAction } from "../../redux/reducer";
import { MdOutlineWatchLater, MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

export default function UpdateUserForm({ formId, formData, setFormData }) {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["students", formId],
    () => getStudent(formId)
  );
  // Set default value for feesPaidMonths based on fetched data

  const [feesPaidMonths, setFeesPaidMonths] = useState([]);
  const [lateFees, setlateFees] = useState(0);
  useEffect(() => {
    if (data) {
      setFeesPaidMonths(data.feesPaidMonths || []);
      setlateFees(data.lateFees || 0);
    }
  }, [data]);

  const months = [
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
  // const currentMonthIndex = 0;
  const currentMonthIndex = new Date().getMonth();

  // Function to handle wrap-around and map month index to the year's months
  const mapToYearMonth = (monthIndex) => (monthIndex + 9) % 12;

  const currentYearMonth = mapToYearMonth(currentMonthIndex);

  let targetMonth;

  switch (currentYearMonth) {
    case 0: // April
      targetMonth = 3;
      break;
    case 1: // May
      targetMonth = 4;
      break;
    case 2: // June
      targetMonth = 5;
      break;
    case 3: // July
      targetMonth = 6;
      break;
    case 4: // August
      targetMonth = 7;
      break;
    case 5: // September
      targetMonth = 8;
      break;
    case 6: // October
      targetMonth = 9;
      break;
    case 7: // November
      targetMonth = 10;
      break;
    case 8: // December
      targetMonth = 11;
      break;
    case 9: // January
      targetMonth = 12;
      break;
    case 10: // February
      targetMonth = 13;
      break;
    case 11: // March
      targetMonth = 14;
      break;
    default:
      targetMonth = "Invalid month";
  }

  const isUpcomingMonth = (monthIndex) => monthIndex > targetMonth;

  const UpdateMutation = useMutation(
    (newData) => updateStudent(formId, newData),
    {
      onSuccess: async (data) => {
        queryClient.prefetchQuery("students", getStudents);
        setTimeout(() => {
          dispatch(toggleChangeAction()); // Toggle off the form after 3 seconds
        }, 1500);
      },
    }
  );

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  let {
    name,
    fatherName,
    category,
    studentClass,
    AdmissionDate,
    grNo,
    fees,
    CNIC,
    SecurityFee,
    StationaryFee,
    IDFee,
    MaintenanceFee,
    admissionFees,
    contactNo,
    remarks,
    status,
  } = data;

  // Calculate the remaining amount based on fees and months paid
  let lateFeesAmount = parseFloat(lateFees);
  const currentFees = parseFloat(fees); // Assuming fees is a number
  const monthsChecked = feesPaidMonths.length;
  const totalMonths = currentYearMonth + 1;
  const remainingAmount = (
    currentFees * (totalMonths - monthsChecked) +
    lateFeesAmount
  ).toFixed(2);
  const handleAddLateFees = () => {
    let lateFeesAmount = parseFloat(lateFees || 0) + 200;
    setlateFees(lateFeesAmount);
  };

  const handleClearAllDues = () => {
    // Get the total months (including the current month)
    const totalMonths = currentYearMonth + 1;

    // Filter the months to include only those that are not upcoming (before or equal to the current month)
    const clearedMonths = months.slice(0, totalMonths);

    // Set the feesPaidMonths state to the clearedMonths array
    setFeesPaidMonths(clearedMonths);

    // Reset the lateFees state to 0
    setlateFees(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      feesPaidMonths: feesPaidMonths, // Save the selected months
      remainingAmount: remainingAmount, // Update the remaining amount in the form data
      lateFees: lateFees, // Update the remaining amount in the form data
      ...formData,
    };
    await UpdateMutation.mutate(updatedData);
  };

  if (UpdateMutation.isLoading) return <div>Loading!</div>;
  if (UpdateMutation.isError)
    return <Bug message={UpdateMutation.error.message} />;
  if (UpdateMutation.isSuccess)
    return <Success message={"Updated Successfully"} />;

  return (
    <>
      <form className="grid lg:grid-cols-2 gap-4 px-10" onSubmit={handleSubmit}>
        <div className="input-type">
          <input
            type="text"
            name="name"
            onChange={setFormData}
            defaultValue={name}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Full Name"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="fatherName"
            onChange={setFormData}
            defaultValue={fatherName}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Father's Name"
          />
        </div>
        <div className="input-type">
          <select
            name="category"
            onChange={setFormData}
            defaultValue={category}
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
            onChange={setFormData}
            defaultValue={studentClass}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Class"
          >
            <option value="">Select Class</option>
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
            onChange={setFormData}
            defaultValue={grNo}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="G.R No"
          />
        </div>
        <div className="input-type flex items-center">
          <span className="pr-1 w-1/8">Fees: </span>
          <input
            type="text"
            name="fees"
            onChange={setFormData}
            defaultValue={fees}
            className="border w-1/4 ml-1 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Monthly"
          />
          <input
            type="text"
            name="SecurityFee"
            onChange={setFormData}
            defaultValue={SecurityFee}
            className="border ml-1 w-1/4 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Security"
          />
          <input
            type="text"
            name="StationaryFee"
            onChange={setFormData}
            defaultValue={StationaryFee}
            className="border ml-1 w-1/4 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Stationary"
          />
          <input
            type="text"
            name="IDFee"
            onChange={setFormData}
            defaultValue={IDFee}
            className="border ml-1 w-1/4 px-5 py-3 focus:outline-none rounded-md"
            placeholder="ID Card"
          />
          <input
            type="text"
            name="MaintenanceFee"
            onChange={setFormData}
            defaultValue={MaintenanceFee}
            className="border w-1/4 ml-1 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Maintenance"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="CNIC"
            defaultValue={CNIC}
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Father's CNIC"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="contactNo"
            defaultValue={contactNo}
            onChange={setFormData}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Contact Number"
          />
        </div>

        <div className="input-type mt-2">
          <span className="text-base font-medium px-1">Fees Paid: </span>
          {months.map((month, index) => {
            let myMonth;

            switch (index) {
              case 0: // April
                myMonth = 3;
                break;
              case 1: // May
                myMonth = 4;
                break;
              case 2: // June
                myMonth = 5;
                break;
              case 3: // July
                myMonth = 6;
                break;
              case 4: // August
                myMonth = 7;
                break;
              case 5: // September
                myMonth = 8;
                break;
              case 6: // October
                myMonth = 9;
                break;
              case 7: // November
                myMonth = 10;
                break;
              case 8: // December
                myMonth = 11;
                break;
              case 9: // January
                myMonth = 12;
                break;
              case 10: // February
                myMonth = 13;
                break;
              case 11: // March
                myMonth = 14;
                break;
              default:
                myMonth = "Invalid month";
            }
            return (
              <div
                key={month}
                className="form-check"
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                <input
                  type="checkbox"
                  id={`checkbox-${month}`}
                  name={`checkbox-${month}`}
                  className="form-check-input mr-1"
                  onChange={(e) => {
                    if (!isUpcomingMonth(index)) {
                      if (e.target.checked) {
                        setFeesPaidMonths((prevMonths) => [
                          ...prevMonths,
                          month,
                        ]);
                      } else {
                        setFeesPaidMonths((prevMonths) =>
                          prevMonths.filter((m) => m !== month)
                        );
                      }
                    }
                  }}
                  checked={feesPaidMonths.includes(month)}
                  disabled={isUpcomingMonth(myMonth)}
                />
                <label
                  htmlFor={`checkbox-${month}`}
                  className="inline-block text-gray-800"
                >
                  {month}
                </label>
              </div>
            );
          })}
        </div>

        <div className="input-type flex items-center">
          <input
            type="text"
            name="remainingAmount"
            className={`${
              remainingAmount == 0 ? "bg-green-200" : "bg-red-200"
            } border w-1/2 px-5 py-3 focus:outline-none rounded-md`}
            placeholder="Remaining Amount"
            value={remainingAmount}
            onChange={setFormData}
            disabled
          />
          <span className=" flex flex-wrap w-1/2 ml-2 justify-start">
            <button
              type="button"
              onClick={handleAddLateFees}
              className="flex  bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-red-600 transition duration-300"
            >
              Add Late Fees
              <span className="">
                <MdOutlineWatchLater size={23} />
              </span>
            </button>
            <button
              type="button"
              onClick={handleClearAllDues}
              className="flex bg-green-700 text-white px-4 py-2 border rounded-md hover:bg-green-600 transition duration-300"
            >
              Clear All Dues
              <span className="">
                <MdDeleteOutline size={23} />
              </span>
            </button>
          </span>
        </div>

        <div className="input-type">
          <span className="px-1">Admission Date: </span>
          <input
            type="date"
            name="AdmissionDate"
            onChange={setFormData}
            defaultValue={AdmissionDate}
            className="border px-5 py-3 focus:outline-none rounded-md"
            placeholder="Admission Date"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="remarks"
            onChange={setFormData}
            defaultValue={remarks}
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
              defaultChecked={status === "Active"}
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
          <div className="form-check">
            <input
              type="radio"
              value="Inactive"
              id="radioDefault2"
              name="status"
              onChange={setFormData}
              defaultChecked={status !== "Active"}
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
        <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-gray-900 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">
          Update
          <span className="px-1">
            <BiBrush size={24} />
          </span>
        </button>
      </form>
    </>
  );
}
