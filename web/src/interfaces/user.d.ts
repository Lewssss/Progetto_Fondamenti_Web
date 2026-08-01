export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string | null;
  followers?: string[];
  following?: string[];
  bio?: string;
}
