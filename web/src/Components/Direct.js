import { useCallback, useEffect, useRef, useState } from "react";
import { createChatSocket } from "../api/socket";
import { getMessages, MessagesAsRead } from "../endpoints/rest/userUI";
import {
  deleteMessage as deleteMessageRequest,
  clearChat as clearChatRequest,
  deleteChat as deleteChatRequest,
} from "../endpoints/rest/userInteractions"; //Vericare se si può fare diversamente

export function useDirect({ chatId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChatOptions, setShowChatOptions] = useState(false);
  const socketRef = useRef(null);

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

  useEffect(() => {
    if (!chatId || !userId) return;

    const socket = createChatSocket();
    socketRef.current = socket;

    socket.emit("join_chat", chatId);

    socket.on("message:new", (message) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: message._id,
          fromMe: String(message.sender) === String(userId),
          text: message.text,
        },
      ]);
    });

    return () => {
      socket.emit("leave_chat", chatId);
      socket.off("message:new");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [chatId, userId]);

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || !chatId) return;

    const socket = socketRef.current;

    if (!socket) return;

    socket.emit("send_message", { chatId, text }, (ack) => {
      if (ack.success) {
        setInput("");
      }
    });
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

  const clearChat = async () => {
    if (!chatId) return;

    try {
      await clearChatRequest(chatId);
      setMessages([]);
    } catch (error) {
      console.error("Errore cancellazione chat:", error);
    }
  };

  const deleteChat = async () => {
    if (!chatId) return;

    try {
      await deleteChatRequest(chatId);
      setMessages([]);
    } catch (error) {
      console.error("Errore cancellazione chat:", error);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    deleteMessage,
    clearChat,
    deleteChat,
  };
}
