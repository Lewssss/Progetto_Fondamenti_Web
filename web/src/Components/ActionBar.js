import React from 'react'
import { useState } from 'react'
import { CirclePlus } from 'lucide-react'
import { MessagesSquare } from 'lucide-react'
import { ArrowBigLeft } from 'lucide-react'
import { Search as SearchIcon } from 'lucide-react'
import './ActionBar.css'
import PostCreate from './Post_create'
import Search from './Search'
import Modal from './Modal'

function ActionBar({ onOpenChat, onBack, onHome }){
  const [create,setCreate] = useState(false)
  const [search,setSearch] = useState(false)

  return(
    <>
      <div className="ActionBar">
        <svg className="HomeButton" viewBox="0 0 24 24" strokeWidth="1" onClick={onHome}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <MessagesSquare className="ChatButton" strokeWidth={1} onClick={onOpenChat}/>
        <SearchIcon className="SearchButton" strokeWidth={1} onClick={() => setSearch(true)}/>
        <CirclePlus className="CreatePost" strokeWidth={1} onClick={() => setCreate(true)}/>
        <ArrowBigLeft className="BackButton" strokeWidth={1} onClick={onBack}/>
      </div>
      <Modal open={create} onClose={() => setCreate(false)} content={<PostCreate onClose={() => setCreate(false)}/>}/>
      <Modal open={search} onClose={() => setSearch(false)} content={<Search onClose={() => setSearch(false)}/>}/>
    </>
  )
}
export default ActionBar
