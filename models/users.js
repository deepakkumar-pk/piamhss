import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: String,
});

const UserData = models?.userData || model("userData", userSchema);
export default UserData;
