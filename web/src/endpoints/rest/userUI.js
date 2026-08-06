import api from "../../api/interceptor"
import { mapStories } from "../mappers/userMapper"

export async function getStoriesFromFriends(userId) {
  const { data } = await api.get(`/user/stories/friends/${userId}`);
  return mapStories(data);
}
export async function getPosts(userId) {
  const {data} = await api.get('/user/${userId}/friends/post');
  return data;
}