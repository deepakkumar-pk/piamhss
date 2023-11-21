import Design from "../../VoucherDesign/Design";

const PrintVoucher = ({
  name,
  fatherName,
  category,
  studentClass,
  SecurityFee,
  lateFees,
  StationaryFee,
  feesPaidMonths,
  CNIC,
  IDFee,
  MaintenanceFee,
  admissionFees,
  grNo,
  fees,
  newVoucherCode,
  annualFund,
}) => {
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

  const getRemainingAmount = () => {
    const currentFees = parseFloat(fees); // Assuming fees is a number
    const monthsChecked = feesPaidMonths?.length || 0;
    const totalMonths = currentYearMonth;
    const remainingAmount = (
      currentFees *
      (monthsChecked > totalMonths ? 0 : totalMonths - monthsChecked)
    ).toFixed(2);

    return remainingAmount;
  };

  const getUnpaidMonths = () => {
    const unpaidMonths = currentMonthsList.filter((month, index) => {
      return index < currentYearMonth && !feesPaidMonths?.includes(month);
    });

    if (unpaidMonths.length > 0) {
      return unpaidMonths.join(", ");
    } else {
      return "-";
    }
  };

  return (
    <div style={{ width: "210mm", height: "297mm" }}>
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-center  ">
            <div className="">
              <Design
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
                grNo={grNo}
                CNIC={CNIC}
                remainingAmount={getRemainingAmount()}
                unpaidMonths={getUnpaidMonths()}
                fees={fees}
                newVoucherCode={newVoucherCode}
                voucherType={"School Copy"}
                annualFund={annualFund}
              />
            </div>
          </div>
          <div className="flex justify-center  ">
            <div className="">
              <Design
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
                grNo={grNo}
                CNIC={CNIC}
                remainingAmount={getRemainingAmount()}
                unpaidMonths={getUnpaidMonths()}
                fees={fees}
                newVoucherCode={newVoucherCode}
                voucherType={"Bank Copy"}
                annualFund={annualFund}
              />
            </div>
          </div>
          <div className="flex justify-center  ">
            <div className="">
              <Design
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
                grNo={grNo}
                CNIC={CNIC}
                remainingAmount={getRemainingAmount()}
                unpaidMonths={getUnpaidMonths()}
                fees={fees}
                newVoucherCode={newVoucherCode}
                voucherType={"Student Copy"}
                annualFund={annualFund}
              />
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="">
              <Design
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
                grNo={grNo}
                CNIC={CNIC}
                remainingAmount={getRemainingAmount()}
                unpaidMonths={getUnpaidMonths()}
                fees={fees}
                newVoucherCode={newVoucherCode}
                voucherType={"Accounts Copy"}
                annualFund={annualFund}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintVoucher;
