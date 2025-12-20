import "./App.css";
import Chat from "./Components/Chat";
import Direct from "./Components/Direct"; // importa Direct
import React, { useState } from "react";

function App() {
  // Dati iniziali
  const InitialChats = [
    { name: "Marco", lastMessage: "Ci vediamo alle 18", unread: 2 },
    { name: "Luca", lastMessage: "Ok 👍", unread: 0 },
    { name: "Giulia", lastMessage: "Ti mando le foto", unread: 5 },
    { name: "Sara", lastMessage: "Grazie!", unread: 0 },
    { name: "Francesco", lastMessage: "A dopo", unread: 1 },
    { name: "Alice", lastMessage: "Perfetto", unread: 0 },
    { name: "Roberto", lastMessage: "Ci sentiamo domani", unread: 3 },
    { name: "Elena", lastMessage: "Buonanotte!", unread: 0 },
    { name: "Matteo", lastMessage: "Dove sei?", unread: 4 },
    { name: "Chiara", lastMessage: "A presto!", unread: 0 },
  ];

  // ora chats è nello stato così possiamo aggiornarlo
  const [chats, setChats] = useState(InitialChats);
  const [selectedName, setSelectedName] = useState(null);

  const handleSelectName = (name) => {
    setChats((prev) =>
      prev.map((c) => (c.name === name ? { ...c, unread: 0 } : c))
    );
    setSelectedName(name); // salva il nome selezionato
  };

  const handleBack = () => {
    setSelectedName(null); // torna alla lista chat
  };

  return (
    <div>
      {/* Se nessun nome è selezionato: mostra Chat a piena larghezza.
          Se c'è un nome selezionato: dividi la pagina in 2 colonne. */}
      {!selectedName ? (
        <Chat name={chats} onSelectName={handleSelectName} />
      ) : (
        <div
          style={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            height: "100vh",
          }}
        >
          <div style={{ flex: "0 0 30%", minWidth: 240 }}>
            <Chat name={chats} onSelectName={handleSelectName} />
          </div>
          <div style={{ flex: "1 1 70%" }}>
            <Direct name={selectedName} onBack={handleBack} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
