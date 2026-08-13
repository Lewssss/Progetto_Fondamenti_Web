import axios from "axios";
import { handleApiMessage, showErrorMessage } from "./messageHandler";
import {
  clearAuthStorage,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./tokenStorage";

const api = axios.create({
  baseURL: "/api", //serve a buttare le richieste verso il backend
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    handleApiMessage(response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url || "";

    const canTryRefresh =
      status === 403 &&
      originalRequest &&
      !originalRequest._retry &&
      !requestUrl.includes("/user/refresh-token") &&
      !requestUrl.includes("/user/login") &&
      !requestUrl.includes("/user/register");

    if (canTryRefresh) {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        //clearAuthStorage();
      } else if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      } else {
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await axios.post("/api/user/refresh-token", {
            refreshToken,
          });

          setTokens(data.token);
          processQueue(null, data.token);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          clearAuthStorage();
          showErrorMessage("Sessione scaduta. Effettua di nuovo il login.");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    const body = error.response?.data;

    if (body && typeof body === "object" && body.skipMessage !== undefined) {
      handleApiMessage(body);
    } else if (body?.message) {
      showErrorMessage(body.message);
    } else if (!error.response) {
      showErrorMessage("Errore di connessione al server");
    } else {
      showErrorMessage("Errore generico");
    }

    return Promise.reject(error);
  },
);

export default api;
