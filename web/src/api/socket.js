import { io } from "socket.io-client";
import { getAccessToken } from "./tokenStorage";

export function createChatSocket() {
  return io("http://localhost:5000", {
    auth: { token: getAccessToken() },
  });
}
