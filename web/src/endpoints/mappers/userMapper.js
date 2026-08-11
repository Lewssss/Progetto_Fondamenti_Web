export function mapUser(raw) {
  if (!raw) {
    throw new Error("User payload mancante");
  }

  return {
    id: String(raw._id),
    username: raw.username,
    email: raw.email,
    profilePicture: raw.profilePicture ?? "null",
    followers: raw.followers ?? [],
    following: raw.following ?? [],
    bio: raw.bio ?? "",
  };
}
export function mapStories(raw) {
  if (!raw) {
    throw new Error("Stories payload mancante");
  }
  return raw.map(story => ({
    id: String(story.id ?? story._id),
    name: story.name,
    image: story.image,
  }));
}
export function mapPost(raw){
  if(!raw) throw new Error("payload mancante");
  return raw.data.map(post => ({
    id : post._id,
    authorId: post.author ?? [],
    content: post.content,
    ImgPost: post.image,
    likes: post.likes ?? [],
    commentsCount: post.commentsCount ?? 0,
    date: post.createdAt,
  }));
}
export function mapComment(raw){
  if(!raw) throw new Error("payload mancante");
  return raw.data.map(comment => ({
    id: comment._id,
    post: comment.post,
    author: comment.author ?? [],
    text: comment.text,
    replyTo: comment.replyTo,
    date: comment.createdAt
  }));
}