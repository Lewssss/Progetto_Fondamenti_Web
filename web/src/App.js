import "./App.css";
import Chat from "./Pages/Chat";
import Direct from "./Pages/Direct"; // importa Direct
import React, { useContext, useState } from "react";
import Profile from "./Pages/Profile"; // importa Profile
import Register from "./Pages/Register"; // importa Register
import Login from "./Pages/Login"; // importa Login
import Dashboard from "./Pages/Dashboard"; //importa Dashboard
import Navbar from "./Components/Navbar"; //import Navbar
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // importa Router
import { userContext } from "./Context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

const MainLayout = () => (
  <>
    <Outlet />
  </>
);

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
  const { user, ready } = useContext(userContext);

  if (!ready) {
    return <div>Loading...</div>;
  }

  const handleSelectName = (name) => {
    setChats((prev) =>
      prev.map((c) => (c.name === name ? { ...c, unread: 0 } : c)),
    );
    setSelectedName(name); // salva il nome selezionato
  };

  const handleBack = () => {
    setSelectedName(null); // torna alla lista chat
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/register" />
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route element={<MainLayout />}>
          <Route
            path="/chat"
            element={
              !selectedName ? (
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
              )
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
