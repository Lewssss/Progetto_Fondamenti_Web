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
  ]
  function getStories() {
    getStoriesFromFriends()
    .then(stories => setStories(stories))
    .catch(error => console.error('Error fetching stories:', error))

  }
  return (
    <div>
      <h1>Stories</h1>
    </div>
  )
}

export default Stories