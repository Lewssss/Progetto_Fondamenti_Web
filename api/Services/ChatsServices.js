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

async function newChat(userId) {
  try {
    const user = await User.findById(userId).select("followers following");

    if (!user) {
      return [404, response.Fail()];
    }

    //creiamo chat sia coi followers che coi following (serve anche all'inoltro)
    const friends = [...(user.followers || []), ...(user.following || [])];

    for (const friendId of friends) {
      if (String(friendId) === String(userId)) {
        continue;
      }

      const existingChat = await Chat.findOne({
        participants: {
          $all: [userId, friendId],
        },
      });

      if (!existingChat) {
        await Chat.create({
          participants: [userId, friendId],
        });
      }
    }

    return [200, response.newChat()];
  } catch (error) {
    console.error(error);
    return [500, response.Fail()];
  }
}

async function getChats(userId) {
  try {
    const chats = await Chat.find({ participants: userId })
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

async function deleteChat(chatid) {
  try {
    await Chat.findByIdAndDelete(chatid);
    return [200, response.deleteChat()];
  } catch (error) {
    return [401, response.Fail()];
  }
}

async function clearChat(chatid, userId) {
  try {
    const chat = await Chat.findOne({
      _id: chatid,
      participants: userId,
    });

    if (!chat) {
      return [403, response.Fail()];
    }

    await Message.updateMany(
      { Chat_id_reference: chatid },
      { $addToSet: { hiddenFor: userId } },
    );

    return [200, response.clearChat()];
  } catch (error) {
    console.error(error);
    return [500, response.Fail()];
  }
}
