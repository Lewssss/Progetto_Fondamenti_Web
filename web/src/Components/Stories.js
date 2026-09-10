import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { getStories } from 'endpoints/rest/userInteractions'
import StoriesView from './StoriesView'
import Modal from './Modal'
import { userContext } from 'Context/UserContext';
import "./Stories.css"

function Stories() {
  const [allStories, setAllStories] = useState([]);
  const [selectedStories, setSelectedStories] = useState(null);
  const user = useContext(userContext);
  useEffect(() => {
    showStories();
  }, []);
  async function showStories() {
    const response = await getStories(user.user.id);
    setAllStories(response.data.data);
  }
  return (
    <div className='stories-container'>
      {allStories.map((storiesOfUser) => (
        <div 
          key={storiesOfUser.author._id} 
          className='stories-circle' 
          onClick={() => setSelectedStories(storiesOfUser)}
        >
          <img className="" src={storiesOfUser.author.profilePicture} />
        </div>
      ))}
      <Modal
        open={!!selectedStories}
        onClose={() => setSelectedStories(null)}
        content={
          selectedStories && (
            <StoriesView
              group={selectedStories}
              onClose={() => setSelectedStories(null)}
            />
          )
        }
      />
    </div>
  )
}

export default Stories