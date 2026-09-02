import response from "../util/response/user.response.js";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export default {
  newMessage,
  getMessages,
  deleteMessage,
  MessagesAsRead,
};

async function newMessage(chat_id, userId, message) {
  const create = new Message({
    Chat_id_reference: chat_id,
    sender: userId,
    text: message,
  });
  try {
    await create.save();
    // Aggiorna la chat con l'ultimo messaggio
    await Chat.findByIdAndUpdate(chat_id, { lastMessage: create._id });
    return [200, response.newMessage()];
  } catch (error) {
    console.log(error);
    return [401, response.Fail()];
  }
}

async function getMessages(chat_id, userId) {
  const messages = await Message.find({
    Chat_id_reference: chat_id,
    hiddenFor: { $ne: userId },
  }).sort({ createdAt: 1 }); // Ordina per data di creazione in ordine crescente

  return [200, response.responseWithData(messages)];
}

async function MessagesAsRead(chatId, userId) {
  try {
    await Message.updateMany(
      {
        Chat_id_reference: chatId,
        sender: { $ne: userId },
        read: false,
      },
      {
        $set: { read: true },
      },
    );

    return [200, response.responseWithData({ updated: true })];
  } catch (error) {
    console.log(error);
    return [500, response.Fail()];
  }
}

async function deleteMessage(messageId, userId, who) {
  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return [404, response.Fail()];
    }

    if (who === "everyone") {
      if (String(message.sender) !== String(userId)) {
        return [403, response.Fail()];
      }

      await Message.findByIdAndDelete(messageId);
      return [200, response.deleteMessage()];
    }

    if (who === "me") {
      await Message.findByIdAndUpdate(messageId, {
        $addToSet: { hiddenFor: userId },
      });

      return [200, response.deleteMessage()];
    }

    return [400, response.Fail()];
  } catch (error) {
    console.log(error);
    return [500, response.Fail()];
  }
}
