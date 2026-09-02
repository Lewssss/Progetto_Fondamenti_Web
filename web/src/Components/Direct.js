import { useCallback, useEffect, useState } from "react";
import api from "../api/interceptor";

export function useDirect({ chatId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const loadMessages = useCallback(async () => {
    if (!chatId) return;

    try {
      const { data } = await api.get("/messages/getMessages", {
        params: { chatId },
      });

      setMessages(
        (data.data || []).map((message) => ({
          fromMe: String(message.sender) === String(userId),
          text: message.text,
        })),
      );
    } catch (error) {
      console.error("Errore nel caricamento messaggi:", error);
    }
  }, [chatId, userId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || !chatId) return;

    try {
      await api.post("/messages/newMessage", {
        chatId,
        message: text,
      });

      setInput("");
      await loadMessages();
    } catch (error) {
      console.error("Errore invio messaggio:", error);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
  };
}
