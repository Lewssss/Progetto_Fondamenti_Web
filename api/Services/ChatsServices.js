import response from "../util/response/user.response.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export default {
  newChat,
  getChats,
  deleteChat,
  clearChat,
};

async function newChat(userId, friendId) {
  const create = new Chat({
    participants: [userId, friendId], //ci potrebbero essere più friend verificare se funziona
  });
  try {
    await create.save();
    return [200, response.newChat()];
  } catch (error) {
    console.log(error);
    return [401, response.Fail()];
  }
}

async function getChats(id) {
  try {
    // Trova tutte le chat dove `id` è presente nell'array `participants`
    const chats = await Chat.find({ participants: id }).populate("lastMessage");
    return [200, response.responseWithData(chats)]; // Questo payload restituisce  una cosa tipo success: true, skipmessage: true e i miei dati data:[]
  } catch (error) {
    console.log(error);
    return [401, response.Fail()];
  }
}

async function deleteChat(chatid) {
  try {
    await Chat.findByIdAndDelete(chatid);
    return [200, response.deleteChat()];
  } catch (error) {
    return [401, response.Fail()];
  }
}

async function clearChat(chatid) {
  try {
    await Message.deleteMany({ Chat_id_reference: chatid });
    return [200, response.clearChat()];
  } catch (error) {
    return [401, response.Fail()];
  }
}
