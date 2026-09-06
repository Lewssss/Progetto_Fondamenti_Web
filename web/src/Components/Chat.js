import { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContext";
import {
  getUserChats,
  createChatsForFollowers,
} from "../endpoints/rest/userUI";

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

    async function loadChats() {
      setLoading(true);

      try {
        await createChatsForFollowers();

        const rows = await getUserChats();
        setChats(rows || []);
      } catch (error) {
        console.error("Errore sincronizzazione chat:", error);
        setChats([]);
      } finally {
        setLoading(false);
      }
    }

    loadChats();
  }, [ready, user?.id]);

  return {
    chats,
    loading,
    user,
  };
}
