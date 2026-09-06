import express, { response } from 'express';
import { Router } from 'express';
import Story from '../Services/StoryService.js'
import { authenticateToken } from '../Middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/stories/');
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
 });
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});
router.get('/getStoriesOfUser/:id', authenticateToken, getStoriesOfUser);
router.get('/getStories/:id', authenticateToken, getStories);
router.post('/addStory', authenticateToken, upload.single('file'), addStory);
router.delete('/deleteStory/:storyId', authenticateToken, deleteStory);

export default router;
async function getStoriesOfUser(req, res) {
    Story.getStoriesOfUser(req.params.id)
    .then(
        (response) => 
        {
            return res.status(response[0]).json(response[1]);
        }
    )
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Errore lato Server" });
    })
}
async function getStories(req,res) {
    Story.getStories(req.params.id)
    .then(
        (response) => 
        {
            return res.status(response[0]).json(response[1]);
        }
    )
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Errore lato Server" });
    })
};
async function addStory(req,res) {
    if(!req.file) {
        return res.status(400).json({ error: "File non valido o mancante"});
    }
    Story.addStory(
        {
            author: req.user.userId,
            content: req.body.content,
            filePath: req.file.path,
            mimetype: req.file.mimetype
        }
    )
    .then(
        (response) => 
        {
            return res.status(response[0]).json(response[1]);
        }
    )
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Errore lato Server" });
    })
};
async function deleteStory(req,res) {
    Story.deleteStory(req.params.storyId, req.user.id)
    .then(
        (response) => 
        {
            return res.status(response[0]).json(response[1]);
        }
    )
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Errore lato Server" });
    })
}
