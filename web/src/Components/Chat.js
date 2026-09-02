import { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContext";
import { getUserChats } from "../endpoints/rest/userUI";

export function useChat() {
  const { user, ready } = useContext(userContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    if (!user?.id) {
      setChats([]);
      setLoading(false);
      return;
    }

    //setLoading(true);

    getUserChats(user.id)
      .then((rows) => setChats(rows || []))
      .catch((error) => {
        console.error("Errore caricamento chat:", error);
        setChats([]);
      })
      .finally(() => setLoading(false));
  }, [ready, user?.id]);

  return {
    chats,
    loading,
    user,
  };
}
