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
  return raw.map((story) => ({
    id: String(story.id ?? story._id),
    name: story.name,
    image: story.image,
  }));
}
export function mapPost(raw) {
  if (!raw) throw new Error("Post payload mancante");
  return raw.data.map((post) => ({
    id: post._id,
    authorId: post.author?._id ?? post.author ?? null,
    author: (post.author && post.author.username)
    ? {
        id: String(post.author._id),
        username: post.author.username,
        profilePicture: post.author.profilePicture ?? null,
      }
    : null,
    content: post.content,
    ImgPost: post.image,
    likes: post.likes ?? [],
    commentsCount: post.commentsCount ?? 0,
    date: post.createdAt,
  }));
}
export function mapComment(raw) {
  if (!raw) throw new Error("payload mancante");
  return raw.data.map((comment) => ({
    id: comment._id,
    post: comment.post,
    author: comment.author ?? [],
    text: comment.text,
    replyTo: comment.replyTo,
    date: comment.createdAt,
  }));
}

export function mapChat(raw) {
  if (!raw) throw new Error("payload mancante");
  return raw.data.map((chat) => ({
    id: chat._id,
    participants: chat.participants ?? [],
    lastMessage: chat.lastMessage,
    unreadCount: chat.unreadCount ?? 0,
  }));
}

export function mapMessage(raw) {
  if (!raw) throw new Error("payload mancante");
  return raw.data.map((message) => ({
    id: message._id,
    chatId: message.Chat_id_reference,
    sender: message.sender,
    text: message.text,
    read: message.read ?? false,
    date: message.createdAt,
  }));
}
