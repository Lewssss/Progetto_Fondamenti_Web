import response from "../util/response/user.response.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/Users.js";

export default {
  newChat,
  getChats,
  deleteChat,
  clearChat,
};

async function newChat(userId, targetUserId) {
  try {
    if (String(userId) === String(targetUserId)) {
      return [400, response.Fail()];
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return [404, response.Fail()];
    }

    let chat = await Chat.findOne({
      participants: {
        $all: [userId, targetUserId],
      },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, targetUserId],
      });
    } else {
      await Chat.findByIdAndUpdate(chat._id, {
        $pull: { hiddenFor: userId },
      });
    }

    chat = await Chat.findById(chat._id)
      .populate("participants", "username profilePicture")
      .lean();

    return [200, response.responseWithData(chat)];
  } catch (error) {
    console.error(error);
    return [500, response.Fail()];
  }
}

async function getChats(userId) {
  try {
    const chats = await Chat.find({
      participants: userId,
      hiddenFor: { $ne: userId },
    })
      .populate("participants", "username profilePicture")
      .lean();

    const chatsWithUnreadCount = await Promise.all(
      chats.map(async (chat) => {
        const [lastMessage, unreadCount] = await Promise.all([
          Message.findOne({
            Chat_id_reference: chat._id,
            hiddenFor: { $ne: userId },
          })
            .sort({ createdAt: -1 })
            .lean(),

          Message.countDocuments({
            Chat_id_reference: chat._id,
            sender: { $ne: userId },
            read: false,
            hiddenFor: { $ne: userId },
          }),
        ]);

        return {
          ...chat,
          lastMessage,
          unreadCount,
        };
      }),
    );

    return [200, response.responseWithData(chatsWithUnreadCount)];
  } catch (error) {
    console.log(error);
    return [401, response.Fail()];
  }
}

async function deleteChat(chatId, userId) {
  try {
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId,
    });

    if (!chat) {
      return [403, response.Fail()];
    }

    await Chat.findByIdAndUpdate(chatId, {
      $addToSet: { hiddenFor: userId },
    });

    await Message.updateMany(
      { Chat_id_reference: chatId },
      { $addToSet: { hiddenFor: userId } },
    );

    return [200, response.deleteChat()];
  } catch (error) {
    console.error(error);
    return [500, response.Fail()];
  }
}

async function clearChat(chatId, userId) {
  try {
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId,
    });

    if (!chat) {
      return [403, response.Fail()];
    }

    await Message.updateMany(
      { Chat_id_reference: chatId },
      { $addToSet: { hiddenFor: userId } },
    );

    return [200, response.clearChat()];
  } catch (error) {
    console.error(error);
    return [500, response.Fail()];
  }
}
