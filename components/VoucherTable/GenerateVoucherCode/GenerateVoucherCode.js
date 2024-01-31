const checkVoucherCodeUniqueness = (voucherCode, students) =>
{
  if (students.length > 0) {
    for (let student of students) {
      const hasVoucherCode =
        student?.voucherCode &&
        student?.voucherCode.some((codeObj) =>
          Object.values(codeObj).includes(voucherCode)
        );

      const noVoucherCode =
        !student.voucherCode || student.voucherCode.length === 0;

      if (hasVoucherCode) {
        return false;
      } else if (noVoucherCode) {
        return true;
      } else {
        return true;
      }
    }
  } else {
    return true;
  }
};

const generateUniqueVoucherCode = async (students) => {
  let voucherCode = Math.floor(Math.random() * 900000) + 100000;
  let isUnique = checkVoucherCodeUniqueness(voucherCode, students);

  while (!isUnique) {
    voucherCode = Math.floor(Math.random() * 900000) + 100000;
    isUnique = await checkVoucherCodeUniqueness(voucherCode);
  }

  return voucherCode.toString();
};

export { generateUniqueVoucherCode };
