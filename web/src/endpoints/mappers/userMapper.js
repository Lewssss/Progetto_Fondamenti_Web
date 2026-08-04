export function mapUser(raw) {
  if (!raw) {
    throw new Error("User payload mancante");
  }

  return {
    id: String(raw.id ?? raw._id),
    username: raw.username,
    email: raw.email,
    profilePicture: raw.profilePicture ?? null,
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