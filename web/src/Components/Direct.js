import { useCallback, useEffect, useState } from "react";
import api from "../api/interceptor";
import { getMessages, MessagesAsRead } from "../endpoints/rest/userUI";
import { deleteMessage as deleteMessageRequest } from "../endpoints/rest/userInteractions";

export function useDirect({ chatId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const loadMessages = useCallback(async () => {
    if (!chatId) return;

    try {
      const rows = await getMessages(chatId);

      setMessages(
        rows.map((message) => ({
          id: message.id,
          fromMe: String(message.sender) === String(userId),
          text: message.text,
        })),
      );
    } catch (error) {
      console.error("Errore nel caricamento messaggi:", error);
    }
  }, [chatId, userId]);

  useEffect(() => {
    if (!chatId || !userId) return;

    async function openChat() {
      try {
        await MessagesAsRead(chatId);
      } catch (error) {
        console.error("Errore aggiornamento messaggi letti:", error);
      }

      await loadMessages();
    }

    openChat();
  }, [chatId, userId, loadMessages]);

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

  const deleteMessage = async (messageId, who) => {
    try {
      await deleteMessageRequest(messageId, who);

      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== messageId),
      );
    } catch (error) {
      console.error("Errore eliminazione messaggio:", error);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    deleteMessage,
  };
}
