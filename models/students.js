import { Schema, model, models } from "mongoose";

const studentsSchema = new Schema({
  name: String,
  fatherName: String,
  category: String,
  grNo: Number,
  fees: Number,
  AdmissionDate: String,
  studentClass: String,
  remarks: String,
  status: String,
  CNIC: String,
  contactNo: String,
  remainingAmount: Number,
  lateFees: Number,
  SecurityFee: Number,
  StationaryFee: Number,
  IDFee: Number,
  MaintenanceFee: Number,
  admissionFees: Number,
  voucherCode: [{
    type: Map,
    of: String, // You can set the type of the values here
  }],
  feesPaidMonths: [String], // New field to store fees paid months as an array of strings
});

const StudentData = models?.piamhssData || model("piamhssData", studentsSchema);

export default StudentData;
