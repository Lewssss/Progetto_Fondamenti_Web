import React from "react";
import { useState } from "react";
import "./Dashboard.css";
import Main from "./Main";
import Chat from "./Chat";
import Profile from "./Profile";
import Stories from "../Components/Stories";
import ActionBar from "../Components/ActionBar";

function Dashboard() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div class="dashboard">
      <div className="animation-sidebar">
        <div class="sidebar">
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
      <div class="MainSection">
        {!openChat ? (
          <Main openChat={openChat} setOpenChat={setOpenChat} />
        ) : (
          <Chat />
        )}
      </div>
      <ActionBar openChat={openChat} setOpenChat={setOpenChat} />
    </div>
  );
}

export default Dashboard;
