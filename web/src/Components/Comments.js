import React from 'react';
import './Comments.css'
import {useState,useContext,useRef} from 'react';
import {getPostComments} from '../endpoints/rest/userUI';
import {addPostComment} from '../endpoints/rest/userInteractions';
import {postsContext} from '../Context/PostsContext'
import { SendIcon } from 'lucide-react';
import { userContext } from 'Context/UserContext';

function Comments({postId,publishedOn}) {
    const [replyTo,setReplyTo] = useState(null);
    const {comments, setComments, PublishedOn} = useContext(postsContext);
    const {user} = useContext(userContext);
    const text = useRef(null);
    const parents= comments.filter((comment) => comment.replyTo == null)
    const repliesOf = (parentId) => (comments.filter((comment) => String(comment.replyTo) == String(parentId)))
    useState(
        () => 
            getPostComments(postId)
            .then(
                (data)=>
                setComments(data)
            )
    ,[]);
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
      <div class="comments-container">
        <div class="comments-post">
            {parents.length > 0 ? 
            (parents.map((comment)=>
                (
                <React.Fragment key={comment.id}>
                <div className="comment">
                    <img src={comment.author.profilePicture}/>
                    <p className="username">{comment.author.username}:</p>
                    <p className="text">{comment.text}</p>
                    <p className="reply" onClick={() => handleCommentReply(comment)}>Rispondi</p>
                    <p className="publishedOn">{PublishedOn(comment.date)}</p>
                </div>
                {repliesOf(comment.id).map((commentReply) => (
                    <div key={commentReply.id} className="comment comment-replyTo">
                        <img src={commentReply.author.profilePicture} alt="" />
                        <p className="username">{commentReply.author.username}:</p>
                        <p className="text">{commentReply.text}</p>
                    </div>
                ))
                }
                </React.Fragment>
            ))
        ): <p class='nocomment'>Nessun commento, sii il primo</p>}
        </div>
        <div class="comment-publish">
            <form onSubmit={handleCommentPost}>
                {replyTo? <p class="replying">Stai rispondendo a @{replyTo.author.username}</p> : ''}
                <input ref={text} placeholder="Scrivi un commento..." type="text" name="comment">
                
                </input>
                <button><SendIcon/></button>

            </form>
        </div>
      </div>  
    );
}
export default Comments;