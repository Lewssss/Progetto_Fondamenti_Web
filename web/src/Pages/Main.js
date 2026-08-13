import React, { useEffect } from 'react'
import {useState, useContext} from "react";
import './Main.css'
import Post from '../Components/Post'
import ActionBar from '../Components/ActionBar'
import {Circle, CirclePlus} from 'lucide-react'
import {getPosts} from '../endpoints/rest/userUI'
import {userContext} from '../Context/UserContext'
import { postsContext } from 'Context/PostsContext';
function Main(){

    const { posts } = useContext(postsContext)
    const {user} = useContext(userContext);
    
    return (
        <div className="Posts">
            {posts.map(post => 
                <Post
                key = {post.id}
                id = {post.id}
                authorId={post.authorId}
                content={post.content}
                ImgPost={post.ImgPost}
                likes={post.likes}
                comments={post.commentsCount}
                date = {post.date}
                />

            )}
            <ActionBar/>
        </div>
    )
}

export default Main;