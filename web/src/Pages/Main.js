import React, { useEffect } from 'react'
import {useState, useContext} from "react";
import { Flame, MessageCircle , Forward } from 'lucide-react';
import './Main.css'
import Post from '../Components/Post'
import {getPosts} from '../endpoints/rest/userUI'
import {userContext} from '../Context/UserContext'

function Main(){

    const [posts,setPosts] = useState([])
    const {user} = useContext(userContext);
    useEffect(() => {
        // getPosts(user).then(
        //     (data) => setPosts(data)
        // ); DA FARE LATO BACKEND
    });
    return (
        <Post username={user.username}/>
    )
}

export default Main;