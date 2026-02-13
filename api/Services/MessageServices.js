import response from "../util/response/user.response.js";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export default {
  newMessage,
  getMessages,
  deleteMessage,
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

async function getMessages(chat_id) {
  const chat = await Message.find({ Chat_id_reference: chat_id });
  if (chat) {
    return [200, response.responseWithData(chat)];
  } else {
    return [400, response.Fail()];
  }
}

async function deleteMessage(message_id) {
  //Questo id deve essere quello di mongo
  try {
    await Message.findByIdAndDelete(message_id);
    return [200, response.deleteMessage()];
  } catch (error) {
    return [401, response.Fail()];
  }
}
