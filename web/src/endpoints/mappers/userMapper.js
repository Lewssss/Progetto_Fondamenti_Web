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
