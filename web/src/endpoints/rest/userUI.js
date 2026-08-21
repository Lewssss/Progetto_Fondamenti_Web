import api from "../../api/interceptor";
import {
  mapStories,
  mapPost,
  mapComment,
  mapUser,
  mapChat,
} from "../mappers/userMapper";

export async function getStoriesFromFriends(userId) {
  const { data } = await api.get(`/user/stories/friends/${userId}`);
  return mapStories(data);
}
export async function getPostsofFriends(userId) {
  const { data } = await api.get(`/user/${userId}/friends/post`);
  return data;
}
export async function getUser(id) {
  const { data } = await api.get(`/user/userData/${id}`);
  return mapUser(data);
}
export async function getPosts() {
  const { data } = await api.get(`/post/getPosts`);
  return mapPost(data);
}
export async function getPostofUser(userId) {
  const { data } = await api.get(`/post/getPostsofUser/${userId}`);
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
