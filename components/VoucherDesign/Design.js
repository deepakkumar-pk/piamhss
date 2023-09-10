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
  "Forty",
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
  CNIC,
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

  const getTotalAmount = () => {
    const monthlyAmount = parseFloat(amount) || 0;
    const lateAmount = parseFloat(lateFees) || 0;
    const admissionAmount = parseFloat(admissionFees) || 0;
    const annualAmount = parseFloat(amount) || 0;
    const securityAmount = parseFloat(SecurityFee) || 0;
    const stationaryAmount = parseFloat(StationaryFee) || 0;
    const idAmount = parseFloat(IDFee) || 0;
    const maintainanceAmount = parseFloat(MaintenanceFee) || 0;
    const remainingFees = parseFloat(remainingAmount) || 0;

    const totalAmount = (
      monthlyAmount +
      (lateFees > 0 ? lateAmount : 0) +
      (remainingAmount > 0 ? remainingFees : 0) +
      (admissionFees > 0 ? admissionAmount : 0) +
      (admissionFees > 0 || annualFund ? annualAmount : 0) +
      (admissionFees > 0 || annualFund
        ? securityAmount + stationaryAmount + maintainanceAmount + idAmount
        : 0)
    ).toFixed(2);

    return totalAmount;
  };

  const amountInWords = convertAmountToWords(getTotalAmount());

  return (
    <>
      <div className="grid grid-cols-2 border-solid border-gray-300 border-2 rounded-lg shadow-md">
        <div className="col-span-2 md:col-span-1 md:col-start-1 lg:col-span-2 lg:col-start-1 ">
          {/* First column (70%) */}
          <div className="flex items-center justify-center">
            <div className="mr-4">
              <Image
                src={schoolLogo}
                width={75}
                height={75}
                alt="School Logo"
              />
            </div>
            <h1 className="text-base font-bold text-green-900">
              PIA Model Higher Secondary School
            </h1>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 md:col-start-2 lg:col-span-2 lg:col-start-3">
          {/* Second column (30%) */}
          <div className="flex items-center justify-center">
            <Image src={bankLogo} width={100} height={75} alt="Bank Logo" />
          </div>
        </div>
        {/* Second row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 border-solid border-t-2 border-b-2"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Voucher: {voucherType}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center ">
              <h4 className="text-sm font-medium">
                Deposit Slip No: {voucherCode}
              </h4>
            </div>
          </div>
        </div>
        {/* Third row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-1"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium">
              {"School's Bank Account No: 1636-10029159"}

              <div className="text-center text-xs font-normal">
                Pay at Pia Transport & Overhaul Kyc, UBL Branch.
              </div>
            </div>
          </div>
        </div>

        {/* Fourth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-4 border-solid border-t-2 border-b-2"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Date</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">{formattedDate}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">G.R No</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center ">
              <h4 className="text-sm font-medium">{grNo}</h4>
            </div>
          </div>
        </div>
        {/* Fifth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-4"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">Fees</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">
                {admissionFees > 0 ? "Admission" : "Monthly"}
              </h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center border-solid border-r-2">
              <h4 className="text-sm font-medium">{"Father's CNIC"}</h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <h4 className={`text-${CNIC ? "xs" : "sm"} font-medium`}>
                {CNIC ? CNIC : "-"}
              </h4>
            </div>
          </div>
        </div>
        {/* Sixth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 border-solid border-t-2 border-b-2"
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
          className="col-span-2 md:col-span-2 grid grid-cols-2"
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
          className="col-span-2 md:col-span-2 grid grid-cols-4 border-solid border-t-2 border-b-2"
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
          <table className="w-full">
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
              {(admissionFees > 0 || annualFund) && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    Annual Fund
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {amount}=/
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
              {remainingAmount > 0 && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    Prev Months Fees ({unpaidMonths})
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {remainingAmount}=/
                  </td>
                </tr>
              )}

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
              {(admissionFees > 0 || annualFund) && (
                <tr>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "75%" }}
                  >
                    Other Fees (Security/Stationary/ID Card/Maintenance)
                  </td>
                  <td
                    className="inline-flex items-center justify-center text-xs"
                    style={{ width: "25%" }}
                  >
                    Rs {getOtherFees()}=/
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold text-xs border-solid border-t-2 border-b-2">
                <td
                  className="inline-flex items-center justify-center "
                  style={{ width: "75%" }}
                >
                  Total Amount
                </td>
                <td
                  className="inline-flex items-center justify-center "
                  style={{ width: "25%" }}
                >
                  Rs {getTotalAmount()}=/
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Tenth row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-1"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="flex items-center justify-center">
            <h4 className="p-2 text-xs font-medium">
              In Words: {amountInWords} Rupees Only
            </h4>
          </div>
        </div>
        {/* Eleventh row */}
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-2 border-solid border-t-2 border-b-2"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="col-span-1">
            <div className="flex flex-col items-center justify-center border-solid border-r-2">
              <div className="mt-14"></div>
              <div className="border-b-2 w-32"></div>
              <h4 className="text-xs font-medium mt-2">
                {"Applicant's Signature"}
              </h4>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col items-center justify-center ">
              <div className="mt-14"></div>
              <div className="border-b-2 w-32"></div>
              <h4 className="text-xs font-medium mt-2">
                Bank Authorized Sign with Stamp
              </h4>
            </div>
          </div>
        </div>
        <div
          className="col-span-2 md:col-span-2 grid grid-cols-1"
          style={{ gridColumn: "span 4 / span 2" }}
        >
          <div className="flex items-center justify-center">
            <h4 className="p-2 text-xs font-medium">
              {`Note: Payment of fees by ${
                monthNames[currentDate.getMonth()]
              } 15,${currentDate.getFullYear()}`}
              , is mandatory to avoid a late fee of 200/=.
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
