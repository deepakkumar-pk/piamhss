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
      if (unpaidMonths.length > 1) {
        return `Prev Months Fees (${unpaidMonths.join(", ")})`;
      } else {
        return `Prev Month Fees (${unpaidMonths.join(", ")})`;
      }
    } else {
      return "-";
    }
  };

  return (
    <div className="voucher-container">
      <div className="px-2 py-6 mx-auto  ">
        <div className="grid grid-cols-3 items-center space-x-2">
          {Array(3)
            .fill()
            .map((_, index) => (
              <div key={index} className="voucher">
                <div className="flex justify-center">
                  <div>
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
                      voucherType={
                        index === 0
                          ? "Bank Copy"
                          : index === 1
                          ? "School Copy"
                          : "Student Copy"
                      }
                      annualFund={annualFund}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PrintVoucher;
