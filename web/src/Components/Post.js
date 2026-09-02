import React, { useContext } from 'react';
import {useEffect, useState} from 'react';
import './Post.css'
import {Flame,MessageCircle,Forward,LucideTrash2} from 'lucide-react';
import {getUserData, getUser} from 'endpoints/rest/userUI';
import { UserLikedPost,deletePost } from 'endpoints/rest/userInteractions';
import { userContext } from 'Context/UserContext';
import Modal from '../Components/Modal'
import Comments from '../Pages/Comments'
import { postsContext } from 'Context/PostsContext';

function Post({id,authorId,author,content,ImgPost,likes,comments,date}){
    const {user} = useContext(userContext);
    const [likesCount,setLikesCount] = useState(likes.length);
    const [liked,setLiked] = useState(likes.some(id => String(id)==user.id));
    const [confirm,setAskconfirm] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const {refreshPosts,PublishedOn, setComments} = useContext(postsContext);
        
    function addLiketoPost(postId){
        UserLikedPost(user.id,postId).then(
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
    function handlePostDelete(postId){
        deletePost(id)
        .then(
            (data) => {
                setAskconfirm(false);
                refreshPosts();
            }
        ); 
    }
    function onClose(e) {
        setAskconfirm(false);
    }
    function onCloseComments(e) {
        setOpenComment(false);
        setComments([]);
    }

    return(
        <>
            <div className="Post">
                <div className="user">
                    <img  src={author?.profilePicture}className="userimg" alt="Immagine utente" />
                    <p className="username">{author?.username}</p>
                    {String(authorId) == user.id ? 
                    <div className="owner-actions">
                        <LucideTrash2 stroke="red" onClick={() => setAskconfirm(true)}/>
                    </div>
                    : ''
                    }
                </div>

                <img src={ImgPost} className="posted-image" alt=""/>
                <div className="reactions">
                    <p className="reactionCount"><Flame className={liked ?  'reactionicon fire' : 'reactionicon' } onClick={() => addLiketoPost(id)} />{likesCount}</p>         {/* per il like (che sara' il fuoco, vedere icona da lucid) */}
                    <p className="reactionCount"><MessageCircle className="reactionicon" onClick = {() => setOpenComment(true)} />{comments}</p>
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
            <Modal open={openComment} onClose={onCloseComments} content={<Comments postId={id}/>}/>
            <Modal ask={true} confirmAction = {() => handlePostDelete(id)} open={confirm} onClose={onClose} />
        </>
    )
}
export default Post;