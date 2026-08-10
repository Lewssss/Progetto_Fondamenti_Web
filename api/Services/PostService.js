import response from '../util/response/user.response.js'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import mongoose from 'mongoose'
export default {
    addPost,
    deletePost,
    getPosts,
    getPostComments,
    addLiketoPost
}
async function addPost(author,ImgUrl,content) {
    const CreatedPost = await new Post({author:author,image:ImgUrl,content:content}).save();
    return [200,response.responseWithDataAndMessage(CreatedPost,"Post creato!")];

}
async function deletePost(id){
    const deletePost = await Post.findByIdAndDelete(id);
    return [200,response.responseWithDataAndMessage(deletePost, "Post eliminato!")];
}
async function getPosts() {
    const  posts = await Post.find().sort({createdAt: -1});
    return [200, response.responseWithData(posts)];
}
async function getPostComments(postId) {
    const  comments = await Comment.findById(postId).sort({createdAt: -1});
    return [200, response.responseWithData(comments)];
}

async function addLiketoPost(userId,postId){
    const thisPost = await Post.findById(postId);
    const checkLike = thisPost.likes.some(id => id.toString()===userId)

    !checkLike ? 
    await Post.findByIdAndUpdate(postId,{$addToSet : {likes:userId}}) :
    await Post.findByIdAndUpdate(postId,{$pull: {likes: userId}})
    return [200, response.responseWithData(null)];
}