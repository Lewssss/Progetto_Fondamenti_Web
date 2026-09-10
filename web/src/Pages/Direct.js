import "./Direct.css";
import { Undo, Send } from "lucide-react";
import { React, useState, useContext } from "react";
import { useDirect } from "../Components/Direct";
import { postsContext } from "Context/PostsContext";
import Modal from "../Components/Modal";
import Post from "../Components/Post";

const Direct = ({ name, onBack, chatId, userId }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [openedPost, setOpenedPost] = useState(null);
  const { posts } = useContext(postsContext);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const {
    messages,
    input,
    setInput,
    sendMessage,
    deleteMessage,
    clearChat,
    deleteChat,
  } = useDirect({ chatId, userId });

  const handleClearChat = async () => {
    await clearChat();
    setShowChatOptions(false);
  };

  const handleDeleteChat = async () => {
    await deleteChat();
    setShowChatOptions(false);
    onBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage();
  };

  function getForwardPost(text) {
    if (!text || !text.startsWith("FORWARD_POST:")) return null;
    const postId = text.replace("FORWARD_POST:", "");
    return posts.find((post) => String(post.id) === String(postId));
  }

  function isForwardMsg(text) {
    return text && text.startsWith("FORWARD_POST:");
  }

  return (
    <div className="direct-container">
      <div className="direct-header">
        <button type="button" className="direct-back" onClick={onBack}>
          <Undo />
        </button>
        <div className="chat-title-wrapper">
          <button
            type="button"
            className="header-title"
            onClick={() => setShowChatOptions((current) => !current)}
          >
            {name}
          </button>

          {showChatOptions && (
            <div className="chat-options">
              <button type="button" onClick={handleClearChat}>
                Cancella tutti i messaggi
              </button>

              <button type="button" onClick={handleDeleteChat}>
                Cancella chat
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="messages-area">
        {messages.map((msg) => {
          const forwarded = getForwardPost(msg.text);
          const isForward = isForwardMsg(msg.text);
          return (
            <div
              key={msg.id}
              className={
                msg.fromMe
                  ? "message-row message-me"
                  : "message-row message-other"
              } //Msg row classe comune a tutti i messaggi, msg-me o msg-other a seconda se il messaggio è mio o dell'altro utente
            >
              <div
                className={`message-bubble ${
                  msg.fromMe ? "message-mine" : "message-other-bubble"
                } ${isForward ? "message-forward" : ""}`}
                onClick={() => {
                  setSelectedMessageId(
                    selectedMessageId == msg.id ? null : msg.id,
                  );
                }}
              >
                {isForward ? (
                  <div
                    className="forward-preview"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (forwarded) setOpenedPost(forwarded);
                    }}
                  >
                    {forwarded?.ImgPost ? (
                      <img src={forwarded.ImgPost} alt="" />
                    ) : (
                      <div className="forward-preview-noimg"></div>
                    )}
                    <div>
                      <p className="forward-preview-author">
                        {forwarded?.author?.username || "Post inoltrato"}
                      </p>
                      <p className="forward-preview-text">
                        {forwarded?.content || "Tocca per aprire"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
                {selectedMessageId == msg.id && (
                  <div className="message-options">
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
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="direct-footer">
        <input
          type="text"
          className="direct-input"
          placeholder="Scrivi un messaggio..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" type="submit">
          <Send />
        </button>
      </form>

      <Modal
        open={openedPost}
        onClose={() => setOpenedPost(null)}
        content={
          openedPost && (
            <Post
              id={openedPost.id}
              authorId={openedPost.authorId}
              author={openedPost.author}
              content={openedPost.content}
              ImgPost={openedPost.ImgPost}
              likes={openedPost.likes}
              comments={openedPost.commentsCount}
              date={openedPost.date}
            />
          )
        }
      />
    </div>
  );
};

export default Direct;
