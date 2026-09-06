import Story from '../Models/Story.js';
import User from '../models/Users.js';
import mongoose from 'mongoose';
import fs from 'fs';
import { invalidCredentials, responseWithData, responseWithDataAndMessage } from '../util/response/user.response.js';

export default {
    addStory,
    getStories,
    deleteStory,
    getStoriesOfUser
}
async function getStoriesOfUser(author) {
    const stories = await Story.find({ author: author }).
    sort({createdAt: -1});
    return [200, responseWithData(stories)];
    
}
async function addStory({ author, content, filePath, mimetype }) {
    const isVideo = mimetype.startsWith('video/');
    const story = await new Story({content: content, mediaUrl: filePath, mediaType: isVideo? 'video' : "image", author: author}).save();
    if(story) {
        return [200, responseWithDataAndMessage(story,"Storia creata")];
    } else {
        return [500, { error: "Errore lato Server"}];
    }
}
async function getStories(userId) {
    const user = await User.findById(userId);
    if(!user) {
        return [404, { message: "Utente non trovato" }];
    }
    const authorIds = [...user.following, userId];
    const stories = await Story.find({author: {$in:authorIds}}).
    populate('author', 'username profilePicture').
    sort({createdAt: -1});

    //raggruppiamo le storie per autore
    const grouped = {};
    for (const story of stories) {
        const authorId = story.author._id.toString();
        if(!grouped[authorId]) {
            grouped[authorId] = { author: story.author, stories: [] };
        }
        grouped[authorId].stories.push(story);
    }
    return [200, responseWithData(Object.values(grouped))];
}
async function deleteStory(storyId, userId) {
    const story = await Story.findById(storyId);
    if(!story) {
        return [404, { message: "Storia non trovata" }];
    }
    if(story.author.toString() !== userId) {
        return [403, { message: "Non autorizzato" }];
    }
    fs.unlink(story.mediaUrl, (err) => {
        if(err) console.error("Errore nella cancellazione della storia", err.message);
    });
    await story.deleteOne();
    return [200, { message: "Storia canncellata" }]
}