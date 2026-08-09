import response from '../util/response/user.response.js'
import Post from '../models/Post.js'
import mongoose from 'mongoose'
export default {
    addPost,
    getPosts,
    addLiketoPost
}
async function addPost(author,ImgUrl,content) {
    const CreatedPost = await new Post({author:author,image:ImgUrl,content:content}).save();
    return [200,response.responseWithDataAndMessage(CreatedPost,"Post creato!")];

}
async function getPosts() {
    const  posts = await Post.find().sort({createdAt: -1});
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