import Chat from "../models/Chat.js";
import MessageServices from "../Services/MessageServices.js";
import { authenticateSocket } from "../Middleware/authMiddleware.js";

export default function initChatSocket(io) {
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    socket.on("join_chat", async (chatId, callback) => {
      const chat = await Chat.findOne({
        _id: chatId,
        participants: socket.userId,
      });

      if (!chat) {
        return callback?.({ success: false, message: "Accesso negato" });
      }

      socket.join(`chat:${chatId}`);
      callback?.({ success: true });
    });

    socket.on("leave_chat", (chatId) => {
      socket.leave(`chat:${chatId}`);
    });

    socket.on("send_message", async ({ chatId, text }, callback) => {
      try {
        const chat = await Chat.findOne({
          _id: chatId,
          participants: socket.userId,
        });

        if (!chat) {
          return callback?.({
            success: false,
            message: "Accesso negato",
          });
        }

        const [status, result] = await MessageServices.newMessage(
          chatId,
          socket.userId,
          text,
        );

        if (status != 200) {
          return callback?.({
            success: false,
            message: "Errore durante l'invio",
          });
        }

        io.to(`chat:${chatId}`).emit("message:new", result.data);

        callback?.({
          success: true,
          message: result.data,
        });
      } catch (error) {
        console.error(error);

        callback?.({
          success: false,
          message: "Errore del server",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Utente disconnesso: ${socket.userId}`);
    });
  });
}
