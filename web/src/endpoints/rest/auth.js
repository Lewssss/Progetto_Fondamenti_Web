import api from "../../api/interceptor";
import { mapUser } from "../mappers/userMapper";
import {
  clearAuthStorage,
  getRefreshToken,
  setStoredUser,
  setTokens,
} from "../../api/tokenStorage";

export async function accountLogin(email, password) {
  const { data } = await api.post("/user/login", { email, password });

  const loginResponse = {
    success: Boolean(data.success),
    token: data.token,
    refreshToken: data.refreshToken,
    user: mapUser(data.user),
  };

  if (loginResponse.token && loginResponse.refreshToken) {
    setTokens(loginResponse.token, loginResponse.refreshToken);
    setStoredUser(loginResponse.user);
  }

  return loginResponse;
}

export async function accountRegister(username, email, password) {
  await api.post("/user/register", {
    username,
    email,
    password,
  });
}

export async function accountCheckAndGet() {
  const { data } = await api.get("/user/checkandget");
  return mapUser(data);
}

export async function accountLogout() {
  const refreshToken = getRefreshToken();
  try {
    await api.post("/user/logout", { refreshToken });
  } finally {
    clearAuthStorage();
  }
}
