import './Direct.css'
import { Undo, Send } from 'lucide-react'
import { React, useState, useContext } from 'react'
import { useDirect } from '../Components/Direct'
import { postsContext } from 'Context/PostsContext'
import Modal from '../Components/Modal'
import Post from '../Components/Post'

const Direct = ({ name, onBack, chatId, userId }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [openedPost, setOpenedPost] = useState(null)
  const { posts } = useContext(postsContext)

  const { messages, input, setInput, sendMessage, deleteMessage } = useDirect({
    chatId,
    userId,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    await sendMessage()
  }

  function getForwardPost(text) {
    if (!text || !text.startsWith("FORWARD_POST:")) return null
    const postId = text.replace("FORWARD_POST:", "")
    return posts.find((p) => String(p.id) == String(postId))
  }

  function isForwardMsg(text) {
    return text && text.startsWith("FORWARD_POST:")
  }

  return (
    <div className="DirectContainer">
      <div className="DirectHeader">
        <button type="button" className="DirectBack" onClick={onBack}>
          <Undo />
        </button>
        <div className="HeaderTitle">{name}</div>
      </div>

      <div className="MessagesArea">
        {messages.map((msg) => {
          const forwarded = getForwardPost(msg.text)
          const isForward = isForwardMsg(msg.text)
          return (
            <div
              key={msg.id}
              className={msg.fromMe ? "msg-row msg-me" : "msg-row msg-other"}
            >
              <div
                className={`MessageBubble ${msg.fromMe ? "MessageMine" : "MessageOther"} ${isForward ? "MessageForward" : ""}`}
                onClick={() => {
                  setSelectedMessageId(selectedMessageId == msg.id ? null : msg.id)
                }}
              >
                {isForward ? (
                  <div
                    className="forward-preview"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (forwarded) setOpenedPost(forwarded)
                    }}
                  >
                    {forwarded?.ImgPost ? <img src={forwarded.ImgPost} alt=""/> : <div className="forward-preview-noimg"></div>}
                    <div>
                      <p className="forward-preview-author">{forwarded?.author?.username || "Post inoltrato"}</p>
                      <p className="forward-preview-text">{forwarded?.content || "Tocca per aprire"}</p>
                    </div>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}

                {selectedMessageId == msg.id && (
                  <div className="MessageOptions">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        deleteMessage(msg.id, "me")
                        setSelectedMessageId(null)
                      }}
                    >
                      Elimina per me
                    </button>
                    {msg.fromMe && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          deleteMessage(msg.id, "everyone")
                          setSelectedMessageId(null)
                        }}
                      >
                        Elimina per tutti
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSubmit} className="DirectFooter">
        <input
          type="text"
          className="DirectInput"
          placeholder="Scrivi un messaggio..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="SendButton" type="submit">
          <Send />
        </button>
      </form>

      <Modal
        open={openedPost}
        onClose={() => setOpenedPost(null)}
        content={openedPost && (
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
        )}
      />
    </div>
  )
}

export default Direct
