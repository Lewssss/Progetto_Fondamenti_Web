import { createContext, useState, useEffect } from "react";
import { accountCheckAndGet } from "../endpoints/rest/auth";
import { clearAuthStorage, getAccessToken } from "../api/tokenStorage";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      accountCheckAndGet()
        .then((currentUser) => {
          setUser(currentUser);
          setReady(true);
        })
        .catch((err) => {
          clearAuthStorage();
          setReady(true);
        });
    } else {
      setReady(true);
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, ready }}>
      {children}
    </userContext.Provider>
  );
}
