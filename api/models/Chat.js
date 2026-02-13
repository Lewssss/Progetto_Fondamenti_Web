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

// Instance method: ritorna lo userId dell'altro partecipante rispetto a `userId`
ChatSchema.methods.getOtherParticipant = function (userId) {
  if (!this.participants || !Array.isArray(this.participants)) return null;
  return this.participants.find((p) => String(p) !== String(userId)) || null;
};

// Instance method: verifica se `userId` è presente nei participants
ChatSchema.methods.hasParticipant = function (userId) {
  if (!this.participants || !Array.isArray(this.participants)) return false;
  return this.participants.some((p) => String(p) === String(userId));
};

// Static helper: estrae lo userId principale (se fornito) dalla lista di participants
ChatSchema.statics.extractMainUserId = function (participants, currentUserId) {
  if (!participants || !Array.isArray(participants)) return null;
  return participants.find((p) => String(p) === String(currentUserId)) || null;
};

export default model("Chat", ChatSchema);
