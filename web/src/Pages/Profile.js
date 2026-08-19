import React from 'react'
import "./Profile.css"
import { useContext, useState, useEffect } from 'react'
import { getPostofUser } from '../endpoints/rest/userUI'
import { getUser } from '../endpoints/rest/userUI'
import { userContext } from '../Context/UserContext'
import Post from '../Components/Post'
import Modal from '../Components/Modal'
import { useParams } from 'react-router-dom'
import EditProfile from '../Components/EditProfile'
import { mapPost } from 'endpoints/mappers/userMapper'

function Profile() {
  const { userId } = useParams();         
  const { user: userLogged } = useContext(userContext);       
  const isOwnProfile = !userId || userId === userLogged.id;   
  const [userdata, setUserdata] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const targetId = isOwnProfile ? userLogged.id : userId;
    if(!targetId) return; 
    getUser(targetId)
    .then((data) => {
      setUserdata(data)
    })
    .catch((err) => console.log("Errore nel fetch del profilo", err));
    getPostofUser(targetId)
    .then((data) => {
      setPosts(data);
    })
  }, [userId, userLogged]); 
  return (
    <div className="profile-page">
      <div className="user-header">
        <img className="user-pic" src={userdata?.profilePicture || "/default-profile.png"} alt="User Profile Picture" />
        <div className="user-data">
          <h1>{userdata?.username || "Utente"}</h1>
          {userdata?.bio && <p>{userdata.bio}</p>}
        </div>
        <div className="user-stats">
          <span><strong>{userdata?.followers?.length || 130}</strong> followers</span>
          <span><strong>{userdata?.following?.length || 130}</strong> following</span>
        </div>
        <div className="user-actions">
          {isOwnProfile ? (
            <button onClick={() => setEditModalOpen(true)}>Modifica Profilo</button>
          ) : (
            <button>Segui</button>
          )}
        </div>
      </div>
      <Modal 
      open={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      content={
        <EditProfile 
          onClose={() => setEditModalOpen(false)}
          onUpdated={(updated) => setUserdata(prev => ({...prev, ...updated}))}
          userdata={userdata}
        /> 
      }
      />
      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.id} className="grid-item" onClick={() => setSelectedPost(post)}>
            <img src={post.ImgPost} alt="" />
          </div>
        ))}
      </div>
      <Modal 
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        content={selectedPost && (
          <Post 
            id={selectedPost.id}
            authorId={selectedPost.authorId}
            content={selectedPost.content}
            ImgPost={selectedPost.ImgPost}
            likes={selectedPost.likes}
            comments={selectedPost.commentsCount}
            date={selectedPost.date}
          />
       )}
      />
    </div>
  )
}
export default Profile