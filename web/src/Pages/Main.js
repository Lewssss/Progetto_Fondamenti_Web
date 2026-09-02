import React, { useEffect } from "react";
import { useState, useContext } from "react";
import "./Main.css";
import Post from "../Components/Post";
import ActionBar from "../Components/ActionBar";
import { Circle, CirclePlus } from "lucide-react";
import { getPosts } from "../endpoints/rest/userUI";
import { userContext } from "../Context/UserContext";
import { postsContext } from "Context/PostsContext";
function Main({}) {
  const { posts,loading } = useContext(postsContext);
  const { user } = useContext(userContext);
  if(loading) return <div className="Posts">Caricamento...</div>
  if (posts.length === 0) return <div className="Posts">Nessun post</div>;
  return (
    <div className="Posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          authorId={post.authorId}
          author={post.author}
          content={post.content}
          ImgPost={post.ImgPost}
          likes={post.likes}
          comments={post.commentsCount}
          date={post.date}
        />
      ))}
    </div>
  );
}

export default Main;
