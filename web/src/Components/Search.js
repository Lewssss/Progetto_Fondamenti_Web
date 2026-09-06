import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { postsContext } from 'Context/PostsContext'
import { searchUsers } from '../endpoints/rest/userUI'
import Modal from './Modal'
import Post from './Post'
import './Search.css'

function Search({onClose}){
  const [query,setQuery] = useState("")
  const [users,setUsers] = useState([])
  const [selectedPost,setSelectedPost] = useState(null)
  const {posts} = useContext(postsContext)
  const navigate = useNavigate()

  //post filtrati dalla descrizione, usiamo quelli gia nel context
  const foundPosts = query.trim() == "" ? [] : posts.filter((post) => (post.content || "").toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if(query.trim() == ""){
      setUsers([])
      return
    }
    searchUsers(query)
    .then((data) => setUsers(data))
    .catch((err) => console.log("Errore search", err))
  }, [query])

  function goProfile(id){
    onClose()
    navigate(`/profile/${id}`)
  }

  return(
    <>
      <div className="search-box">
        <h1>Cerca</h1>
        <input className="search-input" type="text" placeholder="Cerca persone o post..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus></input>
        {query.trim() == "" ?
          <p className="search-hint">Scrivi qualcosa per cercare</p>
          :
          <div className="search-results">
            <h2>Persone</h2>
            {users.length == 0 ? <p className="search-empty">Nessuna persona</p> :
              users.map((u) => (
                <div key={u.id} className="search-user" onClick={() => goProfile(u.id)}>
                  <img src={u.profilePicture} alt=""/>
                  <span>{u.username}</span>
                </div>
              ))
            }
            <h2>Post</h2>
            {foundPosts.length == 0 ? <p className="search-empty">Nessun post</p> :
              foundPosts.map((post) => (
                <div key={post.id} className="search-post" onClick={() => setSelectedPost(post)}>
                  {post.ImgPost ? <img src={post.ImgPost} alt=""/> : <div className="search-post-noimg"></div>}
                  <div className="search-post-info">
                    <p className="search-post-author">{post.author?.username || "Utente"}</p>
                    <p className="search-post-text">{post.content}</p>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </div>
      <Modal open={selectedPost} onClose={() => setSelectedPost(null)} content={selectedPost && (
        <Post
          id={selectedPost.id}
          authorId={selectedPost.authorId}
          author={selectedPost.author}
          content={selectedPost.content}
          ImgPost={selectedPost.ImgPost}
          likes={selectedPost.likes}
          comments={selectedPost.commentsCount}
          date={selectedPost.date}
        />
      )}/>
    </>
  )
}
export default Search
