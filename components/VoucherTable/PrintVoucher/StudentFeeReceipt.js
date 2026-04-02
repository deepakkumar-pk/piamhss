import Design from "../../VoucherDesign/Design";

const StudentFeeReceipt = ({ student, voucherCode, annualFund }) => {
  const {
    name,
    fatherName,
    category,
    studentClass,
    SecurityFee,
    feesPaidMonths,
    lateFees,
    StationaryFee,
    IDFee,
    MaintenanceFee,
    grNo,
    fees,
  } = student;

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // FIX: April (JS month 3) was returning 0 instead of 12
  // (3 + 9) % 12 = 0, but April means all 12 months of the academic year have started
  const mapToYearMonth = (monthIndex) => {
    const result = (monthIndex + 9) % 12;
    return result === 0 ? 12 : result;
  };

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

  // April–December belong to the previous calendar year (e.g. 2025)
  // January–March belong to the current calendar year (e.g. 2026)
  const getMonthYear = (month) => {
    const prevYearMonths = [
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
    return prevYearMonths.includes(month) ? currentYear - 1 : currentYear;
  };

  const getRemainingAmount = () => {
    const currentFees = parseFloat(fees);
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

    if (unpaidMonths.length === 0) return "-";

    const label =
      unpaidMonths.length > 1 ? "Prev Months Fees" : "Prev Month Fees";

    // Conditionally show year: only stamp year if it differs from current calendar year
    const formatted = unpaidMonths.map((month) => {
      const year = getMonthYear(month);
      return year !== currentYear ? `${month} ${year}` : month;
    });

    return `${label} (${formatted.join(", ")})`;
  };

  return (
    <div className="voucher-container" style={{ pageBreakAfter: "always" }}>
      <div className="px-2 py-6 mx-auto  ">
        <div className="grid grid-cols-3 space-x-2 items-center">
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
                      grNo={grNo}
                      remainingAmount={getRemainingAmount()}
                      unpaidMonths={getUnpaidMonths()}
                      fees={fees}
                      newVoucherCode={voucherCode}
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

export default StudentFeeReceipt;