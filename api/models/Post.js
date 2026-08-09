import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const PostModel = mongoose.model("Post", PostSchema);
export default PostModel;