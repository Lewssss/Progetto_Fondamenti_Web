import express from 'express';
import { Router } from 'express';
import User from '../models/Users.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';
const router = Router();

router.post('/create', authenticateToken, createPost);
router.post('/delete', authenticateToken, deletePost);

export default router;

async function createPost(req, res) {

};

async function deletePost(req, res) {
    
};