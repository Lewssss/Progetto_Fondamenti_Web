import React from "react";
import "./Chat.css";
import { useChat } from "../Components/Chat";

function Chat({ onSelectChat }) {
  const { chats, loading, user } = useChat();

  if (loading) {
    return (
      <div className="chat-container">
        <p className="chat-empty">Caricamento chat...</p>
      </div>
    );
  }

  if (!chats.length) {
    return (
      <div className="chat-container">
        <p className="chat-empty">Nessuna chat disponibile</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <h1 className="chat-title">Le tue Chat</h1>
      {chats.map((chat) => {
        const otherParticipants = (chat.participants || []).filter(
          (participant) => String(participant._id) !== String(user.id),
        );
        const participantNames = otherParticipants
          .map((participant) => participant.username)
          .filter(Boolean)
          .join(", ");
        const profilePicture = otherParticipants[0]?.profilePicture;

        return (
          <div
            key={chat.id}
            className="chat-item"
            onClick={() => onSelectChat(chat)}
          >
            <img className="chat-avatar" src={profilePicture} alt="" />
            <div className="chat-info">
              <div className="chat-name">
                {participantNames || "Utente"}
                {chat.unreadCount > 0 && (
                  <div className="unread-count">{chat.unreadCount}</div>
                )}
              </div>
              <div className="last-message">
                {chat.lastMessage?.text?.startsWith("FORWARD_POST:")
                  ? "Ha inoltrato un post"
                  : chat.lastMessage?.text || "Nessun messaggio"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Chat;
