import { React, useContext, useState, useEffect } from "react"; //Usiamo React e useContext per accedere al contesto dell'utente e useState per gestire lo stato del componente
import { useNavigate, useParams } from "react-router-dom";
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
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatRefreshKey, setChatRefreshKey] = useState(0);
  const { userId: profileUserId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [profileUserId, openChat, selectedChat]);

  const handleOpenChat = () => {
    setSelectedChat(null);
    setOpenChat(true);
    setChatRefreshKey((current) => current + 1);
  };

  const handleBack = () => {
    if (selectedChat) {
      setSelectedChat(null); 
      return;
    }
    if (openChat) {
      setOpenChat(false);
      return;
    }
    if (profileUserId) {
      navigate("/dashboard");
      return;
    }
  };

  const handleDirectBack = () => {
    setSelectedChat(null);
  };

  const handleHome = () => {
    setSelectedChat(null);
    setOpenChat(false);
    if (profileUserId) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="dashboard">
      <div className="animation-sidebar">
        <div className="sidebar">
          <Profile sidebar />
          <Stories />
        </div>
        <div className="sidebar-edge"></div>
      </div>
      <div className="MainSection">
        {!openChat ? (
          profileUserId ? <Profile /> : <Main />
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
            onBack={handleDirectBack}
          />
        ) : (
          <Chat key={chatRefreshKey} onSelectChat={setSelectedChat} />
        )}
      </div>
      <ActionBar
        onOpenChat={handleOpenChat}
        onBack={handleBack}
        onHome={handleHome}
      />
    </div>
  );
}

export default Dashboard;
