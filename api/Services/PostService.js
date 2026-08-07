import response from '../util/response/user.response.js'
import Post from '../models/Post.js'
import mongoose from 'mongoose'
export default {
    getPosts,
    addLiketoPost
}
async function getPosts() {
    const  posts = await Post.find();
    return [200, response.responseWithData(posts)];
}
async function addLiketoPost(userId,postId){
    const thisPost = await Post.findById(postId);
    const checkLike = thisPost.likes.some(id => id.toString()===userId)

    !checkLike ? 
    await Post.findByIdAndUpdate(postId,{$addToSet : {likes:userId}}) :
    await Post.findByIdAndUpdate(postId,{$pull: {likes: userId}})
    return [200, response.responseWithData(null)];
}