import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    content: { type: String },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
})

const StoryModel = mongoose.model("Story", StorySchema);
export default StoryModel;