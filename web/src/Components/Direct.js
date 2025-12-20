import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Direct.css"; // Importa il file CSS per gli stili
import { Undo, Send, Camera } from "lucide-react";
import bg from "../Assets/DirectBackground.png"; // Importa l'immagine di sfondo

//Usa grid coso e metti la foto

const Direct = ({ name, onBack }) => {
  //onBack per tornare nella schermata precedente
  // Messaggi di esempio
  const [messages, setMessages] = useState([
    { fromMe: false, text: "Ciao! 👋" },
    { fromMe: true, text: "Ciao! Come va?" },
    { fromMe: false, text: "Tutto bene, tu?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([...messages, { fromMe: true, text: input }]);
    setInput("");
  };

  return (
    <div
      className="DirectContainer"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header stile Instagram */}
      <div className="DirectHeader">
        <button className="BackButton" onClick={onBack}>
          <Undo color="#7887f2" />{" "}
        </button>
        <div className="HeaderTitle">{name}</div>
      </div>
      {/* Messaggi */}
      <div className="MessagesArea">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex mb-2 ${
              msg.fromMe ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded ${
                msg.fromMe ? "bg-primary text-white" : "bg-light border"
              }`}
              style={{ maxWidth: "70%" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input per nuovo messaggio */}
      <form onSubmit={handleSend} className="DirectFooter">
        <button className="CameraButton" type="button">
          <Camera color="#4953d4" />
        </button>
        <input
          type="text"
          className="DirectInput"
          placeholder="Scrivi un messaggio..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="SendButton" type="submit">
          <Send color="#1d2a86" />
        </button>
      </form>
    </div>
  );
};

export default Direct;
