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
  // ora chats è nello stato così possiamo aggiornarlo
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { user, ready } = useContext(userContext);

  if (!ready) {
    return <div className="loading">Caricamento...</div>;
  }

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null); // torna alla lista chat
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
              !selectedChat ? (
                <Chat onSelectChat={handleSelectChat} />
              ) : (
                <Direct
                  name={selectedChat.participants
                    ?.map((participant) => participant.username)
                    .join(", ")}
                  chatId={selectedChat.id}
                  userId={user.id}
                  onBack={handleBack}
                />
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
