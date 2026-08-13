import { createContext, useState, useEffect, useContext } from "react";
import { getPosts } from "../endpoints/rest/userUI";
import { userContext } from "./UserContext";
export const postsContext = createContext({});
export function PostsContextProvider({ children }) {

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const {user} = useContext(userContext)
  
  function refreshPosts() {
    getPosts().then(
        (data) => 
            setPosts(data)
    );
  }
  function PublishedOn(date){ //per non stampare la data rozza come viene dal db, la elaboriamo 
    const published = new Date(date);
    const now = new Date();
    const seconds = Math.floor((now - published) / 1000);
    if (seconds < 60) return "poco fa";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes == 1 ? "1 minuto fa" : `${minutes} minuti fa`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours == 1 ? "1 ora fa" : `${hours} ore fa`;
    const days = Math.floor(hours / 24);
    if (days < 7) return days == 1 ? "1 giorno fa" : `${days} giorni fa`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return weeks == 1 ? "1 settimana fa" : `${weeks} settimane fa`;
    const months = Math.floor(days / 30);
    if (months < 12) return months == 1 ? "1 mese fa" : `${months} mesi fa`;
    const years = Math.floor(days / 365);
    return years === 1 ? "1 anno fa" : `${years} anni fa`;
  }
  useEffect(() => {
    if(user) {//altrimenti andiamo incontro a 401 infiniti perche' carica subito i post appena entra (prima di essere reindirizzato verso /login o /register), e getPosts in backend e' autenticato
      refreshPosts() 
    } else {
      setPosts([]);
      return;
    }
  }, [user]);

  return (
    <postsContext.Provider value={{ posts, setPosts,comments, setComments, refreshPosts, PublishedOn}}>
      {children}
    </postsContext.Provider>
  );
}