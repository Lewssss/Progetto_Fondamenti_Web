import React from 'react'
import "./Profile.css"
import { useContext, useState, useEffect } from 'react'
import { getPostofUser } from '../endpoints/rest/userUI' //inutile, prendiamo dal context che usiamo anche in main per i post
import { getUser } from '../endpoints/rest/userUI'
import { userContext } from '../Context/UserContext'
import Post from '../Components/Post'
import Modal from '../Components/Modal'
import { useParams } from 'react-router-dom'
import EditProfile from '../Components/EditProfile'
import { mapPost } from 'endpoints/mappers/userMapper'
import { updateFollow } from 'endpoints/rest/userInteractions'
import { postsContext } from 'Context/PostsContext'

function Profile() {
  const { userId } = useParams();         
  const { user: userLogged } = useContext(userContext);       
  const isOwnProfile = !userId || userId === userLogged?.id;   
  const [userdata, setUserdata] = useState(null);
  const { posts: allPosts} = useContext(postsContext);//prendiamo i post dal context che gia usiamo in main, non servono state aggiuntivi (e si refresha solo se qualcuno aggiunge post)
  const [selectedPost, setSelectedPost] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const targetId = isOwnProfile ? userLogged?.id : userId;
  const posts= allPosts.filter((post) => String(post.authorId) === String(targetId)).slice(0,6) //dato che da backend ordiniamo per ordine recente, i primi 6 sono i piu nuovi
  useEffect(() => {
    if(!targetId || targetId === "undefined") return; 
    getUser(targetId)
    .then((data) => {
      setUserdata(data)
    })
    .catch((err) => console.log("Errore nel fetch del profilo", err));
  }, [userId, userLogged]); 
    const isFollowing = userdata?.followers?.some((followerId) => followerId === userLogged?.id);
    function handleFollow() {
      updateFollow(userId)
      .then((res) => {
        setUserdata(prev => ({ ...prev, followers: res.data.followers }));
      })
      .catch((error) => console.log("Errore nel follow", error));
    }
  return (
    <div className="profile">
      <div className="user-header">
        <div className="profile-user">
          <img className="profile-userimg" src={userdata?.profilePicture} alt="Foto profilo" />
          <div className="profile-userdata">
            <p className="profile-username">{userdata?.username || "Utente"}</p>
            {userdata?.bio ? <p className="bio">{userdata.bio}</p> : ''}
          </div>
        </div>
        <div className="followers">
          <span><strong>{userdata?.followers?.length || 0}</strong> followers</span>
          <span><strong>{userdata?.following?.length || 0}</strong> following</span>
        </div>
        <div className="profile-actions">
          {isOwnProfile ?
            <button type="button" id="Edit" onClick={() => setEditModalOpen(true)}>Modifica Profilo</button>
            :
            <button type="button" id="Follow" onClick={handleFollow}>{isFollowing ? "Non seguire" : "Segui"}</button>
          }
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
      <hr className='divider'></hr>
      <div className='tabs'>
        POST
      </div>
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
            author={selectedPost.author}
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