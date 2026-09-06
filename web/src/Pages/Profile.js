import React from 'react'
import "./Profile.css"
import { useContext, useState, useEffect } from 'react'
import { getUser } from '../endpoints/rest/userUI'
import { userContext } from '../Context/UserContext'
import Post from '../Components/Post'
import Modal from '../Components/Modal'
import { useParams } from 'react-router-dom'
import EditProfile from '../Components/EditProfile'
import { updateFollow } from 'endpoints/rest/userInteractions'
import { postsContext } from 'Context/PostsContext'
import { getStoriesOfUser } from 'endpoints/rest/userInteractions'
import StoriesView from 'Components/StoriesView'
import Story_create from 'Components/Story_create'

function Profile({ sidebar }) {
  const { userId } = useParams();
  const { user: userLogged } = useContext(userContext);
  const viewedId = sidebar ? null : userId;
  const isOwnProfile = !viewedId || viewedId === userLogged?.id;
  const [userdata, setUserdata] = useState(null);
  const { posts: allPosts} = useContext(postsContext);//prendiamo i post dal context che gia usiamo in main, non servono state aggiuntivi (e si refresha solo se qualcuno aggiunge post)
  const [selectedPost, setSelectedPost] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [showStoryCreate, setShowStoryCreate] = useState(false);
  const targetId = isOwnProfile ? userLogged?.id : viewedId;
  const posts= allPosts.filter((post) => String(post.authorId) === String(targetId)).slice(0,6) //dato che da backend ordiniamo per ordine recente, i primi 6 sono i piu nuovi

  useEffect(() => {
    if(!targetId || targetId === "undefined") return; 
    getUser(targetId)
    .then((data) => {
      setUserdata(data)
    })
    .catch((err) => console.log("Errore nel fetch del profilo", err));
  }, [viewedId, userLogged]); 

  useEffect(() => {
    if (!targetId || targetId === "undefined") return;
    loadStories();
  }, [targetId]);

  function loadStories() {
    getStoriesOfUser(targetId)
    .then((response) => setUserStories(response.data.data))
    .catch((err) => console.log("Errore nel fetch delle storie", err));
  }

  const isFollowing = userdata?.followers?.some((followerId) => followerId === userLogged?.id);
  function handleFollow() {
    updateFollow(viewedId)
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
      <div className="profile-stories">
        {userStories.length > 0 && (
          <div className="story-circle" onClick={() => setShowStoryViewer(true)}>
            <div className='story-circle-inner'>
              <img src={userdata?.profilePicture} alt="Storie" />
            </div>
          </div>
        )}
        {isOwnProfile && (
          <button type="button" onClick={() => setShowStoryCreate(true)}>Aggiungi storia</button>
        )}
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
      <Modal
        open={showStoryViewer}
        onClose={() => setShowStoryViewer(false)}
        content={userStories.length > 0 && (
          <StoriesView
            group={{ author: userdata, stories: userStories }}
            onClose={() => setShowStoryViewer(false)}
          />
        )}
      />
      <Modal
        open={showStoryCreate}
        onClose={() => setShowStoryCreate(false)}
        content={
          <Story_create
            onClose={() => setShowStoryCreate(false)}
            onCreated={loadStories}
          />
        }
      />
      <hr className='divider'></hr>
      <div className='tabs'>
        POST
      </div>
      <div className="post-grid">
        {posts.length == 0 ? (
          <p className="no-posts">Nessun post</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="grid-item" onClick={() => setSelectedPost(post)}>
              <img src={post.ImgPost} alt="" />
            </div>
          ))
        )}
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