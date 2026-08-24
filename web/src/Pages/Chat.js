import React, { useContext, useEffect, useState } from "react";
import "./Chat.css"; // Importa il file CSS per gli stili
import { userContext } from "../Context/UserContext";
import { getUserChats } from "../endpoints/rest/userUI";

function Chat(id_utente) {
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

    getUserChats(user.id)
      .then((rows) => setChats(rows || [])) // || vuol dire se il promise ritorna undefined allora setta un array vuoto
      .catch((err) => {
        console.error("Errore caricamento chat:", err);
        setChats([]);
      })
      .finally(() => setLoading(false));
  }, [ready, user?.id]);

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
          <div key={chat._id} className="Blocco-Chat">
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
