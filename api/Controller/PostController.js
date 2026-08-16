import express from 'express';
import { Router } from 'express';
import Post from '../Services/PostService.js'
import { authenticateToken } from '../Middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
const router = Router();
const filestorage = multer.diskStorage({destination:"uploads/", filename: (req,file,cb)=> {cb(null,req.body.author +"_"+ file.originalname)}}) //salva file in disco (multer di defualt scrive in ram)
const upload = multer({storage: filestorage}); //key di default di multer (storage), non e' relativa a niente di nostro
router.get('/getPosts', authenticateToken, getPosts)
router.post('/addPost', authenticateToken, upload.single("img"), addPost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/addLike',authenticateToken, addLiketoPost)
router.get('/getPostComments/:postId',authenticateToken, getPostComments)
router.post('/addPostComment',authenticateToken,addPostComment)
router.get('/getPostsofUser/:userId',authenticateToken,getPostsofUser)

export default router;
async function getPosts(req, res){
    Post.getPosts()
    .then(
        (response) => {
            return res.status(response[0]).json(response[1]);
        }
    );
}
async function getPostsofUser(req, res) {
    const userId = req.params.userId;
    if (!userId || userId === "undefined" || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({success: false, message: "userId mancante o non valido"});
    }
    Post.getPostsofUser(userId)
        .then((response) => {
            return res.status(response[0]).json(response[1]);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({success: false, message: "Errore interno"});
        });
}
async function getPostComments(req, res){
    const postId = req.params.postId;
    Post.getPostComments(postId)
    .then(
        (response) => {
            return res.status(response[0]).json(response[1]);
        }
    );
}
async function addPostComment(req,res){
    const {post,author,replyTo,text} = req.body;
    Post.addPostComment(post,author,replyTo,text)
    .then(
        (response)=> {
            return res.status(response[0]).json(response[1]);
        }
    )
}

async function addPost(req, res) {
    const {author,content} = req.body;
    console.log(req);
    const ImgUrl = '/uploads/'+req.file.filename;
    Post.addPost(author,ImgUrl,content).
    then(
        (response) =>
        {
            return res.status(response[0]).json(response[1]);
        }
    );
};

async function deletePost(req, res) {
    Post.deletePost(req.params.id).then((response)=> {return res.status(response[0]).json(response[1]);});
    
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
