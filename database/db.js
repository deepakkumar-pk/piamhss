import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: `piamhss-students`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectToDatabase;
