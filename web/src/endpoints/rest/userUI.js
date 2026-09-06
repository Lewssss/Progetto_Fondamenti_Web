import api from "../../api/interceptor";
import {
  mapStories,
  mapPost,
  mapComment,
  mapUser,
  mapChat,
  mapMessage,
} from "../mappers/userMapper";

export async function getPostsofFriends(userId) {
  const { data } = await api.get(`/user/${userId}/friends/post`);
  return data;
}
export async function getUser(id) {
  const { data } = await api.get(`/user/userData/${id}`);
  if (!data) return null;
  return mapUser(data);
}
export async function searchUsers(query) {
  const { data } = await api.get(`/user/search/${query.trim()}`);
  return data.data.map((u) => mapUser(u));
}
export async function getPosts() {
  const { data } = await api.get(`/post/getPosts`);
  console.log("getPost = ", data.data);
  if (!data?.data) return []; //per non tornare null almeno torna vuoto
  return mapPost(data);
}
export async function getPostofUser(userId) {
  const { data } = await api.get(`/post/getPostsofUser/${userId}`);
  if (!data?.data) return [];
  return mapPost(data);
}
export async function getPostComments(postId) {
  const { data } = await api.get(`/post/getPostComments/${postId}`);
  return mapComment(data);
}
export async function getUserChats(userId) {
  // testare se fuinziona
  const { data } = await api.get("/chats/getChats/");
  return mapChat(data);
}

export async function createChatsForFollowers() {
  const { data } = await api.post("/chats/newChat");
  return data;
}

export async function getMessages(chatId) {
  const { data } = await api.get(`/messages/getMessages?chatId=${chatId}`);
  return mapMessage(data);
}

export async function MessagesAsRead(chatId) {
  const { data } = await api.patch("/messages/readMessages", {
    chatId,
  });

  return data;
}
