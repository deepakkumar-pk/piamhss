import Design from "../../VoucherDesign/Design";

const StudentFeeReceipt = ({ student, voucherCode, annualFund }) => {
  const {
    name,
    fatherName,
    category,
    studentClass,
    SecurityFee,
    feesPaidMonths,
    CNIC,
    lateFees,
    StationaryFee,
    IDFee,
    MaintenanceFee,
    grNo,
    fees,
  } = student;

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
    const monthsChecked = feesPaidMonths.length;
    const totalMonths = currentYearMonth;
    const remainingAmount = (
      currentFees *
      (monthsChecked > totalMonths ? 0 : totalMonths - monthsChecked)
    ).toFixed(2);

    return remainingAmount;
  };

  const getUnpaidMonths = () => {
    const unpaidMonths = currentMonthsList.filter((month, index) => {
      return index < currentYearMonth && !feesPaidMonths.includes(month);
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
    <div className="voucher-container" style={{ pageBreakAfter: "always" }}>
      <div className="p-2 mx-auto  ">
        <div className="grid grid-cols-3 items-center">
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
                      CNIC={CNIC}
                      remainingAmount={getRemainingAmount()}
                      unpaidMonths={getUnpaidMonths()}
                      fees={fees}
                      newVoucherCode={voucherCode}
                      voucherType={
                        index === 0
                          ? "School Copy"
                          : index === 1
                          ? "Bank Copy"
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
