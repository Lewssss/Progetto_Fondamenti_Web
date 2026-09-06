import express from "express";
const router = express.Router();
import ChatsServices from "../Services/ChatsServices.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

router.post("/newChat", authenticateToken, newChat);
router.get("/getChats", authenticateToken, getChats);
router.delete("/deleteChat", authenticateToken, deleteChat);
router.post("/clearChat", authenticateToken, clearChat);

async function newChat(req, res, next) {
  try {
    const result = await ChatsServices.newChat(req.user.userId);

    return res.status(result[0]).json(result[1]);
  } catch (error) {
    next(error);
  }
}

async function getChats(req, res, next) {
  ChatsServices.getChats(req.user.userId)
    .then((response) => {
      return res.status(response[0]).json(response[1]);
    })
    .catch(next);
}

async function deleteChat(req, res) {
  ChatsServices.deleteChat(req.body.id).then((response) => {
    //const { chatid } = req.body;
    //ChatsServices.deleteChat(chatid).then((response) => {
    //Idem di getChats
    return res.status(response[0]).json(response[1]);
  });
}

async function clearChat(req, res) {
  ChatsServices.clearChat(req.body.id).then((response) => {
    return res.status(response[0]).json(response[1]);
  });
}

export default router;
