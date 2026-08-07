import response from '../util/response/user.response.js'
import Post from '../models/Post.js'
import mongoose from 'mongoose'
export default {
    getPosts
}
async function getPosts() {
    const  posts = await Post.find();
    return [200, response.responseWithData(posts)];
}