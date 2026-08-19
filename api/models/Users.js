import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "", maxlength: 150 },
 // Posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], pensato inizialmente, ma effettivamente inutile perche possiamo reperirlo dai post
  refreshToken: { type: String }, 
  profilePicture: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const UsersModel = mongoose.model("User", UsersSchema);
export default UsersModel;
