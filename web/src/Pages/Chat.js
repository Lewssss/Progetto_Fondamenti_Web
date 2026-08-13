import React, { useState } from "react";
import "./Chat.css"; // Importa il file CSS per gli stili

function Chat() {
  const NoChats = () => {
    return <p>Nessuna chat disponibile</p>;
  };

  const handleClick = (event) => {
    console.log(event);
  };

  return (
    <div className="ChatContainer">
      <h1 className="Titolo">Le tue Chat</h1>
      {NoChats()}{" "}
    </div>
  );
}

export default Chat;
