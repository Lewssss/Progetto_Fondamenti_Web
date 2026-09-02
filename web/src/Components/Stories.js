import React from 'react'
import { useState } from 'react'
import { getStoriesFromFriends } from '../endpoints/rest/userUI'
import "./Stories.css"


function Stories() {
const [stories, setStories] = useState("")
  const storiesF = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Angelo Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Giuann Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Mngucc Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Pepp Doe',
      image: 'https://via.placeholder.com/150',
    },
  ]
  function getStories() {
    getStoriesFromFriends()
    .then(stories => setStories(stories))
    .catch(error => console.error('Error fetching stories:', error))

  }
  return (
    <div className='stories'>
      <h1>Stories</h1>
      <div className="stories-container">
        {storiesF.map((story) => <div key={story.id} className="user-story">{story.name}</div>)}
      </div>
    </div>
  )
}

export default Stories