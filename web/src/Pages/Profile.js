import React from 'react'
import "./Profile.css"
import { useContext, useState, useEffect } from 'react'
import { getPostofUser } from '../endpoints/rest/userUI'
import { userContext } from '../Context/UserContext'
import Post from '../Components/Post'
import Modal from '../Components/Modal'
import {CirclePlus} from 'lucide-react'
import ImgCreate from '../Components/ImgCreate'

function Profile() {
  const { user, ready } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [create, setCreate] = useState(false);
  useEffect(() => {
    if (!user) {
      setPosts([]);
      return;
    }
    getPostofUser(user.id).then(setPosts);
  }, [user]);
  if (!ready) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  return (
    <div>
      <div className="user-header">
        <div className="user-container">
          <img className="user-picture" src={user.profilePicture} alt="Profile" />
        </div>
        <div className="user-info">
          <h1>{user.username}</h1>
          <div className="user-stats">
            <span className="stat">{posts.length} posts</span>
            <span className="stat">{user.followers.length || 130} followers</span>
            <span className="stat">{user.following.length || 130} following</span>
          </div>
          <p>{user.bio || "No bio available. No bio available. No bio available. No bio available."}</p>
        </div>
        <div className="add-button">
          <button className="add-button" onClick={() => setCreate(true)}>
            <CirclePlus />
          </button>
          <Modal open={create} onClose={() =>setCreate(false)} content={<ImgCreate onClose={() => setCreate(false)}/>}/>
        </div>
      </div>
      <div className="posts">
            {posts.map(post => 
                <Post
                key = {post.id}
                id = {post.id}
                content = {post.content}
                authorId={post.authorId}
                ImgPost={post.ImgPost}
                likes={post.likes}
                comments={post.comments}
                date = {post.date}
                />
            )}
        </div>
    </div>
  )
}

export default Profile;
