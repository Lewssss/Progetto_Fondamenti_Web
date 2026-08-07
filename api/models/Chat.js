import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ChatSchema = new Schema(
  {
    participants: [
      {
        type: String,
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    UnreadCount: {
      //Verificare se fa il suo dovere
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
