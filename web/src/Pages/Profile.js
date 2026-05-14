import React from 'react'
import { useContext } from 'react'
import { userContext } from '../Context/UserContext'

function Profile() {
  const { user, ready } = useContext(userContext);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <header className='header'>
        <div className='image-container'>
          <img src={user.profilePicture} alt="" className='profile-picture' />
        </div>

        <div className='profile-info'>

          <section className='info-top'>
            <h2>{user.username}</h2>
          </section>

          <section className='info-stats'>
           <span><strong>{user.followers?.length || 0}</strong> Followers</span>
           <span><strong>{user.following?.length || 0}</strong> Following</span>
          </section>

          <section className='info-bottom'>
            <p>{user.bio}</p>
          </section>

        </div>
      </header>
    </div>
  )
}

export default Profile