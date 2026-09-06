import api from "../../api/interceptor.js";
import { mapPost, mapComment } from "../mappers/userMapper.js";

export async function CreatePost(author, file, content) {
  const formData = new FormData(); //utilizziamo formdata principalmente per il file, che non possiamo jsonnarlo quindi lo dobbiamo serializzare, unico modo
  formData.append("author", author);
  formData.append("img", file);
  formData.append("content", content);
  const data = await api.post("/post/addPost", formData);
  return data;
}
export async function deletePost(id) {
  const data = await api.delete(`/post/delete/${id}`);
  return data;
}

export async function deleteMessage(messageId, who) {
  const { data } = await api.delete("/messages/deleteMessage", {
    data: {
      message_id: messageId,
      who,
    },
  });

  return data;
}

export async function UserLikedPost(userId, postId) {
  const data = await api.post("/post/addLike", {
    userId: userId,
    postId: postId,
  });
  return data;
}
export async function addPostComment(post, author, replyTo, text) {
  const { data } = await api.post(`/post/addPostComment/`, {
    post,
    author,
    replyTo,
    text,
  });
  return mapComment(data);
}
export async function updateUserImage(userId, file) {
  const formData = new FormData();
  formData.append("img", file);
  const { data } = await api.put("/user/updateUserImage", formData);
  return data;
}
export async function updateUserBio(bio) {
  const { data } = await api.patch("/user/updateUserBio", { bio });
  return data;
}
export async function updateFollow(targetId) {
  const { data } = await api.patch(`/user/follow/${targetId}`);
  return data;
}
export async function addStory(file, content) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("content", content);
  const data = await api.post("/stories/addStory", formData);
  return data;
}
export async function getStories(userId) {
  const data = await api.get(`/stories/getStories/${userId}`);
  return data;
}
export async function getStoriesOfUser(userId) {
  const data = await api.get(`/stories/getStoriesOfUser/${userId}`);
  return data;
}
export async function deleteStory(storyId) {
  const data = await api.delete(`/stories/deleteStory/${storyId}`);
  return data;
}