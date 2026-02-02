import React, { useState, useEffect } from "react";
import Image from "next/image";
import schoolLogo from "../public/images/logo1.png";
import {
  toggleChangeAction,
  deleteAction,
  voucherShow,
  studentClassFilter,
  monthlySummary,
  searchValue,
  annualFund,
  defaulterDataFilter,
} from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";
import { BiUserPlus, BiX, BiCheck, BiReceipt, BiUser } from "react-icons/bi";
import { useQueryClient } from "react-query";
import Form from "../components/Forms/Form";
import { deleteStudent, getStudents } from "../lib/helper";
import { signOut } from "next-auth/react";
import { FaPowerOff } from "react-icons/fa";


const Header = () => {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const searchBar = useSelector((state) => state.app.client.searchValue);
  const annualToggle = useSelector((state) => state.app.client.annualFund);
  const classValue = useSelector(
    (state) => state.app.client.studentClassFilter
  );
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(toggleChangeAction());
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${formattedDay} ${
    monthNames[currentDate.getMonth()]
  },${year}`;

  const defaulterHandler = () => {
    dispatch(defaulterDataFilter(true));
    dispatch(voucherShow(false));
  };

  const searchStudent = (e) => {
    const result = e.target.value;
    dispatch(searchValue(result));
  };

  const filterByClass = (e) => {
    const result = e.target.value;
    dispatch(studentClassFilter(result));
  };

  const handleAnnualFund = () => {
    if (annualToggle) {
      dispatch(annualFund(false));
    } else {
      dispatch(annualFund(true));
    }
  };

  const activeHandler = () => {
    dispatch(defaulterDataFilter(false));
    dispatch(voucherShow(false));
    dispatch(studentClassFilter(""));
    dispatch(searchValue(""));
  };

  const voucherHandler = () => {
    dispatch(voucherShow(true));
    dispatch(defaulterDataFilter(false));
    dispatch(studentClassFilter(""));
    dispatch(searchValue(""));
  };


  const handleSummary = async () => {
    dispatch(voucherShow(false));
    dispatch(monthlySummary(true));
  };

  const deleteHandler = async () => {
    if (deleteId) {
      await deleteStudent(deleteId);
      await queryClient.prefetchQuery("students", getStudents);
      await dispatch(deleteAction(null));
    }
  };

  const cancelHandler = async () => {
    await dispatch(deleteAction(null));
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-10">
      <div className="bg-green-100 py-2 ">
        <div class="grid grid-cols-3 gap-4 ">
          <div class="text-center text-green-900 font-semibold text-base">
            Date: {formattedDate}
          </div>
          <div
            class="text-center text-green-900 font-semibold text-base"
            suppressHydrationWarning
          >
            Time: {currentTime.toLocaleTimeString()}
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-3  w-full ">
              <label
                htmlFor="toggleAnnualFund"
                className="flex items-center cursor-pointer"
              >
                <div className="flex items-center justify-center ">
                  <div className="relative">
                    <input
                      id="toggleAnnualFund"
                      type="checkbox"
                      className="sr-only"
                      checked={annualToggle}
                      onChange={handleAnnualFund}
                    />
                    <div className="w-10 h-4 bg-green-900 rounded-full shadow-inner"></div>
                    <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                  </div>
                  <div className="ml-1 text-green-800 font-medium">
                    Annual Fund
                  </div>
                </div>
              </label>
              <div
                className="flex items-center justify-center text-green-800 px-4 cursor-pointer"
                onClick={() => signOut()}
              >
                <span className="mr-1 relative w-6 h-6 bg-white rounded-full shadow-2xl">
                  <FaPowerOff className="text-xl absolute  " />
                </span>

                <button className="font-medium">Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mr-4">
            <Image src={schoolLogo} width={75} height={75} alt="School Logo" />
          </div>
          <h1 className="text-3xl md:text-5xl text-green-800 font-bold py-2">
            PIA Model Higher Secondary School
          </h1>
        </div>
        <div className="text-center">
          <h5 className="text-lg md:text-3xl text-green-800 font-bold">
            Fees Voucher System
          </h5>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-5 border-b border-gray-300">
          <div className="left flex flex-wrap gap-3 justify-center">
            <button
              onClick={handler}
              className="flex bg-green-600 text-white px-4 py-2 border rounded-md hover:bg-green-700 transition duration-300"
            >
              <span className="mr-2">
                <BiUserPlus size={23} />
              </span>
              Add Student
            </button>
            <button
              onClick={activeHandler}
              className="flex bg-green-600 text-white px-4 py-2 border rounded-md hover:bg-green-700 transition duration-300"
            >
              <span className="mr-2">
                <BiUser size={23} />
              </span>
              All Students
            </button>
            <button
              onClick={defaulterHandler}
              className="flex bg-green-600 text-white px-4 py-2 border rounded-md hover:bg-green-700 transition duration-300"
            >
              <span className="mr-2">
                <BiUser size={23} />
              </span>
              Defaulter Students
            </button>
            <button
              onClick={voucherHandler}
              className="flex bg-green-600 text-white px-4 py-2 border rounded-md hover:bg-green-700 transition duration-300"
            >
              <span className="mr-2">
                <BiReceipt size={23} />
              </span>
              Voucher
            </button>
           
            <button
              className="flex bg-green-800 text-white px-4 py-2 border rounded-md hover:bg-green-700 transition duration-300"
              onClick={handleSummary}
            >
              <span className="mr-2">
                <BiReceipt size={23} />
              </span>
              Monthly Summary
            </button>
            <div className="input-type flex justify-center">
              <input
                type="text"
                value={searchBar}
                onChange={searchStudent}
                className="border px-4 py-2 focus:outline-none rounded-md bg-gray-100 text-green-800"
                placeholder="Search"
              />
            </div>
            <select
              name="studentClass"
              value={classValue}
              onChange={filterByClass}
              className="border px-4 py-2 focus:outline-none rounded-md bg-gray-100 text-green-800"
              placeholder="Class"
            >
              {classValue !== "" && (
                <option value="" disabled hidden>
                  Select Class
                </option>
              )}
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
        </div>

        <div>
          {deleteId ? (
            <DeleteComponent
              deleteHandler={deleteHandler}
              cancelHandler={cancelHandler}
            />
          ) : null}
        </div>
        <div>{visible ? <Form /> : null}</div>
      </div>
    </header>
  );
};

function DeleteComponent({ deleteHandler, cancelHandler }) {
  return (
    <div className="flex gap-5 justify-center mt-5">
      <button>Are you sure?</button>
      <button
        onClick={deleteHandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes
        <span className="px-1">
          <BiX color="rgb(255 255 255)" size={25} />
        </span>
      </button>
      <button
        onClick={cancelHandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50"
      >
        No
        <span className="px-1">
          <BiCheck color="rgb(255 255 255)" size={25} />
        </span>
      </button>
    </div>
  );
}

export default Header;
