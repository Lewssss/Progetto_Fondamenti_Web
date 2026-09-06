import React from 'react'
import { useState, useContext } from 'react'
import './Main.css'
import Post from '../Components/Post'
import { postsContext } from 'Context/PostsContext'
import { userContext } from 'Context/UserContext'

function Main() {
  const [mode, setMode] = useState("following")
  const { posts, loading } = useContext(postsContext)
  const { user } = useContext(userContext)

  const followingIds = (user?.following || []).map((id) => String(id._id || id))

  const followingPosts = posts.filter((post) =>
    followingIds.includes(String(post.authorId)) || String(post.authorId) == String(user.id)
  )

  //esplora: tutti i post, ma prima quelli di chi non seguo
  const esploraPosts = [...posts].sort((a, b) => {
    const aSeguito = followingIds.includes(String(a.authorId)) || String(a.authorId) == String(user.id)
    const bSeguito = followingIds.includes(String(b.authorId)) || String(b.authorId) == String(user.id)
    if (aSeguito == bSeguito) return 0
    return aSeguito ? 1 : -1 //chi non seguo prima
  })

  const feed = mode == "esplora" ? esploraPosts : followingPosts

  if (loading) return <div className="Posts">Caricamento...</div>

  return (
    <div className="Posts">
      <div className="feed-tabs">
        <button
          type="button"
          className={mode == "following" ? "feed-tab active" : "feed-tab"}
          onClick={() => setMode("following")}
        >
          Following
        </button>
        <button
          type="button"
          className={mode == "esplora" ? "feed-tab active" : "feed-tab"}
          onClick={() => setMode("esplora")}
        >
          Esplora
        </button>
      </div>
      {feed.length == 0 ? (
        <p className="feed-empty">{mode == "following" ? "Nessun post dai following" : "Nessun post"}</p>
      ) : (
        feed.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            authorId={post.authorId}
            author={post.author}
            content={post.content}
            ImgPost={post.ImgPost}
            likes={post.likes}
            comments={post.commentsCount}
            date={post.date}
          />
        ))
      )}
    </div>
  )
}

export default Main
