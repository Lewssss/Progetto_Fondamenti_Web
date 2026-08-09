import { createContext, useState, useEffect } from "react";
import { getPosts } from "../endpoints/rest/userUI";
export const postsContext = createContext({});
export function PostsContextProvider({ children }) {

  const [posts, setPosts] = useState([]);
  
  function refreshPosts() {
    getPosts().then(
        (data) => 
            setPosts(data)
    );
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <postsContext.Provider value={{ posts, setPosts, refreshPosts }}>
      {children}
    </postsContext.Provider>
  );
}