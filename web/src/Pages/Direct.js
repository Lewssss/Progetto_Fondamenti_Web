import "bootstrap/dist/css/bootstrap.min.css";
import "./Direct.css"; // Importa il file CSS per gli stili
import { Undo, Send, Camera } from "lucide-react";
import { React, useState } from "react";
import { useDirect } from "../Components/Direct";

//Usa grid coso e metti la foto
const Direct = ({ name, onBack, chatId, userId }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const { messages, input, setInput, sendMessage, deleteMessage } = useDirect({
    chatId,
    userId,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage();
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex mb-2 ${
              msg.fromMe ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`MessageBubble ${
                msg.fromMe ? "MessageMine" : "MessageOther"
              }`}
              onClick={() => {
                setSelectedMessageId(
                  selectedMessageId === msg.id ? null : msg.id,
                );
              }}
            >
              <span>{msg.text}</span>

              {selectedMessageId === msg.id && (
                <div className="MessageOptions">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteMessage(msg.id, "me");
                      setSelectedMessageId(null);
                    }}
                  >
                    Elimina per me
                  </button>

                  {msg.fromMe && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteMessage(msg.id, "everyone");
                        setSelectedMessageId(null);
                      }}
                    >
                      Elimina per tutti
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Input per nuovo messaggio */}
      <form onSubmit={handleSubmit} className="DirectFooter">
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
