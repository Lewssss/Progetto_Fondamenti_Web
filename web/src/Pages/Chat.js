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

  //const NoChats = () => {
  //return <p>Nessuna chat disponibile</p>;
  //};

  //const handleClick = (event) => {
  //console.log(event);
  //};

  return (
    <div className="ChatContainer">
      <h1 className="Titolo">Le tue Chat</h1>
      {chats.map((chat) => (
        <div key={chat._id}>{chat._id}</div>
      ))}
      {/* {NoChats()}{" "} */}
    </div>
  );
}

export default Chat;
