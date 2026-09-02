import { React, useContext, useState } from "react"; //Usiamo React e useContext per accedere al contesto dell'utente e useState per gestire lo stato del componente
import { userContext } from "../Context/UserContext"; //Questo userContext invece e un contesto più specifico definito da noi
import "./Dashboard.css";
import Main from "./Main";
import Chat from "./Chat";
import Direct from "./Direct";
import Profile from "./Profile";
import Stories from "../Components/Stories";
import ActionBar from "../Components/ActionBar";

function Dashboard() {
  const [openChat, setOpenChat] = useState(false);
  const { user } = useContext(userContext);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <div className="dashboard">
      <div className="animation-sidebar">
        <div className="sidebar">
          <Profile />
          <Stories />
        </div>

        <div className="wave-edge" aria-hidden="true">
          <div className="wave-track">
            <svg
              className="wave-svg"
              viewBox="0 0 56 200"
              preserveAspectRatio="none"
            >
              <path
                className="wave-fill"
                d="M56,0 H26
                  C40,4 12,8 26,12
                  C42,17 8,22 24,28
                  C38,33 14,37 28,42
                  C44,48 6,53 22,58
                  C36,63 16,67 30,72
                  C46,78 4,83 20,88
                  C34,93 18,97 26,100
                  C40,104 12,108 26,112
                  C42,117 8,122 24,128
                  C38,133 14,137 28,142
                  C44,148 6,153 22,158
                  C36,163 16,167 30,172
                  C46,178 4,183 20,188
                  C34,193 18,197 26,200
                  H56 Z"
              />
              <path
                className="wave-line"
                fill="none"
                d="M26,0
                  C40,4 12,8 26,12
                  C42,17 8,22 24,28
                  C38,33 14,37 28,42
                  C44,48 6,53 22,58
                  C36,63 16,67 30,72
                  C46,78 4,83 20,88
                  C34,93 18,97 26,100
                  C40,104 12,108 26,112
                  C42,117 8,122 24,128
                  C38,133 14,137 28,142
                  C44,148 6,153 22,158
                  C36,163 16,167 30,172
                  C46,178 4,183 20,188
                  C34,193 18,197 26,200"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="MainSection">
        {!openChat ? (
          <Main/>
        ) : selectedChat ? (
          <Direct
            name={selectedChat.participants
              ?.filter(
                (participant) => String(participant._id) !== String(user?.id),
              )
              .map((participant) => participant.username)
              .join(", ")}
            chatId={selectedChat.id}
            userId={user?.id}
            onBack={handleBack}
          />
        ) : (
          <Chat onSelectChat={setSelectedChat} />
        )}
      </div>
      <ActionBar openChat={openChat} setOpenChat={setOpenChat} />
    </div>
  );
}

export default Dashboard;
