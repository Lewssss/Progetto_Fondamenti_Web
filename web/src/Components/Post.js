import React, { useContext } from 'react';
import {useEffect, useState} from 'react';
import './Post.css'
import {Flame,MessageCircle,Forward,LucideTrash2} from 'lucide-react';
import {getUserData, getUser} from 'endpoints/rest/userUI';
import { UserLikedPost } from 'endpoints/rest/userInteractions';
import { userContext } from 'Context/UserContext';

function Post({id,authorId,content,ImgPost,likes,comments,date}){
    const user = useContext(userContext);
    const [author,setAuthor] = useState([])
    const [likesCount,setLikesCount] = useState(likes.length);
    const [liked,setLiked] = useState(likes.some(id => String(id)==user.user.id));
        
    

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

    useEffect(
        () => 
            function retrieveAuthorData(){
                getUser(authorId).then(
                (data) =>
                {
                    setAuthor(data);
                }
               )
            }, []
    );


    function addLiketoPost(postId){
        UserLikedPost(user.user.id,postId).then(
            () => 
             {
                if(liked) {
                    setLikesCount(likesCount-1)
                    setLiked(false);
                } else {
                    setLikesCount(likesCount+1)
                    setLiked(true);
                }
             }
        );
    }


    return(
        <div className="Post">
            <div className="user">
                <img  src={author.profilePicture}className="userimg" alt="Immagine utente" />
                <p className="username">{author.username}</p>
                {String(author.id) == user.user.id ? 
                <div className="owner-actions">
                    <LucideTrash2 stroke="red"/>
                </div>
                : ''
                }
            </div>

            <img src={ImgPost} className="posted-image" alt=""/>
            <div className="reactions">
                <p className="reactionCount"><Flame className={liked ?  'reactionicon fire' : 'reactionicon' } onClick={() => addLiketoPost(id)} />{likesCount}</p>         {/* per il like (che sara' il fuoco, vedere icona da lucid) */}
                <p className="reactionCount"><MessageCircle className="reactionicon" />{comments.length}</p>
                <p className="reactionCount"><Forward/></p>
            </div>
            <div className="caption">
                {content}
            </div>
            <div className="comments">

            </div>
            <div className="published">
                {PublishedOn(date)}
            </div>
        </div>
    )
}
export default Post;