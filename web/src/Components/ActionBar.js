import React from "react";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ActionBar.css";
import PostCreate from "./Post_create";
import Modal from "./Modal";
function ActionBar({ openChat, setOpenChat }) {
  const [create, setCreate] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="ActionBar">
        <MessagesSquare
          className="ChatButton"
          onClick={() => setOpenChat(true)}
        />
        <CirclePlus className="CreatePost" onClick={() => setCreate(true)} />
        <ArrowBigLeft className="BackButton" onClick={() => navigate(-1)} />
      </div>
      <Modal
        open={create}
        onClose={() => setCreate(false)}
        content={<PostCreate onClose={() => setCreate(false)} />}
      />
    </>
  );
}

export default ActionBar;
