import response from '../util/response/user.response.js'
import Post from '../models/Post.js'
import User from '../models/Users.js'   
import Comment from '../models/Comment.js'
import mongoose from 'mongoose'
export default {
    addPost,
    deletePost,
    getPosts,
    getPostComments,
    addPostComment,
    addLiketoPost,
    getPostsofUser,
}
async function addPost(author,ImgUrl,content) {
    const CreatedPost = await new Post({author:author,image:ImgUrl,content:content}).save();
    if(CreatedPost) return [200,response.responseWithDataAndMessage(CreatedPost,"Post creato!")];

}
async function deletePost(id){
    const deletePost = await Post.findByIdAndDelete(id);
    return [200,response.responseWithDataAndMessage(deletePost, "Post eliminato!")];
}
async function getPosts() {
    const  posts = await Post.find().populate("author", "username profilePicture").sort({createdAt: -1});
    const postswithcomments = await Promise.all( //visto che non li abbiamo nella stessa table come i like
        posts.map(async (post)=> {
            const commentsCount = await Comment.countDocuments({post : post._id});
            return {...post.toObject(),commentsCount} //per chi non capisce: ... serve a prendere tutti gli elementi di post, e nel nostro caso torniamo un array che ha quegli element + commentsCount. 
            //facciamo toobject perche' arrivando da mongo, non possiamo interpretarli normalmente in node, ce lo rende plain text cosi'
        })
    )
    return [200, response.responseWithData(postswithcomments)];
}
async function getPostsofUser(userId) {
    const posts = await Post.find({author: userId}).populate("author", "username profilePicture").sort({createdAt: -1});
    const postswithcomments = await Promise.all(
        posts.map(async (post)=> {
            const commentsCount = await Comment.countDocuments({post : post._id});
            return {...post.toObject(),commentsCount}
        })
    )
    return [200, response.responseWithData(postswithcomments)];
}
async function getPostComments(postId) {
    const  comments = await Comment.find({post: postId}).populate("author", "username profilePicture").sort({createdAt: -1});
    return [200, response.responseWithData(comments)];
}
async function addPostComment(post,author,replyTo,text){
    const comment = await new Comment({post,author,replyTo,text}).save();
    if(comment) 
        var comments = await Comment.find({post: post}).populate("author", "username profilePicture").sort({createdAt: -1});
    else
        return [500, null];
    return[200, response.responseWithDataAndMessage(comments,"Commento pubblicato!")]
}
async function addLiketoPost(userId,postId){
    const thisPost = await Post.findById(postId);
    const checkLike = thisPost.likes.some(id => id.toString()===userId)

    !checkLike ? 
    await Post.findByIdAndUpdate(postId,{$addToSet : {likes:userId}}) :
    await Post.findByIdAndUpdate(postId,{$pull: {likes: userId}})
    return [200, response.responseWithData(null)];
}
