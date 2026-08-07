import express from 'express';
import { Router } from 'express';
import User from '../models/Users.js';
import Post from '../Services/PostService.js'
import { authenticateToken } from '../Middleware/authMiddleware.js';
const router = Router();
router.get('/getPosts', authenticateToken, getPosts)
router.post('/create', authenticateToken, createPost);
router.post('/delete', authenticateToken, deletePost);
router.post('/addLike',authenticateToken, addLiketoPost)

export default router;
async function getPosts(req, res, next){
    Post.getPosts()
    .then(
        (response) => {
            return res.status(response[0]).json(response[1]);
        }
    ).catch(next);

}
async function createPost(req, res) {

};

async function deletePost(req, res) {
    
};
async function addLiketoPost(req,res){
    const {userId,postId} = req.body;
    Post.addLiketoPost(userId,postId).
    then(
        (response)=>
        {
            return res.status(response[0]).json(response[1]);
        }
    );
}