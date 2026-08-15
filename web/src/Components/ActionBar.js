import React from "react";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import "./ActionBar.css";
import PostCreate from "./Post_create";
import Modal from "./Modal";
function ActionBar({ openChat, setOpenChat }) {
  const [create, setCreate] = useState(false);

  return (
    <>
      <div className="ActionBar">
        <MessagesSquare
          className="ChatButton"
          onClick={() => setOpenChat(true)}
        />
        <CirclePlus className="CreatePost" onClick={() => setCreate(true)} />
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
