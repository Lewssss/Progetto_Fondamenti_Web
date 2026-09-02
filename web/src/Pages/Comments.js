import React from 'react';
import './Comments.css'
import {useState,useContext,useRef} from 'react';
import {getPostComments} from '../endpoints/rest/userUI';
import {addPostComment} from '../endpoints/rest/userInteractions';
import {postsContext} from '../Context/PostsContext'
import { SendIcon } from 'lucide-react';
import { userContext } from 'Context/UserContext';
import Comment from '../Components/Comment'

function Comments({postId,publishedOn}) {
    const [replyTo,setReplyTo] = useState(null);
    const {comments, setComments, PublishedOn} = useContext(postsContext);
    const [loading,setLoading] = useState(false) //per loading dei commemnti, altrimenti si vede per qualche secondo la scritta "Nessun commento" pur essendocene
    const {user} = useContext(userContext);
    const text = useRef(null);
    const parents= comments.filter((comment) => comment.replyTo == null)  //tutti i commenti padri, che non rispondono a nessun altro commento (sono i main)
    const repliesOf = (parentId) => (comments.filter((comment) => String(comment.replyTo) == String(parentId))) //restituisce le risposte ai commenti padre
    useState(
        () => 
            { 
                setLoading(true);
                getPostComments(postId)
                .then(
                    (data)=>
                    setComments(data)
                ).finally(() => setLoading(false))
            }
    ,[postId]);
    function handleCommentPost(e){
        e.preventDefault();
        addPostComment(postId,user.id, replyTo?.id ?? null, e.target.comment.value)
        .then(
            (data) =>
            {
                setReplyTo(null);
                e.target.comment.value = ''
                setComments(data);
            }
        )

    }
    function handleCommentReply(comment){
        setReplyTo(comment);
        text.current.focus();
    }
    return (
      <div className="comments-container">
        <div className="comments-post">
            {loading ? (
                <p className="nocomment">Caricamento...</p>
                ) : parents.length > 0 ? (
                parents.map((comment) => (
                    <Comment
                    key={comment.id}
                    comment={comment}
                    replies={repliesOf(comment.id)}
                    handleCommentReply={handleCommentReply}
                    />
                ))
                ) : (
                <p className="nocomment">Nessun commento, sii il primo</p>
                )
            }
        </div>
        <div className="comment-publish">
            <form onSubmit={handleCommentPost}>
                {replyTo? <p className="replying">Stai rispondendo a @{replyTo.author.username}</p> : ''}
                <input ref={text} placeholder="Scrivi un commento..." type="text" name="comment">
                </input>
                <button><SendIcon/></button>
            </form>
        </div>
      </div>  
    );
}
export default Comments;