import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("UserModel", userSchema);

export default userModel;
