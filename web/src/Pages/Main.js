import React, { useEffect } from 'react'
import {useState, useContext} from "react";
import './Main.css'
import Post from '../Components/Post'
import {getPosts} from '../endpoints/rest/userUI'
import {userContext} from '../Context/UserContext'

function Main(){

    const [posts,setPosts] = useState([])
    const {user} = useContext(userContext);
    useEffect(() => {
        getPosts().then(
            (data) => {
                setPosts(data);
            }
        );
    },[]);
    return (
        <div className="Posts">
            {posts.map(post => 
                <Post
                id = {post.id}
                authorId={post.authorId}
                content={post.content}
                ImgPost={post.ImgPost}
                likes={post.likes}
                comments={post.comments}
                date = {post.date}
                />

            )}
        </div>
    )
}

export default Main;