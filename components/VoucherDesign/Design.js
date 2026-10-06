import Image from "next/image";
import schoolLogo from "../../public/images/logo1.png";
import bankLogo from "../../public/images/logo NEW UBL.png";

const numbersInWords = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
  "Thirty",
  "Fourty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

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


function convertAmountToWords(amount) {
  if (amount === 0) {
    return numbersInWords[0];
  }

  let words = "";

  if (amount >= 1000) {
    const thousands = Math.floor(amount / 1000);
    words += `${convertAmountToWords(thousands)} Thousand `;
    amount %= 1000;
  }

  if (amount >= 100) {
    const hundreds = Math.floor(amount / 100);
    words += `${numbersInWords[hundreds]} Hundred `;
    amount %= 100;
  }

  if (amount > 0) {
    if (words !== "") {
      words += "and ";
    }

    if (amount < 20) {
      words += numbersInWords[amount];
    } else {
      const tens = Math.floor(amount / 10);
      words += `${numbersInWords[tens + 18]} `;
      amount %= 10;

      if (amount > 0) {
        words += numbersInWords[amount];
      }
    }
  }

  return words;
}

const Design = ({
  name,
  fatherName,
  category,
  studentClass,
  SecurityFee,
  lateFees,
  StationaryFee,
  IDFee,
  unpaidMonths,
  remainingAmount,
  MaintenanceFee,
  annualFund,
  admissionFees,
  grNo,
  fees,
  voucherType,
  newVoucherCode,
}) => {
  const amount = parseFloat(fees) || 0;

  const voucherCode = parseFloat(newVoucherCode) || "0000";

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  const expiryDate = `${'25'}/${formattedMonth}/${year}`;
  const dueDate = `${"15"}/${formattedMonth}/${year}`;


  const getOtherFees = () => {
    const securityFee = parseFloat(SecurityFee) || 0;
    const stationaryFee = parseFloat(StationaryFee) || 0;
    const idCard = parseFloat(IDFee) || 0;
    const maintainanceFee = parseFloat(MaintenanceFee) || 0;

    const otherFees = (
      securityFee +
      stationaryFee +
      maintainanceFee +
      idCard
    ).toFixed(2);

    return otherFees;
  };

  const getTotalAmountBeforeDue = () => {
    const monthlyAmount = parseFloat(amount) || 0;
    const lateAmount = parseFloat(lateFees) || 0;
    const admissionAmount = parseFloat(admissionFees) || 0;
    const securityAmount = parseFloat(SecurityFee) || 0;
    const stationaryAmount = parseFloat(StationaryFee) || 0;
    const idAmount = parseFloat(IDFee) || 0;
    const maintainanceAmount = parseFloat(MaintenanceFee) || 0;
    const remainingFees = parseFloat(remainingAmount) || 0;
    const bankCharges = parseFloat(50)

    const totalAmount = (
      monthlyAmount + bankCharges +
      (lateFees > 0 ? lateAmount : 0) +
      (remainingAmount > 0 ? remainingFees : 0) +
      (admissionFees > 0 ? admissionAmount : 0) +
      ((admissionFees > 0 || annualFund) && securityAmount > 0 ? securityAmount : 0) +
      ((admissionFees > 0 || annualFund) && stationaryAmount > 0 ? stationaryAmount : 0) +
      ((admissionFees > 0 || annualFund) && maintainanceAmount > 0 ? maintainanceAmount : 0) +
      ((admissionFees > 0 || annualFund) && idAmount > 0 ? idAmount : 0)
    ).toFixed(2);

    return totalAmount;
  };

  const getTotalAmountAfterDue = () => {
    const totalAmountBeforeDue = parseInt(getTotalAmountBeforeDue())
    const lateAmount = parseInt(200)

    const totalAmount = (
      totalAmountBeforeDue + lateAmount
    ).toFixed(2);
    return totalAmount;
  };

  const amountInWords = convertAmountToWords(getTotalAmountBeforeDue());




  return (
    <>
      <div className="grid grid-cols-2 border-solid border-gray-300 border-2 rounded-md shadow-md">
        <div className="col-span-2 md:col-span-1 md:col-start-1 lg:col-span-2 lg:col-start-1 px-1 py-1">
          {/* First column (70%) */}
          <div className="flex items-center justify-center">
            <div className="mr-4">
              <Image
                src={schoolLogo}
                width={55}
                height={55}
                alt="School Logo"
                priority={true} 
                unoptimized={true} 
              />
            </div>
            <h1 className="text-xl font-bold text-green-900">
              PIA Model School
            </h1>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 md:col-start-2 lg:col-span-2 lg:col-start-3 flex items-center justify-center px-1 py-1">
          {/* Second column (30%) */}
          <div className=" ">
            <Image
              src={bankLogo}
              width={75}
              height={75}
              alt="Bank Logo"
              priority={true} 
              unoptimized={true} 
            />          </div>
        </div>

        {/* Fourth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-6 border-solid border-t-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1 ">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-xs font-medium text-center">Iss. Date</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-xxs font-medium">{formattedDate}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-xs font-medium">Due Date</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-xxs font-medium">{dueDate}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-xs font-medium">Expiry</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center ">
              <h4 className="text-xxs font-medium">{expiryDate}</h4>
            </div>
          </div>
        </div>

        {/* new */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 border-solid border-t-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Deposit Slip No / PV No:</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <h4 className="text-sm font-semibold">{voucherCode}</h4>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-4 border-solid border-t-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">{"Voucher"}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">{voucherType}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Fees</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid">
              <h4 className="text-sm font-medium">
                {admissionFees > 0 ? "Admission" : "Monthly"}
              </h4>
            </div>
          </div>
        </div>

        {/* Third row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-1 py-1 border-solid border-t-2 border-b-2"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium">
              <span>{"School's Account No: "}</span>
              <span className="font-semibold">304493724</span>

              <div className="text-center text-xs font-normal">
                Pay at any UBL Branch of Pakistan.
              </div>
            </div>
          </div>
        </div>

        {/* Fifth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">G.R No / Buyer Code</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <h4 className="text-sm font-semibold">{grNo}</h4>
            </div>
          </div>
        </div>
        {/* Sixth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 border-solid border-t-2 border-b-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Student Name</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <h4 className="text-sm font-medium">{name}</h4>
            </div>
          </div>
        </div>
        {/* Seventh row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">{"Father's Name"}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <h4 className="text-sm font-medium">{fatherName}</h4>
            </div>
          </div>
        </div>
        {/* Eighth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-4 border-solid border-t-2 border-b-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Class</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">{studentClass}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Category</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <h4 className="text-sm font-medium">{category}</h4>
            </div>
          </div>
        </div>
        {/* Ninth row */}
        <div
          className="col-span-2 md:col-span-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <table className="w-full" id="voucherTable">
            <thead>
              <tr className="bg-gray-100 border-solid border-b-2">
                <th
                  className="inline-flex items-center justify-center text-sm"
                  style={{ width: "75%" }}
                >
                  Fees Head
                </th>
                <th
                  className="inline-flex items-center justify-center text-sm"
                  style={{ width: "25%" }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {admissionFees > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    Admission Fee
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {admissionFees}=/
                  </td>
                </tr>
              )}
              <tr>
                <td
                  className="inline-flex items-center justify-center text-xs"
                  style={{ width: "75%" }}
                >
                  Monthly Fee
                </td>
                <td
                  className="inline-flex items-center justify-center text-xs"
                  style={{ width: "25%" }}
                >
                  Rs {amount}=/
                </td>
              </tr>

              {lateFees > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    Late Fee
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {lateFees}=/
                  </td>
                </tr>
              )}
              {(admissionFees > 0 || annualFund) && MaintenanceFee > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    Maintenance Fees (Yearly)
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {MaintenanceFee}=/
                  </td>
                </tr>
              )}
              {(admissionFees > 0 || annualFund) && SecurityFee > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                                        Annual Fees (Yearly)
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {SecurityFee}=/
                  </td>
                </tr>
              )}
              {(admissionFees > 0 || annualFund) && StationaryFee > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    Stationary Fees (Yearly)
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {StationaryFee}=/
                  </td>
                </tr>
              )}
              {(admissionFees > 0 || annualFund) && IDFee > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    ID Card Fees (Yearly)
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {IDFee}=/
                  </td>
                </tr>
              )}
              {remainingAmount > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-center text-xs pl-2"
                    style={{ width: "75%" }}
                  >
                    {unpaidMonths}
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {remainingAmount}=/
                  </td>
                </tr>
              )}
              <tr>
                <td
                  className="inline-flex items-center justify-center text-center text-xs pl-2"
                  style={{ width: "75%" }}
                >
                  {"Bank Charges"}
                </td>
                <td
                  className="inline-flex items-center justify-center text-xs"
                  style={{ width: "25%" }}
                >
                  Rs {"50"}=/
                </td>
              </tr>
            </tbody>
            <tfoot className="">
              <tr className="bg-gray-100 font-bold text-xs border-solid border-t-2 border-b-2">
                <td
                  className="inline-flex items-center justify-center "
                  style={{ width: "75%" }}
                >
                  Total Amount
                  <span className="px-1 text-xxs font-semibold">
                    (before Due Date)
                  </span>
                </td>
                <td
                  className="inline-flex items-center justify-center "
                  style={{ width: "25%" }}
                >
                  Rs {getTotalAmountBeforeDue()}=/
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Tenth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-1 py-1"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="flex items-center justify-center">
            <h4 className="p-1 text-xs font-medium">
              In Words: {amountInWords} Rupees Only
            </h4>
          </div>
        </div>

        <div
          className="col-span-2 md:col-span-2 grid grid-cols-1 border-solid border-t-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="bg-gray-100 font-bold text-xs border-solid border-t-2 border-b-2">
            <h1
              className="inline-flex items-center justify-center "
              style={{ width: "75%" }}
            >
              Total Amount
              <span className="px-1 text-xxs font-semibold">
                (after Due Date)
              </span>
            </h1>
            <h1
              className="inline-flex items-center justify-center "
              style={{ width: "25%" }}
            >
              Rs {getTotalAmountAfterDue()}=/
            </h1>
          </div>
        </div>

        {/* Eleventh row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 border-solid border-t-2 border-b-2 "
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex flex-col items-center justify-center border-solid border-r-2">
              <div className="mt-20"></div>
              <div className="border-b-2 w-32"></div>
              <h4 className="text-xs font-medium mt-1">
                {"Applicant's Signature"}
              </h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col items-center justify-center ">
              <div className="mt-20"></div>
              <div className="border-b-2 w-32"></div>
              <h4 className="text-xs font-medium mt-1">
                Bank Authorized Signture
              </h4>
            </div>
          </div>
        </div>
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-1 py-1"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="flex items-center justify-center">
            <h4 className="p-2 text-xs font-medium">
              {`Note: Fees due by ${monthNames[currentDate.getMonth()]
                } 15,${currentDate.getFullYear()}`}
              , to avoid Rs 200/= late fee.
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;