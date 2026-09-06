import React from 'react'
import './Chat.css'
import { useChat } from '../Components/Chat'

function Chat({ onSelectChat }) {
  const { chats, loading, user } = useChat()

  if (loading) return <div className="ChatContainer"><p className="chat-empty">Caricamento chat...</p></div>
  if (!chats.length) return <div className="ChatContainer"><p className="chat-empty">Nessuna chat disponibile</p></div>

  return (
    <div className="ChatContainer">
      <h1 className="Titolo">Le tue Chat</h1>
      {chats.map((chat) => {
        const other = (chat.participants || []).filter((p) => p._id != user.id)
        const names = other.map((p) => p.username).filter(Boolean).join(", ")
        const pic = other[0]?.profilePicture

        return (
          <div key={chat.id} className="Blocco-Chat" onClick={() => onSelectChat(chat)}>
            <img className="chat-avatar" src={pic} alt=""/>
            <div className="chat-info">
              <div className="Nome">
                {names || "Utente"}
                {chat.unreadCount > 0 && (
                  <div className="MessaggiNonLetti">{chat.unreadCount}</div>
                )}
              </div>
              <div className="Ultimo-messaggio">
                {chat.lastMessage?.text?.startsWith("FORWARD_POST:")
                  ? "Ha inoltrato un post"
                  : (chat.lastMessage?.text || "Nessun messaggio")}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Chat
