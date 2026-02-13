import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  login_id: { type: String, required: true, ref: "Login" },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
});

const UsersModel = mongoose.model("Users", UsersSchema);
export default UsersModel;
