import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  refreshToken: { type: String }, 
  profilePicture: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const UsersModel = mongoose.model("Users", UsersSchema);
export default UsersModel;
