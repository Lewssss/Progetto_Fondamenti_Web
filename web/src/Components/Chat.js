import React, { useState } from "react";
import "./Chat.css"; // Importa il file CSS per gli stili
import bg from "../Assets/DirectBackground.png"; // Importa l'immagine di sfondo

function Chat({ name, onSelectName }) {
  const [selectedIndex, setSelectedIndex] = useState(-1); // useState è un hook che ci permette di creare uno stato locale

  const NoChats = () => {
    return name.length === 0 && <p>Nessuna chat disponibile</p>;
  };

  const handleClick = (event) => {
    console.log(event);
  };

  return (
    <div
      className="ChatContainer"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="Titolo">Le tue Chat</h1>
      {NoChats()}{" "}
      <ul className="list-group">
        {name.map((chat, index) => (
          <li
            key={chat.name} // Usa il nome della chat come chiave
            className={
              "list-group-item d-flex justify-content-between align-items-start " +
              (selectedIndex === index ? "active" : "")
            }
            onClick={(event) => {
              // In questo caso usiamo una funzione freccia per passare più eventi
              handleClick(event);
              setSelectedIndex(index);
              onSelectName(chat.name); // PASSARE SOLO LA STRINGA DEL NOME
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="Blocco-Chat">
              <div className="Nome">{chat.name}</div>
              <div className="Ultimo-messaggio">{chat.lastMessage}</div>
            </div>
            {chat.unread > 0 && (
              <span className="badge bg-danger rounded-pill">
                {chat.unread}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
