import React from 'react';
import './Comments.css'
import {getPostComments} from '../endpoints/rest/userUI';
import {addPostComment} from '../endpoints/rest/userInteractions';
import {setComments} from '../Context/PostsContext'
function Comment({postId}) {
    getPostComments(postId).then((data)=> {setComments(data)})
    addPostComment(userId,postId)
}