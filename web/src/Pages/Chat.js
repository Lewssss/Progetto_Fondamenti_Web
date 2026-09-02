import React from "react";
import "./Chat.css";
import { useChat } from "../Components/Chat";

function Chat({ onSelectChat }) {
  const { chats, loading, user } = useChat();

  if (loading) return <p>Caricamento chat...</p>;
  if (!chats.length) return <p>Nessuna chat disponibile</p>;

  return (
    <div className="ChatContainer">
      <h1 className="Titolo">Le tue Chat</h1>
      {chats.map((chat) => {
        const names = (chat.participants || [])
          .filter((p) => String(p._id) !== String(user.id)) // Verificare che sia conforme con quanto scritto in precedenza
          .map((p) => p.username)
          .filter(Boolean)
          .join(", ");

        return (
          <div
            key={chat._id}
            className="Blocco-Chat"
            onClick={() => onSelectChat(chat)}
          >
            <div className="Nome">
              {names || "Partecipanti non disponibili"}{" "}
              {chat.unreadCount > 0 && (
                <div className="MessaggiNonLetti">{chat.unreadCount}</div>
              )}
            </div>
            <div className="Ultimo-messaggio">
              {chat.lastMessage?.text || "Nessun messaggio"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Chat;
