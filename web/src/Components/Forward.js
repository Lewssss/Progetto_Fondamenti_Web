import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { userContext } from 'Context/UserContext'
import { getUser, getUserChats, createChatsForFollowers } from '../endpoints/rest/userUI'
import { sendChatMessage } from '../endpoints/rest/userInteractions'
import './Forward.css'

function Forward({post, onClose}){
  const {user} = useContext(userContext)
  const [following,setFollowing] = useState([])

  useEffect(() => {
    //carichiamo i following dell'utente loggato
    getUser(user.id)
    .then((me) => Promise.all(me.following.map((id) => getUser(id))))
    .then((list) => setFollowing(list))
    .catch((err) => console.log("Errore following", err))
  }, [user.id])

  function forwardTo(target){
    createChatsForFollowers()
    .then(() => getUserChats())
    .then((chats) => {
      const chat = chats.find((c) => c.participants.some((p) => p._id == target.id))
      const text = "FORWARD_POST:" + post.id
      return sendChatMessage(chat.id, text)
    })
    .then(() => onClose())
    .catch((err) => console.log("Errore inoltro", err))
  }

  return(
    <div className="forward-box">
      <h1>Inoltra a</h1>
      {following.length == 0 ? <p className="forward-empty">Nessun following</p> :
        <div className="forward-list">
          {following.map((f) => (
            <div key={f.id} className="forward-user" onClick={() => forwardTo(f)}>
              <img src={f.profilePicture} alt=""/>
              <span>{f.username}</span>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
export default Forward
