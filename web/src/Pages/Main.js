import React, { useEffect } from 'react'
import {useState, useContext} from "react";
import './Main.css'
import Post from '../Components/Post'
import Footer from '../Components/Footer'
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
                comments={post.comments}
                date = {post.date}
                />

            )}
            <Footer/>
        </div>
    )
}

export default Main;