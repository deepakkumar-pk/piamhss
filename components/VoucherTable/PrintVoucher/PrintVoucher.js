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
  IDFee,
  MaintenanceFee,
  admissionFees,
  grNo,
  fees,
  newVoucherCode,
  annualFund,
}) => {
  // ── Rolling 12-month window ────────────────────────────────────────────────
  // Months with calendar index <= current month index → current year
  // Months with calendar index >  current month index → previous year
  const MONTH_INDEX = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  const currentCalYear = now.getFullYear();

  const getYearForMonth = (monthName) =>
    MONTH_INDEX[monthName] <= currentMonthIdx ? currentCalYear : currentCalYear - 1;

  const getLabel = (monthName) => `${monthName} ${getYearForMonth(monthName)}`;

  const academicMonths = [
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December", "January", "February", "March",
  ];

  // Normalize DB entry: plain "April" → "April 2026", already-labelled left as-is
  const normalizeEntry = (entry) => /\d{4}/.test(entry) ? entry : getLabel(entry);

  const normalizedPaid = (feesPaidMonths || []).map(normalizeEntry);
  const allLabels = academicMonths.map(getLabel);

  const getRemainingAmount = () => {
    const currentFees = parseFloat(fees);
    const paidCount = normalizedPaid.filter((e) => allLabels.includes(e)).length;
    return (currentFees * Math.max(0, 12 - paidCount)).toFixed(2);
  };

  const getUnpaidMonths = () => {
    const unpaid = allLabels.filter((l) => !normalizedPaid.includes(l));
    if (unpaid.length === 0) return "-";
    const label = unpaid.length > 1 ? "Prev Months Fees" : "Prev Month Fees";
    return `${label} (${unpaid.join(", ")})`;
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