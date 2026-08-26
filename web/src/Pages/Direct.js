import "bootstrap/dist/css/bootstrap.min.css";
import "./Direct.css"; // Importa il file CSS per gli stili
import { Undo, Send, Camera } from "lucide-react";
import bg from "../Assets/DirectBackground.png"; // Importa l'immagine di sfondo
import React, { useState, useEffect } from "react";
import api from "../api/interceptor"; //preparo il passaggio verso l'iterceptor per fare le chiamate al backend

//Usa grid coso e metti la foto

const Direct = ({ name, onBack, chatId, userId }) => {
  //onBack per tornare nella schermata precedente
  // Messaggi di esempio

  const loadMessages = async () => {
    // da coontrollare
    try {
      const { data } = await api.get("/messages/getMessages", {
        params: { chatId },
      });

      const mappedMessages = data.data.map((msg) => ({
        fromMe: String(msg.sender) === String(userId),
        text: msg.text,
      }));

      setMessages(mappedMessages);
    } catch (error) {
      console.error("Errore nel caricamento messaggi:", error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([...messages, { fromMe: true, text: input }]);
    setInput("");
  };

  return (
    <div className="DirectContainer">
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
